import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productSlice";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state) => state.products);

  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Extract unique categories from product list
  const categories = [...new Set(products.map((p) => p.category))];

  // Filtered product list
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div className="home">
      <div className="hero">
        <h1>Discover Your Style</h1>
        <p>Shop the latest fashion in comfort and elegance.</p>
      </div>

      {/* ✅ Category Filter Buttons */}
      <div className="category-filter">
        <button
          onClick={() => setSelectedCategory("")}
          className={selectedCategory === "" ? "active" : ""}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? "active" : ""}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ✅ Product Grid */}
      <div className="product-grid">
        {loading && <p>Loading products...</p>}
        {error && <p>Error: {error}</p>}
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
