import React from "react";

const ReviewItem = (props) => {
  const { name, quantity, key, price } = props.product;
  const reviewItemStyle = {
    borderBottom: "1px solid #c2c0dd",
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
    marginLeft: "200px",
  };
  return (
    <div style={reviewItemStyle} className="review-item">
      <h4 className="product-name">{name}</h4>
      <p>Quantity: {quantity}</p>
      <p style={{ fontSize: "1.2rem", fontWeight: "600", color: "#1BAF4C" }}>
        $ {price}
      </p>
      <br />
      <button className="main-button" onClick={() => props.removeProduct(key)}>
        Remove{" "}
      </button>
    </div>
  );
};

export default ReviewItem;
