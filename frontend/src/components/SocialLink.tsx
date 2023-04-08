import React from "react";

type Props = {
  title: string;
  icon: React.ReactNode;
};

const SocialLink = (props: Props) => {
  return (
    <div>
      <h3 className="mb-2 font-medium">{props.title}</h3>
      <div className="flex items-center gap-4 rounded-md bg-gray-100 px-3 py-3 shadow-md">
        <div className="text-3xl">{props.icon}</div>
        <input
          type="text"
          className="ml-2 w-full bg-gray-100 focus:outline-none"
          placeholder={props.title}
        />
      </div>
    </div>
  );
};

export default SocialLink;
