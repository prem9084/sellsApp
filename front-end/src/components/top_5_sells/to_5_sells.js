import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

const Topsells = () => {
  const [products, setProducts] = useState([]);

  const GetToFive = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/products/get-products"
      );
      toast.success("Get Top Five Products Successfully");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetToFive();
  }, []);

  const handleDelete = async (id) => {
    {
      try {
        let answer = window.prompt("Are you sure you want to delete ?");
        if (!answer) return;
        const { data } = await axios.delete(
          `http://localhost:5000/api/v1/products/delete-products/${id}`
        );
        setProducts((prevProducts) =>
          prevProducts.filter((products) => products._id !== id)
        );
        toast.success("Product Delete Successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h2 className="mt-5 text-center">TOP 5 SELLS</h2>
      <table className="table  table-striped w-50 m-auto mt-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Sales id:</th>
            <th scope="col">Product Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Sell Ammount</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <>
            {products?.map((product, index) => (
              <tr key={product._id}>
                <th scope="row">{index + 1}</th>
                <td>{product._id}</td>
                <td>{product.pname}</td>
                <td>{product.quantity}</td>
                <td>₹{product.price}</td>

                <DeleteIcon
                  onClick={() => handleDelete(product._id)}
                  className="ms-1"
                  style={{
                    fontSize: "40px",
                    cursor: "pointer",
                    color: "red",
                  }}
                />
              </tr>
            ))}
          </>
        </tbody>
      </table>
    </>
  );
};

export default Topsells;
