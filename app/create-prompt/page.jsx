"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Form from "@components/Form";

import { toastError, toastSuccess } from "@utils/toast";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const router = useRouter();
  const { data: session } = useSession();

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({ ...post, userId: session?.user.id }),
      });
      const data = await response.json();

      if (!response.ok) {
        toastError(data.message);
      } else {
        toastSuccess("Prompt created successfully");
        router.push("/");
      }
    } catch (err) {
      console.log("🚀 ~ file: page.jsx:35 ~ createPrompt ~ err:", err);
      toastError();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
