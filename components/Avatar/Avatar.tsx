import Image from "next/image";
import React from "react";

const Avatar = ({
  src = "/user-avatar.png",
  size,
}: {
  src?: string;
  size?: number;
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full overflow-hidden"
    >
      <Image
        src={src || "/user-avatar.png"}
        alt="avatar"
        width={500}
        height={500}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Avatar;
