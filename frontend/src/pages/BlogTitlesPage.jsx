import { Wand2, Hash } from "lucide-react";
import { useState } from "react";
import {motion} from 'framer-motion'
import { PageWrapper } from "../components/ui/PageWrapper";

function BlogTitlePage() {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("General");
  const [titles, setTitles] = useState([]);

  const categories = ["General","Tech","Business","Health","Lifestyle","Education"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic) return;

    setTitles([
      `🔥 Best ${topic} Ideas`,
      `Top ${topic} Trends in 2026`,
      `Master ${topic} Like a Pro`,
    ]);
  };

  return (
    <PageWrapper>

      {/* LEFT */}
      <motion.div whileHover={{ y: -4 }} className="glass-card p-6 flex flex-col gap-6">

        <h1 className="text-xl font-semibold flex items-center gap-2">
          <Wand2 className="text-purple-500" />
          AI Title Generator
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="The future of AI is..."
            className="input-premium"
          />

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <motion.span
                whileTap={{ scale: 0.9 }}
                key={c}
                onClick={() => setCategory(c)}
                className={`chip ${category === c ? "chip-active" : "chip-inactive"}`}
              >
                {c}
              </motion.span>
            ))}
          </div>

          <button className="btn-premium flex items-center justify-center gap-2">
            <Hash size={18} />
            Generate Title
          </button>
        </form>
      </motion.div>

      {/* RIGHT */}
      <motion.div whileHover={{ y: -4 }} className="glass-card p-6 flex flex-col gap-6">

        <h1 className="text-xl font-semibold flex items-center gap-2">
          <Hash className="text-purple-500" />
          Generated Titles
        </h1>

        <div className="flex flex-col gap-3">
          {titles.length ? (
            titles.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 rounded-xl bg-white/70 hover:bg-white transition cursor-pointer"
              >
                {t}
              </motion.div>
            ))
          ) : (
            <div className="text-gray-400 text-center py-20">
              ✨ Your titles will appear here
            </div>
          )}
        </div>

      </motion.div>

    </PageWrapper>
  );
}

export default BlogTitlePage;