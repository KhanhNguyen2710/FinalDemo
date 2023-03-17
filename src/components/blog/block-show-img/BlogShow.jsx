import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { db } from "../../../firebase";
import BlogModal from "../block-modal-content/BlogModal";
import "./BlogShow.css";

const BlogShow = () => {
  const [imageList, setImageList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // ===========all data===========
  useEffect(() => {
    const getData = async () => {
      let data = [];
      const querySnapshot = await getDocs(collection(db, "content"));
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
        console.log(doc.id, " => ", doc.data());
      });
      setImageList(data);
    };
    getData();
  }, []);

  // =========xét doc.id =========

  const getDocument = async (docId) => {
    const document = await getDoc(doc(db, "content", docId));
    if (document.exists()) {
      setSelectedImage({ id: document.id, ...document.data() });
      console.log("Document data:", document.data());
    } else {
      console.log("No such document!");
    }
  };

  return (
    <Container>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 3, 922: 4 }}>
        <Masonry gutter="1.5rem">
          {imageList.map((item, index) => (
            <div
              key={item.id}
              className="blog_img"
              onClick={() => {
                getDocument(item.id);
                setModalShow(true);
              }}
            >
              <label>{item.title}</label>
              <img
                src={item.img}
                alt=""
                style={{
                  width: "100%",
                  display: "block",
                  borderRadius: "15px",
                  cursor: "pointer",
                }}
              />
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
      {/* ======props into BlogModal====== */}
      {selectedImage && (
        <BlogModal
          
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={selectedImage.id}
          contentImg={selectedImage.content}
          title={selectedImage.title}
          img={selectedImage.img}
        />
      )}
    </Container>
  );
};

export default BlogShow;
