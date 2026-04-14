import { Wand2, Scissors } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "../components/ui/PageWrapper";

function RemoveObjectPage() {
  const [image, setImage] = useState(null);
  const [object, setObject] = useState("");

  return (
    <PageWrapper>

      <motion.div whileHover={{ y: -4 }} className="glass-card p-6 flex flex-col gap-6">

        <h1 className="text-xl font-semibold flex gap-2">
          <Wand2 className="text-blue-500" />
          Object Removal
        </h1>

        <input
          type="file"
          onChange={(e)=>setImage(URL.createObjectURL(e.target.files[0]))}
          className="input-premium"
        />

        <input
          value={object}
          onChange={(e)=>setObject(e.target.value)}
          placeholder="Object to remove..."
          className="input-premium"
        />

        <button className="btn-premium flex items-center justify-center gap-2">
          <Scissors size={18} />
          Remove Object
        </button>

      </motion.div>

      <motion.div whileHover={{ y: -4 }} className="glass-card p-6 flex items-center justify-center">
        {image ? (
          <img src={image} className="rounded-xl" />
        ) : (
          <p className="text-gray-400">Preview here</p>
        )}
      </motion.div>

    </PageWrapper>
  );
}

export default RemoveObjectPage;