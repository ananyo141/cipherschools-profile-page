import React from "react";
import { FaUserAstronaut } from "react-icons/fa";

type Props = {
  userName: string;
  currentWork: string;
  followers: number;
};

const FollowerTile = (props: Props) => {
  return (
    <div className="flex min-w-[300px] max-w-xs flex-col gap-4 rounded-lg bg-slate-800 p-4 text-gray-200 shadow-black">
      <FaUserAstronaut className="mx-auto h-24 w-24 rounded-full bg-gray-900 p-4 text-gray-300" />
      <div>
        <p className="text-2xl font-bold">{props.userName}</p>
        <p className="text-lg">{props.currentWork}</p>
        <p>{props.followers} Followers</p>
      </div>
      <button className="w-full rounded-lg bg-lemon-400 px-4 py-2 text-white">
        Follow
      </button>
    </div>
  );
};

export default FollowerTile;
