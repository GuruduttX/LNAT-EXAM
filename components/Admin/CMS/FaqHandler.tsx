import React from "react";
import { Plus, Trash2 } from "lucide-react";

type faq = {
  id: string;
  question: string;
  answer: string;
};

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-slate-900/50 text-[#FDFBF7]
  placeholder-slate-600
  border border-slate-800
  focus:outline-none focus:ring-1 focus:ring-[#C4A47C]/50 focus:border-[#C4A47C]/50
  transition
`;

const FaqHandler = ({
  faqs,
  setFaqs,
}: {
  faqs: faq[];
  setFaqs: React.Dispatch<React.SetStateAction<faq[]>>;
  editorType: string;
}) => {
  const handleAddFaq = () => {
    setFaqs((prev) => [
      ...prev,
      { id: crypto.randomUUID(), question: "", answer: "" },
    ]);
  };

  const handleDeleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((faq) => faq.id !== id));
  };

  const handleQuestionChange = (id: string, value: string) => {
    setFaqs((prev) =>
      prev.map((faq) => (faq.id === id ? { ...faq, question: value } : faq)),
    );
  };

  const handleAnswerChange = (id: string, value: string) => {
    setFaqs((prev) =>
      prev.map((faq) => (faq.id === id ? { ...faq, answer: value } : faq)),
    );
  };

  return (
    <div className="bg-[#0B1221] border border-slate-800 rounded-xl w-full p-6 shadow-sm">
      <h3 className="text-base font-semibold text-[#FDFBF7] mb-6">
        Page Specific FAQs
      </h3>

      <div className="space-y-4">
        {faqs.map((faq: faq) => (
          <div
            key={faq.id}
            className="border border-slate-800 rounded-xl p-5 bg-slate-900/30"
          >
            <input
              required
              type="text"
              placeholder="Enter the question"
              className={inputClass}
              value={faq.question}
              onChange={(e) => handleQuestionChange(faq.id, e.target.value)}
            />

            <textarea
              rows={3}
              required
              placeholder="Enter the answer"
              className={`${inputClass} resize-none`}
              value={faq.answer}
              onChange={(e) => handleAnswerChange(faq.id, e.target.value)}
            />

            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-red-400 hover:text-red-500 transition cursor-pointer"
                onClick={() => handleDeleteFaq(faq.id)}
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center pt-4 border-t border-slate-800/50">
        <button
          type="button"
          onClick={handleAddFaq}
          className="flex items-center gap-2 px-6 py-2.5 rounded-md text-sm font-medium
            bg-slate-800 text-slate-300 border border-slate-700
            hover:bg-[#C4A47C]/10 hover:text-[#C4A47C] hover:border-[#C4A47C]/30
            transition cursor-pointer"
        >
          <Plus size={15} /> Add FAQ
        </button>
      </div>
    </div>
  );
};

export default FaqHandler;
