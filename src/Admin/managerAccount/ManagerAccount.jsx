import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Pagination, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { Input } from "reactstrap";

const ManagerAccount = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let data = [];
      const querySnapshot = await getDocs(collection(db, "user"));
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
        console.log(doc.id, " => ", doc.data());
      });
      setUserList(data);
    };
    getData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentUser = userList.slice(indexOfFirstProduct, indexOfLastProduct);
  const pageNumbers = [];
  
  for (let i = 1; i <= Math.ceil(userList.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleDelete = async (userID) => {
    await deleteDoc(doc(db, "user", userID));
    setUserList((prevState) => prevState.filter((user) => user.id !== userID));
    toast.success("complete delete");
  };

  return (
    <div>
      <div className="d-flex mt-3">
        <Input type="text" placeholder="Search" />
        <Button>search</Button>
      </div>
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>UID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUser.map((item, index) => (
              <tr>
                <td>{indexOfFirstProduct + index + 1}</td>
                <td>{item.displayName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.uid}</td>
                <td>
                  <div className="d-flex gap-4 " style={{ width: "30px" }}>
                    <i class="fa fa-pencil fs-5"></i>
                    <i
                      class="fa fa-trash fs-5"
                      onClick={() => handleDelete(item.id)}
                    ></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination>
          {pageNumbers.map((number) => (
            <Pagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
      </>
    </div>
  );
};

export default ManagerAccount;
