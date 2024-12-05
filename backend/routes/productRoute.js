import express from "express";
import Product from "../models/productModel";
import { isAuth, isAdmin } from "../util";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products);
    } catch (error) {
        res.status(500).send({ message: "Error in fetching products" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findOne({ _id: req.params.id });
        if (product) {
            return res.send(product);  // Chỉ gửi phản hồi một lần
        } else {
            return res.status(404).send({ message: "404 product not found" });
        }
    } catch (error) {
        return res.status(500).send({ message: "Error in fetching product" });
    }
});

router.post("/", async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            brand: req.body.brand,
            category: req.body.category,
            countInStock: req.body.countInStock,
            description: req.body.description,
            rating: req.body.rating,
            numReviews: req.body.numReviews
        });
        const newProduct = await product.save();
        if (newProduct) {
            return res.status(201).send({ message: "New Product Created", data: newProduct });
        }
        return res.status(500).send({ message: "Error in Creating Product." });
    } catch (error) {
        return res.status(500).send({ message: "Error in creating product" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById({ _id: productId });
        if (product) {
            product.name = req.body.name;
            product.price = req.body.price;
            product.image = req.body.image;
            product.brand = req.body.brand;
            product.category = req.body.category;
            product.countInStock = req.body.countInStock;
            product.description = req.body.description;
            const updatedProduct = await product.save();
            if (updatedProduct) {
                return res.status(200).send({ message: "Product Updated", data: updatedProduct });
            }
        }
        return res.status(500).send({ message: "Error in Updating Product." });
    } catch (error) {
        return res.status(500).send({ message: "Error in updating product" });
    }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
    try {
        const deletedProduct = await Product.findById(req.params.id);
        if (deletedProduct) {
            await deletedProduct.remove();
            return res.send({ message: "Product Deleted" });
        } else {
            return res.status(404).send({ message: "Product Not Found" });
        }
    } catch (error) {
        return res.status(500).send({ message: "Error in deleting Product." });
    }
});

export default router;
