import express from "express";

import {
  GetAllproducs,
  createProductController,
  deleteProducts,
  getSaleEntry,
  singleProductController,
  todayRevinew,
  updateProducts,
} from "../controller/ProductController.js";

const router = express.Router();

// add sale entry
// from create

router.post("/create-product", createProductController);

// for get products
router.get("/get-products", getSaleEntry);

// for get all products
router.get("/getAll-products", GetAllproducs);

// for get single product
router.get("/single-products/:id", singleProductController);

//for delete product
router.delete("/delete-products/:id", deleteProducts);

// for update product
router.put("/update-products/:id", updateProducts);

// today revinew

router.get("/today-revinew", todayRevinew);

export default router;
