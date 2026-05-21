import React from 'react'
import { Plus, Trash2 } from 'lucide-react'

type faq = {
  id: string
  question: string
  answer: string
}

const inputClass = `
  mt-2 w-full px-5 py-3 rounded-xl
  bg-pink-950/30 text-pink-100
  placeholder-pink-400/40
  border border-pink-900/50
  focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-600/50
  transition
`;

const FaqHandler = ({
  faqs, setFaqs,
}: {
  faqs: faq[];
  setFaqs: React.Dispatch<React.SetStateAction<faq[]>>;
  editorType: "Blog" | "Package" | "Temple" | "Pooja";
}) => {

  const handleAddFaq = () => {
    setFaqs((prev) => [...prev, { id: crypto.randomUUID(), question: "", answer: "" }]);
  };

  const handleDeleteFaq = (id: string) => {
    setFaqs((prev) => prev.filter((faq) => faq.id !== id));
  };

  const handleQuestionChange = (id: string, value: string) => {
    setFaqs((prev) => prev.map((faq) => faq.id === id ? { ...faq, question: value } : faq));
  };

  const handleAnswerChange = (id: string, value: string) => {
    setFaqs((prev) => prev.map((faq) => faq.id === id ? { ...faq, answer: value } : faq));
  };

  return (
    <div className="border border-pink-900/50 rounded-2xl w-full p-6 bg-pink-950/20 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">

      <h3 className="text-base font-semibold text-pink-100 mb-6">FAQs</h3>

      <div className="space-y-4">
        {faqs.map((faq: faq) => (
          <div
            key={faq.id}
            className="border border-pink-900/50 rounded-2xl p-5 bg-pink-950/30"
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

            <div className="flex justify-end mt-3">
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-red-400/70 hover:text-red-400 transition cursor-pointer"
                onClick={() => handleDeleteFaq(faq.id)}
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Button */}
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={handleAddFaq}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium
            bg-pink-600/20 text-pink-300 border border-pink-600/40
            hover:bg-pink-600/30 hover:border-pink-500/60 hover:text-pink-200
            transition cursor-pointer"
        >
          <Plus size={15} /> Add FAQ
        </button>
      </div>

    </div>
  );
};

export default FaqHandler;