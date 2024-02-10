import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Addsells = () => {
  const [pname, setPname] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleEntry = async (e) => {
    e.preventDefault();
    try {
      const { res } = await axios.post(
        "http://localhost:5000/api/v1/products/create-product",
        {
          pname,
          quantity,
          price,
        }
      );

      toast.success("Product Created Successfully");

      navigate("/allproducs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="w-50 m-auto mt-5" onSubmit={handleEntry}>
        <h2>ADD SELL ENTRY</h2>
        <div className="mb-5">
          <input
            type="text"
            value={pname}
            onChange={(e) => setPname(e.target.value)}
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Product Name"
          />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-5">
          <input
            type="Number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="form-control"
            placeholder="Quantity"
          />
        </div>
        <div className="mb-5">
          <input
            type="Number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
            placeholder="Amount"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </>
  );
};

export default Addsells;
