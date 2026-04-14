import { Wand2, ImageIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "../components/ui/PageWrapper";

function GenerateImagesPage() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Realistic");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const styles = ["Realistic","Anime","Ghibli","3D","Portrait","Fantasy"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setTimeout(() => {
      setImage("https://via.placeholder.com/500");
      setLoading(false);
    }, 1500);
  };

  return (
    <PageWrapper>

      {/* LEFT */}
      <motion.div whileHover={{ y: -4 }} className="glass-card p-6 flex flex-col gap-6">
        
        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <Wand2 className="text-green-500" />
          AI Image Generator
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your image..."
            className="input-premium min-h-[120px]"
          />

          <div className="flex flex-wrap gap-2">
            {styles.map((s) => (
              <motion.span
                whileTap={{ scale: 0.9 }}
                key={s}
                onClick={() => setStyle(s)}
                className={`chip ${style === s ? "chip-active" : "chip-inactive"}`}
              >
                {s}
              </motion.span>
            ))}
          </div>

          <button className="btn-premium flex items-center justify-center gap-2">
            <ImageIcon size={18} />
            {loading ? "Generating..." : "Generate Image"}
          </button>

        </form>
      </motion.div>

      {/* RIGHT */}
      <motion.div whileHover={{ y: -4 }} className="glass-card p-6 flex flex-col gap-6">

        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <ImageIcon className="text-green-500" />
          Generated Image
        </h1>

        <div className="flex-1 flex items-center justify-center">
          {loading ? (
            <div className="animate-pulse w-full h-64 bg-gray-200 rounded-xl" />
          ) : image ? (
            <motion.img
              src={image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl shadow-lg max-h-[400px]"
            />
          ) : (
            <p className="text-gray-400">✨ Your image will appear here</p>
          )}
        </div>

      </motion.div>

    </PageWrapper>
  );
}

export default GenerateImagesPage;