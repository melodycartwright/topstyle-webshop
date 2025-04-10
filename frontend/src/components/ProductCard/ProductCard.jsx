import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // prevents card click
    e.preventDefault(); // prevents link navigation
    dispatch(addToCart(product));
  };

  return (
    <Link to={`/product/${product._id}`} className="product-card-link">
      <div className="product-card">
        <img
          src={`${import.meta.env.VITE_API_BASE_URL.replace("/api", "")}${
            product.image
          }`}
          alt={product.title}
        />

        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </Link>
  );
};

export default ProductCard;
