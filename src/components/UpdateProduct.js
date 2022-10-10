import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  // const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const updateProduct = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ name, price, category, company }),
      headers: {
        "Content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();

    navigate("/");
  };

  const getProductDetailById = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();

    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  useEffect(() => {
    getProductDetailById();
  }, []);

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        className="inputBox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Enter product name"
      />

      <input
        type="text"
        className="inputBox"
        value={price}
        placeholder="Enter product price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />

      <input
        type="text"
        className="inputBox"
        value={category}
        placeholder="Enter product category"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

      <input
        type="text"
        className="inputBox"
        value={company}
        placeholder="Enter product company"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />

      <button className="AppButton" onClick={updateProduct}>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
