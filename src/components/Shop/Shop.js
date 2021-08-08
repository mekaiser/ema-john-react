import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    addToDatabaseCart,
    getDatabaseCart
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [itemTosearch, setItemToSearch] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://hidden-badlands-31862.herokuapp.com/products?search=" + search)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [search]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    fetch("https://hidden-badlands-31862.herokuapp.com/productsByKeys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => {
        const cartProducts = productKeys.map((key) => {
          const product = data.find((product) => product.key === key);
          product.quantity = savedCart[key];
          return product;
        });
        console.log("cartProducts",cartProducts);
        setCart(cartProducts);
      });
  }, []);

  const handleSetSearch = (event) => {
    setItemToSearch(event.target.value);
  };

  const handleSearch = () => {
    setSearch(itemTosearch);
  };

  const handleAddProduct = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    console.log(newCart);
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };

  return (
    <div className="twin-container">
      <div className="product-container">
        <div className="input-div">
          <input
            placeholder="search"
            type="text"
            onBlur={handleSetSearch}
            className="product-search"
          />
          <button className="btn search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
        {products.length === 0 && <p>Loading.........</p>}
        {products.map((pd) => (
          <Product
            key={pd.key}
            showAddToCart={true}
            handleAddProduct={handleAddProduct}
            product={pd}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="main-button">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
