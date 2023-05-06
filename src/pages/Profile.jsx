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
  }, [userId]); // useEffect chạy lại khi userId thay đổi

const [editedData, setEditedData] = useState({});
  
const updateUserData = async () => {
  try {
    await db.collection("user").doc(userId).update(editedData);
    alert("Update successful!");
  } catch (error) {
    console.error(error);
    alert("Update failed!");
  }
};
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setEditedData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const [isEditing, setIsEditing] = useState(false);

const handleEditClick = () => {
  setIsEditing(true);
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
              <img
                src={data.photURL|| Ava}
                className="avaProfile mb-3"
                style={{ width: 90, height: 90 }}
                alt=""
              />
              <button className="btn_change">Change</button>
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
