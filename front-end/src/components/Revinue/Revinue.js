import React, { useEffect, useState } from "react";
import axios from "axios";

const Revinue = () => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(0);
  const GetAllproducs = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/products/get-products"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllproducs();
    totalPrice();
  });

  const totalPrice = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/products/today-revinew"
      );
      setPrice(response.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  const formatPriceInRupees = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <>
      <div>
        <h1 className="mt-5 text-center">
          TODAY'S REVINUE: {formatPriceInRupees(price)}
        </h1>
      </div>
    </>
  );
};

export default Revinue;
