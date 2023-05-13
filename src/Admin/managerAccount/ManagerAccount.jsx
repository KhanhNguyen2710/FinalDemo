import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Pagination, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { Input } from "reactstrap";
import { db } from "../../firebase";

const ManagerAccount = () => {
  const [userList, setUserList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    const getData = async () => {
      let data = [];
      const querySnapshot = await getDocs(collection(db, "user"));
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
        console.log(doc.id, " => ", doc.data());
      });
      setUserList(data);
      setLoading(false);
    };
    getData();
  }, []);

  const handleSearch = () => {
    const filteredList = userList.filter((user) => {
      const { displayName, email } = user;
      const searchValue = searchInput.toLowerCase();
      return (
        displayName.toLowerCase().includes(searchValue) ||
        email.toLowerCase().includes(searchValue)
      );
    });
    setFilteredUserList(filteredList);
  };
  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }

  //implement pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const currentUsers = filteredUserList.slice(
    indexOfFirstUser,
    indexOfLastUser
  );
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(userList.length / usersPerPage); i++) {
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
        <Input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Button onClick={handleSearch}>search</Button>
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
            {/* {currentUser.map((item, index) => (
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
            ))} */}
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan="6">No users found.</td>
              </tr>
            ) : (
              currentUsers.map((item, index) => (
                <tr key={item.id}>
                  <td>{indexOfFirstUser + index + 1}</td>
                  <td>{item.displayName}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.uid}</td>
                  <td>
                    <div className="d-flex gap-4 " style={{ width: "30px" }}>
                      <i
                        class="fa fa-trash fs-5"
                        onClick={() => handleDelete(item.id)}
                      ></i>
                    </div>
                  </td>
                </tr>
              ))
            )}
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
