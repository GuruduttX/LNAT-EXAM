export default function CMSLoading({
  title = "Loading CMS",
  message = "Preparing your admin workspace...",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="relative min-h-[calc(100vh-8rem)] overflow-hidden rounded-3xl border border-slate-800 bg-[#0B1221] p-6 shadow-2xl shadow-black/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(196,164,124,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.88),transparent_36%)]" />

      <div className="relative flex min-h-[calc(100vh-11rem)] flex-col justify-center">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <div className="relative flex h-24 w-24 items-center justify-center">
            <div className="absolute h-24 w-24 animate-ping rounded-full border border-[#C4A47C]/25" />
            <div className="absolute h-16 w-16 animate-pulse rounded-full bg-[#C4A47C]/10" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#C4A47C]/40 bg-slate-950 shadow-xl shadow-[#C4A47C]/10">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#C4A47C]/25 border-t-[#C4A47C]" />
            </div>
          </div>

          <h2 className="mt-6 text-2xl font-semibold tracking-tight text-[#FDFBF7]">
            {title}
          </h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
            {message}
          </p>

          <div className="mt-8 h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-slate-950">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-[#8B6F3D] via-[#C4A47C] to-[#F2D98F]" />
          </div>

          <div className="mt-10 grid w-full gap-4 md:grid-cols-3">
            {["Syncing records", "Loading editor", "Checking status"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-left"
                >
                  <div className="h-2 w-16 animate-pulse rounded-full bg-[#C4A47C]/40" />
                  <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    {item}
                  </p>
                  <div className="mt-3 h-2 w-full animate-pulse rounded-full bg-slate-800" />
                  <div className="mt-2 h-2 w-2/3 animate-pulse rounded-full bg-slate-800" />
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
