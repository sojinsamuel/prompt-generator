"use client";
import PromptCard from "./PromptCard";

const Profile = ({ name, data, desc, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient"> {name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {/* {JSON.stringify(data)} */}
        {data.map((post) => (
          <PromptCard
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
            key={post.id}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
