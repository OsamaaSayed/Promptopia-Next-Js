"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({
  post,
  isLoading,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  const [copied, setCopied] = useState("");

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="w-full flex flex-1 flex-col items-start gap-5 rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter">
      <div className="flex-1 flex justify-start gap-4 cursor-pointer">
        <Image
          src={post?.creator?.image}
          alt={post?.creator?.username}
          width={40}
          height={40}
          className="rounded-full object-contain"
        />

        <div className="flex flex-col">
          <h3 className="w-fit font-satoshi font-semibold text-gray-900">
            {post?.creator?.username}
          </h3>
          <span className="w-fit font-inter text-sm text-gray-500">
            {post?.creator?.email}
          </span>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post?.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post?.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-satoshi text-sm text-gray-700">{post.prompt}</p>
        <p
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          {post.tag}
        </p>

        {session?.user?.id === post?.creator?._id &&
          pathName === "/profile" && (
            <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
              <p
                className="font-inter text-sm green_gradient cursor-pointer"
                onClick={handleEdit}
              >
                Edit
              </p>
              <p
                className={`font-inter text-sm cursor-pointer h-5 ${isLoading ? "text-[#f59e0b]" : "orange_gradient"}`}
                onClick={handleDelete}
              >
                {isLoading ? (
                  <div
                    className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  ></div>
                ) : (
                  "Delete"
                )}
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default PromptCard;
