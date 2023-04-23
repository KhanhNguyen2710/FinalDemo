import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { db, storage } from "../firebase";
import Ava from "../img/Ava.jpg";
import "../styles/Profile.css";

const Profile = () => {
  const userId = useSelector((state) => state.auth.uid);
  

  const [data, setData] = useState({});

  useEffect(() => {
    const getDocument = async (userId) => {
      // truyền tham số userId vào hàm
      const document = await getDoc(doc(db, "user", userId));
      if (document.exists()) {
        setData({ id: document.id, ...document.data() });
        console.log("Document data:", document.data());
      } else {
        console.log("No such document!");
      }
    };
    if (userId) {
      // kiểm tra userId trước khi gọi hàm
      getDocument(userId);
    }
  }, [userId]); // đặt userId vào dependency array để useEffect chạy lại khi userId thay đổi

const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (event) => {
    if (event.target.files[0]) {
      setAvatar(event.target.files[0]);
    }
  };

  const handleAvatarUpdate = () => {
    if (avatar) {
      const storageRef = storage.ref(`avatars/${userId}/${avatar.name}`);
      const uploadTask = storageRef.put(avatar);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress
        },
        (error) => {
          console.log(error);
        },
        () => {
          // completed
          storageRef.getDownloadURL().then((url) => {
            db.collection("users")
              .doc(userId)
              .update({
                avatarUrl: url,
              })
              .then(() => {
                console.log("Avatar updated successfully");
              })
              .catch((error) => {
                console.log(error);
              });
          });
        }
      );
    }
  };

  return (
    <Helmet title="Profile">
      <section>
        <Container>
          <Row className="profile px-4">
            {/* ==============header============== */}
            <div className="text-center my-3">
              <h3> Profile</h3>
            </div>
            {/* ==============img ava ============== */}
            <div className="d-flex gap-4 m-auto">
              {/* <img
                src={Ava}
                className="avaProfile mb-3"
                style={{ width: 90, height: 90 }}
                alt=""
              />
              <button className="btn_change">Change</button> */}
              <img
                style={{ width: 90, height: 90 }}
                className="avaProfile mb-3"
                src={data.avatarUrl || Ava}
                alt="Avatar"
              />
              <input type="file" onChange={handleAvatarChange} />
              <button onClick={handleAvatarUpdate}>Update avatar</button>
            </div>
            <div>
              {/* ==============Information Start============== */}
              <Form>
                <div className="d-flex gap-3">
                  <Col Col lg="4" md="6">
                    <label> name </label>
                    <Input
                      type="text"
                      className="mb-4"
                      placeholder="Name"
                      style={{ borderRadius: "20px", height: "50px" }}
                      value={data.displayName}
                    />
                  </Col>

                  <Col Col lg="5" md="6">
                    <label>Gmail</label>
                    <Input
                      type="email"
                      className="mb-4"
                      placeholder="Gmail"
                      style={{ borderRadius: "20px", height: "50px" }}
                      value={data.email}
                    />
                  </Col>
                </div>

                <Col Col lg="5" md="6">
                  <label>Phone</label>
                  <Input
                    type="email"
                    className="mb-4"
                    placeholder="Gmail"
                    style={{ borderRadius: "20px", height: "50px" }}
                    value={data.phone}
                  />
                </Col>

                <Form.Group
                  className=" mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <label>Description</label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    style={{ borderRadius: "20px" }}
                  />
                </Form.Group>
              </Form>
              {/* ==============Information End============== */}
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Profile;
