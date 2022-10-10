import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const saveProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    if (result) {
      navigate("/");
    }
  };
  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Enter product name"
      />
      {error && !name && (
        <span className="invalid-input">Enter valid name</span>
      )}
      <input
        type="text"
        className="inputBox"
        value={price}
        placeholder="Enter product price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      {error && !price && (
        <span className="invalid-input">Enter valid price</span>
      )}

      <input
        type="text"
        className="inputBox"
        value={category}
        placeholder="Enter product category"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      {error && !category && (
        <span className="invalid-input">Enter valid category</span>
      )}

      <input
        type="text"
        className="inputBox"
        value={company}
        placeholder="Enter product company"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />
      {error && !company && (
        <span className="invalid-input">Enter valid company</span>
      )}

      <button className="AppButton" onClick={saveProduct}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
