import Image from "next/image";
import React from "react";

export default function ContentImage({href}) {
  return (
    <div className="hp_image">
      <Image alt="intro" src={href || "@/../public/sample_image.jpg"} height={300} width={450} />
    </div>
  );
}
