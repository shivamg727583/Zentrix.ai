import { Wand2, FileText } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "../components/ui/PageWrapper";

function ReviewResumePage() {
  const [file, setFile] = useState(null);
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    setTimeout(() => {
      setReview("✅ Strong resume. Add more measurable achievements.");
    }, 1200);
  };

  return (
    <PageWrapper>

      <motion.div whileHover={{ y: -4 }} className="glass-card p-6 flex flex-col gap-6">

        <h1 className="text-xl font-semibold flex gap-2">
          <Wand2 className="text-emerald-500" />
          Resume Review
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <input
            type="file"
            onChange={(e)=>setFile(e.target.files[0])}
            className="input-premium"
          />

          <button className="btn-premium flex items-center justify-center gap-2">
            <FileText size={18} />
            Analyze Resume
          </button>

        </form>

      </motion.div>

      <motion.div whileHover={{ y: -4 }} className="glass-card p-6 flex items-center justify-center">

        {review ? (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {review}
          </motion.p>
        ) : (
          <p className="text-gray-400">Your analysis will appear here</p>
        )}

      </motion.div>

    </PageWrapper>
  );
}

export default ReviewResumePage;