import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Addsells = () => {
  const params = useParams();
  const [pname, setPname] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/products/update-products/${id}`,
        {
          pname,
          quantity,
          price,
        }
      );

      toast.success("Product Updated Successfully");

      navigate("/allproducs");
    } catch (error) {
      console.log(error);
    }
  };

  // get single products

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/products/single-products/${params.id}`
      );
      setPname(data.products.pname);
      setPrice(data.products.price);
      setQuantity(data.products.quantity);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [params.id]);

  return (
    <form className="w-50 m-auto mt-5" onSubmit={handleUpdate}>
      <h2>UPDATE FROM</h2>

      <>
        <div className="mb-5">
          <input
            type="text"
            value={pname}
            onChange={(e) => setPname(e.target.value)}
            id="pname"
            name="pname"
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
            id="quantity"
            name="quantity"
            className="form-control"
            placeholder="Quantity"
          />
        </div>
        <div className="mb-5">
          <input
            type="Number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="price"
            name="price"
            className="form-control"
            placeholder="Amount"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </>
    </form>
  );
};

export default Addsells;
