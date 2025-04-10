import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.items.find((item) => item._id === id)
  );

  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-detail">
      <img
        src={`${import.meta.env.VITE_API_BASE_URL.replace("/api", "")}${
          product.image
        }`}
        alt={product.title}
      />

      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h3>${product.price.toFixed(2)}</h3>
        <button onClick={() => dispatch(addToCart(product))}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
