import React from 'react'
import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import "./SidebarProduct.css"




const SidebarProduct = () => {
  return (
    <div className="sideBar-Product gap-3">
      {/* ============================================================ */}
      <div className="search-product d-flex">
        <input className="searchItem" type="text" placeholder="Search" />
        <button className="searchButton">
          <i class="ri-search-2-line fs-6"></i>
        </button>
      </div>
      {/* ============================================================ */}

      <div
        className="divider"
        style={{ padding: "0", borderBottom: "1px solid black" }}
      />
      {/* ============================================================ */}
      <div>
        <Form.Select
          className="select-choose"
          aria-label="Default select example"
        >
          <option>Choose...</option>
          <option value="1">flour</option>
          <option value="2">seed</option>
          <option value="3">tool</option>
        </Form.Select>
      </div>
    </div>
  );
};

export default SidebarProduct