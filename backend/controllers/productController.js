const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product).status(200);
});

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  if (!products) {
    res.status(404);
    throw new Error("Products not found");
  }
  res.json(products).status(200);
});

const createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    dimensions,
    weight,
    warrantyInformation,
    shippingInformation,
    brand,
    price,
    discountPercentage,
    rating,
    stock,
    tags,
    sku,
    availabilityStatus,
    images,
    thumbnail,
    reviews,
    returnPolicy,
  } = req.body;

  if (
    !title ||
    !description ||
    !dimensions ||
    !weight ||
    !warrantyInformation ||
    !shippingInformation ||
    !brand ||
    !category ||
    !price ||
    !discountPercentage ||
    !rating ||
    !stock ||
    !tags ||
    !sku ||
    !availabilityStatus ||
    !images ||
    !thumbnail ||
    !reviews ||
    !returnPolicy
  ) {
      res.status(400);
      throw new Error("One or more compulsory fields missing!");
  }
  const product = await Product.findOne({sku});
  if (product) {
    res.status(409);
    throw new Error("Product already exists!");
  }
  const productCreated = await Product.create({
    title,
    description,
    category,
    dimensions,
    weight,
    warrantyInformation,
    shippingInformation,
    brand,
    price,
    discountPercentage,
    rating,
    stock,
    tags,
    sku,
    availabilityStatus,
    images,
    thumbnail,
    reviews,
    returnPolicy,
  });
  if (!productCreated) {
    res.status(400);
    throw new Error("Something went wrong while product creation!");
  }
  res.json({ message: "Product created successfully!", details: productCreated,}).status(201);
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    dimensions,
    weight,
    warrantyInformation,
    shippingInformation,
    brand,
    price,
    discountPercentage,
    rating,
    stock,
    tags,
    sku,
    availabilityStatus,
    images,
    thumbnail,
    reviews,
    returnPolicy,
  } = req.body;
  
  if (
    !title ||
    !description ||
    !dimensions ||
    !weight ||
    !warrantyInformation ||
    !shippingInformation ||
    !brand ||
    !category ||
    !price ||
    !discountPercentage ||
    !rating ||
    !stock ||
    !tags ||
    !sku ||
    !availabilityStatus ||
    !images ||
    !thumbnail ||
    !reviews ||
    !returnPolicy
  ) {
      res.status(400);
      throw new Error("One or more compulsory fields missing!");
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found");
      }
    const productUpdated = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new : true }
    );
    if (!productUpdated) {
      res.status(400);
      throw new Error("Bad request or something went wrong!");
    }
    res.json({ message: "Product updated successfully!", details: productUpdated,}).status(200);
});
  
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    const deletedProduct = await Product.deleteOne({ _id: req.params.id })
    res.json({ message: `Product '${product.title}' deleted successfully!`, details: deletedProduct }).status(200);
});

module.exports = { getProduct, getProducts, createProduct, updateProduct, deleteProduct }
