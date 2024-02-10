import ProductModel from "../models/ProductModel.js";

export const createProductController = async (req, res) => {
  try {
    const { pname, price, quantity } = req.body;

    // validation

    switch (true) {
      case !pname:
        return res.status(500).send({
          error: "Name is Require",
        });

      case !price:
        return res.status(500).send({
          error: "price is Require",
        });

      case !quantity:
        return res.status(500).send({
          error: "quantity is Require",
        });
    }

    const products = new ProductModel({ ...req.body });

    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "Error While creating a new product",
      error,
    });
  }
};

// for get sel entry

export const getSaleEntry = async (req, res) => {
  try {
    const products = await ProductModel.find().sort({ price: -1 }).limit(5);
    res.status(200).send({
      totalCount: products.length,
      success: true,
      message: "Get Top Five Sell Entry Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting",
      error,
    });
  }
};

export const GetAllproducs = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).send({
      totalCount: products.length,
      success: true,
      message: "Get  All Products Successfully",
      products,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting Products",
      error,
    });
  }
};

// for delete products

export const deleteProducts = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Products",
      error,
    });
  }
};
// for update
export const updateProducts = async (req, res) => {
  try {
    const { pname, quantity, price } = req.body;
    const products = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    await products.save();
    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating Products",
      error,
    });
  }
};

// single product

export const singleProductController = async (req, res) => {
  try {
    const _id = req.params.id;
    const products = await ProductModel.findById({
      _id,
    });

    res.status(200).send({
      success: true,
      message: "Get Single Products Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting all products",
      error,
    });
  }
};

// today revinew
export const todayRevinew = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalPrice = await ProductModel.aggregate([
      {
        $match: {
          createdAt: { $gte: today },
        },
      },

      {
        $group: {
          _id: null,
          total: { $sum: "$price" },
        },
      },
    ]);
    res.status(201).send({
      success: true,
      message: "Today Revinew Calculate successfully",
      total: totalPrice.length > 0 ? totalPrice[0].total : 0,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
    });
  }
};
