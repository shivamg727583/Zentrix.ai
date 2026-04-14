import { Wand2, Upload } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "../components/ui/PageWrapper";

function RemoveBgPage() {
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) return;

    setTimeout(() => setOutput(image), 1200);
  };

  return (
    <PageWrapper>

      {/* LEFT */}
      <motion.div whileHover={{ y: -4 }} className="glass-card p-6 flex flex-col gap-6">

        <h1 className="flex items-center gap-2 text-xl font-semibold">
          <Wand2 className="text-orange-500" />
          Background Removal
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <input
            type="file"
            onChange={(e)=>setImage(URL.createObjectURL(e.target.files[0]))}
            className="input-premium"
          />

          <button className="btn-premium flex items-center justify-center gap-2">
            <Upload size={18} />
            Remove Background
          </button>

        </form>

      </motion.div>

      {/* RIGHT */}
      <motion.div whileHover={{ y: -4 }} className="glass-card p-6 flex flex-col gap-6">

        <h1 className="text-xl font-semibold">Processed Image</h1>

        <div className="flex-1 flex items-center justify-center">
          {output ? (
            <motion.img src={output} className="rounded-xl shadow-lg" />
          ) : (
            <p className="text-gray-400">Upload image to start</p>
          )}
        </div>

      </motion.div>

    </PageWrapper>
  );
}

export default RemoveBgPage;