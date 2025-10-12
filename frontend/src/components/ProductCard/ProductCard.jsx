import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState("M");

  const sizes = ["XS", "S", "M", "L", "XL"];

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const productWithSize = {
      ...product,
      selectedSize,
      cartId: `${product._id}-${selectedSize}`,
    };
    dispatch(addToCart(productWithSize));

    // Show success message
    toast.success(`${product.title} (Size ${selectedSize}) added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleSizeChange = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedSize(e.target.value);
  };

  const handleCardClick = (e) => {
    // Only navigate if clicking on the card itself, not interactive elements
    if (
      e.target.tagName === "SELECT" ||
      e.target.tagName === "OPTION" ||
      e.target.tagName === "BUTTON"
    ) {
      e.preventDefault();
      return;
    }
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <Link to={`/product/${product._id}`} className="product-image-link">
        <img
          src={`${import.meta.env.VITE_API_BASE_URL.replace("/api", "")}${
            product.image
          }`}
          alt={product.title}
          onError={(e) => {
            console.error("Image failed to load:", e.target.src);
            e.target.src = "/placeholder-image.jpg";
          }}
        />
      </Link>

      <div className="product-info">
        <Link to={`/product/${product._id}`} className="product-title-link">
          <h3>{product.title}</h3>
        </Link>
        <p className="product-price">${product.price}</p>

        <div className="size-selection" onClick={(e) => e.stopPropagation()}>
          <label htmlFor={`size-${product._id}`}>Size:</label>
          <select
            id={`size-${product._id}`}
            value={selectedSize}
            onChange={handleSizeChange}
            className="size-dropdown"
            onClick={(e) => e.stopPropagation()}
          >
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <button onClick={handleAddToCart} className="add-to-cart-btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
