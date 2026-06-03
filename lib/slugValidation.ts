import { NextResponse } from "next/server";

type SlugLookupModel = {
  findOne(query: Record<string, unknown>): {
    select(fields: string): {
      lean(): Promise<unknown>;
    };
  };
};

type MongoDuplicateKeyError = {
  code?: number;
  keyPattern?: Record<string, unknown>;
  keyValue?: Record<string, unknown>;
};

export function isMongoDuplicateSlugError(error: unknown) {
  if (!error || typeof error !== "object") return false;

  const mongoError = error as MongoDuplicateKeyError;
  return (
    mongoError.code === 11000 &&
    Boolean(mongoError.keyPattern?.slug || mongoError.keyValue?.slug)
  );
}

export function createSlugConflictResponse(entityLabel: string, slug: string) {
  const slugLabel = slug || "this slug";

  return NextResponse.json(
    {
      error: "Slug already exists",
      field: "slug",
      reason: `A ${entityLabel} with the slug "${slugLabel}" already exists. Please choose a unique slug.`,
    },
    { status: 409 },
  );
}

export async function getSlugConflictResponse(
  model: SlugLookupModel,
  entityLabel: string,
  slug: unknown,
  currentId?: string,
) {
  if (typeof slug !== "string" || !slug.trim()) return null;

  const normalizedSlug = slug.trim();
  const query: Record<string, unknown> = { slug: normalizedSlug };

  if (currentId) {
    query._id = { $ne: currentId };
  }

  const duplicate = await model.findOne(query).select("_id").lean();

  return duplicate
    ? createSlugConflictResponse(entityLabel, normalizedSlug)
    : null;
}
