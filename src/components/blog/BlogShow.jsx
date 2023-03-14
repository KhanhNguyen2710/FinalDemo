import { Box } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { Col, Container } from 'react-bootstrap';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Label } from 'reactstrap';
import { db, storage } from '../../firebase';
import BlogModal from './BlogModal';
import"./BlogShow.css"

const BlogShow = () => {
const [imageList, setImageList] = useState([]); //array

 // const storageRef = ref(storage, "content/");
  
  // useEffect(() => {
  //   listAll(storageRef).then((response) => {
  //     //console.log(response);
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageList((data)=> [...data,url])
  //       })
  //     })
  //   });
  // }, []);

  useEffect(() => {
    const getData = async () => {
      let data = [];
      const querySnapshot = await getDocs(collection(db, "content"));
      querySnapshot.forEach((doc) => {
        // doc.data() 
        data.push({ id: doc.id, ...doc.data() });
        console.log(doc.id, " => ", doc.data());
      });
      setImageList(data);
    };
    getData();
  },[])


  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Container>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 3, 922: 4 }}>
        <Masonry gutter="1.5rem" onClick={() => setModalShow(true)}>
          {imageList.map((item, index) => (
            <div key={item.id} className="blog_img">
              <label>{item.content}</label>
              <img
                //className="masonry_img"
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
        <BlogModal show={modalShow} onHide={() => setModalShow(false)} />
      </ResponsiveMasonry>
    </Container>
  );
}

export default BlogShow