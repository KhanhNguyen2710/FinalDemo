import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import galleryImages from "./galleryImages";

const MasonryImages = () => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 3, 922: 4 }}>
      <Masonry gutter="1.2rem">
        {galleryImages.map((item, index) => (
          <img
            className="masonry_img"
            src={item}
            key={index}
            alt=""
            style={{ width: "100%", display: "block", borderRadius: "10px", cursor:'pointer' }}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default MasonryImages;
