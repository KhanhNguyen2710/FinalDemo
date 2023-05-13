import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Container, Pagination, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { Input } from "reactstrap";
import AddProduct from "../../components/product/add-Product/AddProduct";
import { db } from "../../firebase";
import "../managerProduct/ManagerProduct.css";

const ManagerProduct = () => {
  const [productList, setProductList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredProductList, setFilteredProductList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let data = [];
      const querySnapshot = await getDocs(collection(db, "product"));
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
        console.log(doc.id, " => ", doc.data());
      });
      setProductList(data);
    };
    getData();
  }, []);

  const handleProductAdded = () => {
    const getData = async () => {
      let data = [];
      const querySnapshot = await getDocs(collection(db, "product"));
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setProductList(data);
    };
    getData();
  };

  const handleDelete = async (productId) => {
    await deleteDoc(doc(db, "product", productId));
    setProductList((prevState) =>
      prevState.filter((product) => product.id !== productId)
    );
    toast.success("complete delete");
  };

  const handleSearch = () => {
    const filteredList = productList.filter((product) => {
      const { productName } = product;
      const searchValue = searchInput.toLowerCase();
      return productName.toLowerCase().includes(searchValue);
    });
    setFilteredProductList(filteredList);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  //implement pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProductList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(productList.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <div>
        <AddProduct onProductAdded={handleProductAdded} />
      </div>

      <div className="mt-3">
        <div className="d-flex">
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
                <th>Price</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* {currentProducts.map((item, index) => (
                <tr key={index}>
                  <td>{indexOfFirstProduct + index + 1}</td>
                  <td>{item.productName}</td>
                  <td>{item.price + "$"} </td>
                  <td>
                    <img
                      src={item.img}
                      alt=""
                      style={{ width: "auto", height: "100px" }}
                    />
                  </td>
                  <td>
                    <div className="d-flex gap-4 " style={{ width: "30px" }}>
                      <i
                        class="fa fa-trash fs-5"
                        onClick={() => handleDelete(item.id)}
                      ></i>

                      <i class="fa fa-pencil fs-5"></i>
                    </div>
                  </td>
                </tr>
              ))} */}
              {currentProducts.length === 0 ? (
                <tr>
                  <td colSpan="6">No products found.</td>
                </tr>
              ) : (
                currentProducts.map((item, index) => (
                  <tr key={index}>
                    <td>{indexOfFirstProduct + index + 1}</td>
                    <td>{item.productName}</td>
                    <td>{item.price + "$"} </td>
                    <td>
                      <img
                        src={item.img}
                        alt=""
                        style={{ width: "auto", height: "100px" }}
                      />
                    </td>
                    <td>
                      <div className="d-flex gap-4 " style={{ width: "30px" }}>
                        <i
                          class="fa fa-trash fs-5"
                          onClick={() => handleDelete(item.id)}
                        ></i>

                        <i class="fa fa-pencil fs-5"></i>
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
    </Container>
  );
};

export default ManagerProduct;
