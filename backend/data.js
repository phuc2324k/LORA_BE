import mongoose from "mongoose";

export default {
    products: [
        {
            name: "Nike Men's Regular fit T-Shirt",
            category: "Shirt",
            image: "/images/d1.jpg",
            price: 35,
            brand: " Nike",
            rating: 3.0,
            numReviews: 13,
            countInStock: 6,
            description: "High quality T-shirt for men"
        },
        {
            name: "Nike Men's Track Pants",
            category: "Pants",
            image: "/images/d2.jpg",
            price: 50,
            brand: " Nike",
            rating: 4.2,
            numReviews: 66,
            countInStock: 8,
            description: "Comfortable track pants for men"
        },
        {
            name: "Nike Men's Track Pants Gray",
            category: "Pants",
            image: "/images/d3.jpg",
            price: 70,
            brand: " Nike",
            rating: 4,
            numReviews: 8,
            countInStock: 8,
            description: "Stylish gray track pants for men"
        },
        {
            name: "Nike Girl's Plain Regular fit T-Shirt",
            category: "Pants",
            image: "/images/d4.jpg",
            price: 40,
            brand: " Nike",
            rating: 3.5,
            numReviews: 18,
            countInStock: 9,
            description: "Plain T-shirt for girls"
        }
    ]
};
