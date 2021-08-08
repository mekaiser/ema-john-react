import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = (props) => {
    // console.log(props);
    const { img, name, seller, price, stock, key } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-details-single">
                <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link></h4>
                <br />
                <p style={{ fontSize: "1.2rem", fontWeight: "600"}}><small>by: {seller}</small></p>
                <p style={{ fontSize: "1.2rem", fontWeight: "600", color: "#1BAF4C"}}>${price}</p>
                <p><small>Only {stock} left in stock - Order soon</small></p>
                { props.showAddToCart === true && <button 
                    className="btn main-button" 
                    onClick={() => props.handleAddProduct(props.product)}
                    > 
                        <FontAwesomeIcon icon={faShoppingCart} /> add to cart
                    </button>}
            </div>

        </div>
    );
};

export default Product;