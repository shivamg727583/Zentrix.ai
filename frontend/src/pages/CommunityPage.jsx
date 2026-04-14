import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { PageWrapper } from "../components/ui/PageWrapper";
import { dummyPublishedCreationData } from "../assets/assets";
import { useUser } from "@clerk/react";

function CommunityPage() {

  const [posts, setPosts] = useState([ ]);
  const {user}= useUser();

  const fetchPosts = ()=>{
    setPosts(dummyPublishedCreationData)
  }


  useEffect(()=>{
    if(user)  fetchPosts();
  },[user])

  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              likes: p.likes.length ? [] : ["me"],
            }
          : p
      )
    );
  };

  return (
    <PageWrapper>

      <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">

        {/* HEADER */}
        <h1 className="text-xl sm:text-2xl font-semibold flex items-center gap-2 text-gray-800">
          <Sparkles className="text-purple-500" />
          Community Creations
        </h1>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {posts.map((post) => (
            <motion.div
              key={post.id}
              whileHover={{ scale: 1.03 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
            >

              {/* IMAGE */}
              <img
                src={post.content}
                className="w-full h-60 object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">

                {/* PROMPT */}
                <p className="text-white text-sm line-clamp-3 mb-2">
                  {post.prompt}
                </p>

                {/* FOOTER */}
                <div className="flex items-center justify-between">

                  {/* TYPE CHIP */}
                  <span className="text-xs px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur">
                    {post.type}
                  </span>

                  {/* LIKE BUTTON */}
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(post.id);
                    }}
                    className="flex items-center gap-1 text-white"
                  >
                    <Heart
                      size={18}
                      className={`transition ${
                        post.likes.length
                          ? "fill-red-500 text-red-500"
                          : ""
                      }`}
                    />
                    <span className="text-xs">{post.likes.length}</span>
                  </motion.button>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </PageWrapper>
  );
}

export default CommunityPage;