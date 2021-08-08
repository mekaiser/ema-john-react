import React from "react";
import "./Inventory.css";

const Inventory = () => {
  const handleAddProduct = () => {
    const product = {};
    fetch("https://hidden-badlands-31862.herokuapp.com/addProduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
  };
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="inventory-div">
          <form action="">
            <input
              className="text-input"
              type="text"
              placeholder="Product name"
            />
            <input
              className="text-input"
              type="text"
              placeholder="Product price"
            />
            <input
              className="text-input"
              type="text"
              placeholder="Product quantity"
            />
            <input className="product-image-input" type="file"/>
          </form>
          <button className="add-product-btn" onClick={handleAddProduct}>
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
