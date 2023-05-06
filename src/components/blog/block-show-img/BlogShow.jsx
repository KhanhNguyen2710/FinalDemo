import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { db } from "../../../firebase";
import BlogModal from "../block-modal-content/BlogModal";
import "./BlogShow.css";
import Ava from "../../../img/Ava.jpg"
import { toast } from "react-toastify";

const BlogShow = () => {
  const [imageList, setImageList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userData, setUserData] = useState({});

  //all data

useEffect(() => {
  const getData = async () => {
    const data = [];
    const querySnapshot = await getDocs(collection(db, "content"));
    const promises = querySnapshot.docs.map(async (doc) => {
      const userId = doc.data().userId;
      const user = await getUser(userId);
      data.push({ id: doc.id, ...doc.data(), user });
    });
    await Promise.all(promises);
    setImageList(data);
  };
  getData();
}, []);

  //asynchronous - bđb /=> user
  const getUser = async (userId) => {
    const document = await getDoc(doc(db, "user", userId));
    if (document.exists()) {
      const user = { id: document.id, ...document.data() };
      return user; //Promise
    } else {
      console.log("No such document!");
    }
  };

  // xét doc.id
  const getDocument = async (docId) => {
    const document = await getDoc(doc(db, "content", docId));

    if (document.exists()) {
      const userId = document.data().userId;
      const user = await getUser(userId);
      setSelectedImage({ id: document.id, ...document.data(), user });
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
              {/* xác thực  */}
              <div>
                <img
                  className="mb-2 "
                  src={Ava}
                  alt=""
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />

                <label> {item.user.displayName} </label>
              </div>
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
          displayName={selectedImage.user.displayName}
        />
      )}
    </Container>
  );
};

export default BlogShow;
