"use client";

import { useState } from "react";
import {
  BookOpen,
  FileText,
  Target,
  CheckSquare,
  Calendar,
  PenTool,
  LucideIcon,
} from "lucide-react";
import ResourceCard from "./ResourceCard";
import LeadCaptureModal from "./LeadCaptureModal";
import { motion } from "framer-motion";

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: LucideIcon;
}

const resourcesData: ResourceItem[] = [
  {
    id: "beginner-guide",
    title: "The LNAT Beginner's Guide",
    category: "Foundation Guide",
    description:
      "A comprehensive overview of the LNAT structure, scoring system, and essential prerequisites for elite university applications.",
    icon: BookOpen,
  },
  {
    id: "reading-comprehension",
    title: "Reading Comprehension Masterclass",
    category: "Section A Strategy",
    description:
      "Advanced techniques for dissecting complex texts, identifying underlying arguments, and managing time under strict conditions.",
    icon: FileText,
  },
  {
    id: "essay-writing",
    title: "Elite Essay Frameworks",
    category: "Section B Guide",
    description:
      "Step-by-step frameworks for constructing persuasive, philosophically sound essays that resonate with Oxford and UCL admissions tutors.",
    icon: PenTool,
  },
  {
    id: "exam-strategy",
    title: "Exam Day Strategy & Tactics",
    category: "Performance Guide",
    description:
      "Psychological and tactical preparation strategies to maintain composure and peak cognitive performance on exam day.",
    icon: Target,
  },
  {
    id: "application-checklist",
    title: "Application Document Checklist",
    category: "Admissions Toolkit",
    description:
      "A meticulously curated checklist ensuring all components of your UCAS application and LNAT profile are flawless.",
    icon: CheckSquare,
  },
  {
    id: "deadline-tracker",
    title: "Global Deadline Tracker",
    category: "Organization Tool",
    description:
      "An interactive calendar marking crucial registration windows, testing deadlines, and application cut-offs for top-tier universities.",
    icon: Calendar,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function ResourcesClient() {
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (resource: ResourceItem) => {
    setSelectedResource(resource);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedResource(null), 300); // Wait for exit animation
  };

  return (
    <section className="py-24 bg-[#fdfbf7] px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {resourcesData.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onClick={handleOpenModal}
            />
          ))}
        </motion.div>
      </div>

      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        resource={selectedResource}
      />
    </section>
  );
}
