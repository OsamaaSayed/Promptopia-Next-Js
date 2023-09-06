"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import { toastError, toastSuccess } from "@utils/toast";

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      });
      const data = response.json();
      if (!response.ok) {
        toastError(data.message);
      } else {
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
        toastSuccess("Prompt deleted successfully");
      }
    } catch (err) {
      console.log("🚀 ~ file: page.jsx:23 ~ handleDelete ~ err:", err);
      toastError();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.log("🚀 ~ file: Feed.jsx:21 ~ fetchPosts ~ err:", err);
      }
    };

    if (session?.user.id) fetchPosts();
  }, [session]);

  console.log("🚀 ~ file: page.jsx:11 ~ MyProfile ~ posts:", posts);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      isLoading={isLoading}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
