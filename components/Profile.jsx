import React from "react";

import PromptCard from "@components/PromptCard";

const Profile = ({ name, desc, data, isLoading, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-16 w-full flex flex-wrap gap-4">
        {data?.map((post) => (
          <PromptCard
            key={post?._id}
            post={post}
            isLoading={isLoading}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
