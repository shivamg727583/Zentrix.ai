import { Edit, Wand2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "../components/ui/PageWrapper";

function WriteArticlePage() {
  const [wordLength, setWordLength] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!topic || !wordLength) return;

    setLoading(true);

    setTimeout(() => {
      setArticle(`✨ Generated article on "${topic}" (${wordLength})`);
      setLoading(false);
    }, 1500);
  };

  const lengths = [
    { label: "Short", value: "500-800 words" },
    { label: "Medium", value: "800-1200 words" },
    { label: "Long", value: "1200+ words" },
  ];

  return (
    <PageWrapper>

      {/* LEFT */}
      <motion.div
        whileHover={{ y: -4 }}
        className="glass-card p-5 sm:p-6 flex flex-col gap-6"
      >
        <h1 className="text-xl sm:text-2xl font-semibold flex items-center gap-2 text-gray-800">
          <Wand2 className="text-purple-500" />
          AI Article Writer
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Topic */}
          <div className="flex flex-col gap-2">
            <label className="text-xs sm:text-sm text-gray-600">
              Article Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your topic..."
              className="input-premium"
            />
          </div>

          {/* Length */}
          <div className="flex flex-col gap-2">
            <label className="text-xs sm:text-sm text-gray-600">
              Article Length
            </label>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {lengths.map((item) => (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  key={item.value}
                  onClick={() => setWordLength(item.value)}
                  className={`chip ${
                    wordLength === item.value
                      ? "chip-active"
                      : "chip-inactive"
                  }`}
                >
                  {item.label}({item.value})
                </motion.button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="btn-premium flex items-center justify-center gap-2 mt-2"
          >
            <Edit size={18} />
            {loading ? "Generating..." : "Generate Article"}
          </motion.button>

        </form>
      </motion.div>

      {/* RIGHT */}
      <motion.div
        whileHover={{ y: -4 }}
        className="glass-card p-5 sm:p-6 flex flex-col gap-6"
      >
        <h1 className="text-xl sm:text-2xl font-semibold flex items-center gap-2 text-gray-800">
          <Wand2 className="text-purple-500" />
          AI Generated Article
        </h1>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-start">

          {loading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              <div className="h-4 bg-gray-300 rounded w-4/6"></div>
            </div>
          ) : article ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line"
            >
              {article}
            </motion.p>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm sm:text-base text-center">
              ✨ Your generated article will appear here
            </div>
          )}

        </div>
      </motion.div>

    </PageWrapper>
  );
}

export default WriteArticlePage;