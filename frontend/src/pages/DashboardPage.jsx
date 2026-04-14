import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Crown,
  FileText,
  Image,
  ChevronDown,
  Gem,
} from "lucide-react";
import { PageWrapper } from "../components/ui/PageWrapper";
import { dummyCreationData } from "../assets/assets";
import { useUser } from "@clerk/react";

function DashboardPage() {
  const [activeId, setActiveId] = useState(null);
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUser();

  // ✅ Fetch (replace with real API later)
  const fetchCreations = async () => {
    try {
      setLoading(true);

      // 👉 Replace this with API call
      // const res = await fetch("/api/creations");
      // const data = await res.json();

      const data = dummyCreationData;

      setCreations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchCreations();
  }, [user]);

  // ✅ Dynamic Stats
  const stats = {
    total: creations.length,
    plan: user?.publicMetadata?.plan || "Free",
  };

  // ✅ Icon Mapping
  const getIcon = (type) => {
    if (type === "blog-title") return <FileText size={16} />;
    if (type === "image") return <Image size={16} />;
    return <Sparkles size={16} />;
  };

  // ✅ Date Format
  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <PageWrapper>
      {/* ================= SECTION 1 ================= */}
      <div className="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Total Creations */}
        <motion.div
          whileHover={{ y: -5 }}
          className="glass-card p-6 flex items-center justify-between"
        >
          <div>
            <p className="text-sm text-gray-500">Total Creations</p>
            <h2 className="text-3xl font-bold text-gray-800">
              {stats.total}
            </h2>
          </div>

          <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
            <Sparkles />
          </div>
        </motion.div>

        {/* Plan */}
        <motion.div
          whileHover={{ y: -5 }}
          className="glass-card p-6 flex items-center justify-between"
        >
          <div>
            <p className="text-sm text-gray-500">Current Plan</p>
            <h2 className="text-2xl font-semibold text-gray-800 capitalize">
              {stats.plan}
            </h2>
          </div>

          <div className="p-3 rounded-xl bg-yellow-100 text-yellow-600">
            {stats.plan === "premium" ? <Gem /> : <Crown />}
          </div>
        </motion.div>
      </div>

      {/* ================= SECTION 2 ================= */}
      <div className="col-span-1 lg:col-span-2 glass-card p-6 flex flex-col gap-5">

        <h1 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Sparkles className="text-purple-500" />
          Recent Creations
        </h1>

        {/* LOADING */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse h-16 bg-gray-200 rounded-xl" />
            ))}
          </div>
        ) : creations.length === 0 ? (
          <p className="text-gray-400 text-center py-10">
            No creations yet 🚀
          </p>
        ) : (
          <div className="flex flex-col gap-3">

            {creations.map((item) => (
              <motion.div
                key={item.id}
                layout
                className="border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-white/60 transition"
                onClick={() =>
                  setActiveId(activeId === item.id ? null : item.id)
                }
              >
                {/* TOP */}
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getIcon(item.type)}
                    </div>

                    <div>
                      <h2 className="text-sm font-medium text-gray-800 line-clamp-1">
                        {item.prompt}
                      </h2>
                      <p className="text-xs text-gray-400">
                        {formatDate(item.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">

                    {/* CHIP */}
                    <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-600 capitalize">
                      {item.type}
                    </span>

                    <ChevronDown
                      size={16}
                      className={`transition ${
                        activeId === item.id ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                </div>

                {/* EXPAND */}
                <AnimatePresence>
                  {activeId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      {/* CONTENT HANDLING */}
                      <div className="mt-3">

                        {item.type === "image" ? (
                          <img
                            src={item.content}
                            className="rounded-lg max-h-60"
                          />
                        ) : (
                          <p className="text-sm text-gray-600">
                            {item.content}
                          </p>
                        )}

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            ))}

          </div>
        )}
      </div>
    </PageWrapper>
  );
}

export default DashboardPage;