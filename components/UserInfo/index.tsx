import React from "react";
import Avatar from "../Avatar/Avatar";
import Content from "../Content";

const UserInfo = ({
  name,
  email,
  image,
  size = 40,
}: {
  name: string;
  email?: string;
  image?: string;
  size?: number;
}) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-shrink-0">
        <Avatar src={image} size={size} />
      </div>
      <Content title={name} description={email || ""} />
    </div>
  );
};

export default UserInfo;
