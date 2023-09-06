"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

import { toastError, toastSuccess } from "@utils/toast";

const UpdatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({ prompt: post.prompt, tag: post.tag }),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        toastError(data.message);
      } else {
        toastSuccess("Prompt updated successfully");
        router.push("/");
      }
    } catch (err) {
      console.log(err);
      toastError();
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        setPost({ prompt: data.prompt, tag: data.tag });
      } catch (err) {
        console.log("🚀 ~ file: page.jsx:37 ~ useEffect ~ err:", err);
      }
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
