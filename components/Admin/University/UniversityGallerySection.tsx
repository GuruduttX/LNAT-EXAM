"use client";

import { IMediaAsset } from "@/types/backend.types";
import GalleryImageField from "./GalleryImageField";

const sectionClass =
  "bg-[#0B1221] p-6 rounded-xl border border-slate-800 space-y-5 shadow-sm";

interface UniversityGallerySectionProps {
  campusImages: IMediaAsset[];
  cityImages: IMediaAsset[];
  studentLifeImages: IMediaAsset[];
  academicImages: IMediaAsset[];
  onCampusChange: (
    index: number,
    key: keyof IMediaAsset,
    value: string,
  ) => void;
  onCityChange: (
    index: number,
    key: keyof IMediaAsset,
    value: string,
  ) => void;
  onStudentLifeChange: (
    index: number,
    key: keyof IMediaAsset,
    value: string,
  ) => void;
  onAcademicChange: (
    index: number,
    key: keyof IMediaAsset,
    value: string,
  ) => void;
  onAddCampus: () => void;
  onAddCity: () => void;
  onAddStudentLife: () => void;
  onAddAcademic: () => void;
  onRemoveCampus: (index: number) => void;
  onRemoveCity: (index: number) => void;
  onRemoveStudentLife: (index: number) => void;
  onRemoveAcademic: (index: number) => void;
}

export default function UniversityGallerySection({
  campusImages,
  cityImages,
  studentLifeImages,
  academicImages,
  onCampusChange,
  onCityChange,
  onStudentLifeChange,
  onAcademicChange,
  onAddCampus,
  onAddCity,
  onAddStudentLife,
  onAddAcademic,
  onRemoveCampus,
  onRemoveCity,
  onRemoveStudentLife,
  onRemoveAcademic,
}: UniversityGallerySectionProps) {
  return (
    <div className={sectionClass}>
      <h2 className="text-lg font-medium text-[#FDFBF7] border-b border-slate-800 pb-3 mb-5">
        Image Galleries
      </h2>

      <p className="text-xs text-slate-500 -mt-2">
        Use Cloudinary uploads for both campus and city-life images. Aim for at
        least 4 campus images and 4 city-life images so the university page has
        enough depth for the carousel and supporting sections.
      </p>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-slate-300">Campus Images</h3>
        {campusImages.map((image, index) => (
          <GalleryImageField
            key={`campus-${index}`}
            folder="LNAT_EXAM/UniversityGallery/Campus"
            image={image}
            onChange={(key, value) => onCampusChange(index, key, value)}
            onRemove={() => onRemoveCampus(index)}
          />
        ))}
        <button
          type="button"
          onClick={onAddCampus}
          className="text-sm text-[#C4A47C]"
        >
          + Add campus image
        </button>

        <h3 className="pt-4 text-sm font-medium text-slate-300">
          City Life Images
        </h3>
        {cityImages.map((image, index) => (
          <GalleryImageField
            key={`city-${index}`}
            folder="LNAT_EXAM/UniversityGallery/CityLife"
            image={image}
            onChange={(key, value) => onCityChange(index, key, value)}
            onRemove={() => onRemoveCity(index)}
          />
        ))}
        <button
          type="button"
          onClick={onAddCity}
          className="text-sm text-[#C4A47C]"
        >
          + Add city-life image
        </button>

        <h3 className="pt-4 text-sm font-medium text-slate-300">
          Student Life Images
        </h3>
        {studentLifeImages.map((image, index) => (
          <GalleryImageField
            key={`student-life-${index}`}
            folder="LNAT_EXAM/UniversityGallery/StudentLife"
            image={image}
            onChange={(key, value) => onStudentLifeChange(index, key, value)}
            onRemove={() => onRemoveStudentLife(index)}
          />
        ))}
        <button
          type="button"
          onClick={onAddStudentLife}
          className="text-sm text-[#C4A47C]"
        >
          + Add student-life image
        </button>

        <h3 className="pt-4 text-sm font-medium text-slate-300">
          Academic Images
        </h3>
        {academicImages.map((image, index) => (
          <GalleryImageField
            key={`academic-${index}`}
            folder="LNAT_EXAM/UniversityGallery/Academic"
            image={image}
            onChange={(key, value) => onAcademicChange(index, key, value)}
            onRemove={() => onRemoveAcademic(index)}
          />
        ))}
        <button
          type="button"
          onClick={onAddAcademic}
          className="text-sm text-[#C4A47C]"
        >
          + Add academic image
        </button>
      </div>
    </div>
  );
}
