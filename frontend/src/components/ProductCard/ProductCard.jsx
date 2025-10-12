import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState("M");

  const sizes = ["XS", "S", "M", "L", "XL"];

  const handleAddToCart = (e) => {
    e.stopPropagation(); // prevents card click
    e.preventDefault(); // prevents link navigation
    const productWithSize = {
      ...product,
      selectedSize,
      cartId: `${product._id}-${selectedSize}`, // unique identifier for cart items
    };
    dispatch(addToCart(productWithSize));
  };

  const handleSizeChange = (e) => {
    e.stopPropagation();
    setSelectedSize(e.target.value);
  };

  return (
    <Link to={`/product/${product._id}`} className="product-card-link">
      <div className="product-card">
        <img
          src={`${import.meta.env.VITE_API_BASE_URL.replace("/api", "")}${
            product.image
          }`}
          alt={product.title}
          onError={(e) => {
            console.error("Image failed to load:", e.target.src);
            e.target.src = "/placeholder-image.jpg"; // fallback
          }}
        />

        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <div className="size-selection" onClick={(e) => e.stopPropagation()}>
          <label htmlFor={`size-${product._id}`}>Size:</label>
          <select
            id={`size-${product._id}`}
            value={selectedSize}
            onChange={handleSizeChange}
            className="size-dropdown"
          >
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </Link>
  );
};

export default ProductCard;
