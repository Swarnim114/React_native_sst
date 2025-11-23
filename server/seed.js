import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/product.model.js';

dotenv.config();

const seedProducts = [
    // Fruits
    { name: 'Red Apple', price: 40, imageUrl: '🍎', category: 'Fruits', stock: 50, description: 'Fresh red apples from Kashmir' },
    { name: 'Banana Bunch', price: 30, imageUrl: '🍌', category: 'Fruits', stock: 100, description: 'Organic Robusta bananas' },
    { name: 'Orange', price: 60, imageUrl: '🍊', category: 'Fruits', stock: 80, description: 'Juicy Nagpur oranges' },
    { name: 'Grapes', price: 50, imageUrl: '🍇', category: 'Fruits', stock: 40, description: 'Seedless black grapes' },
    { name: 'Watermelon', price: 40, imageUrl: '🍉', category: 'Fruits', stock: 20, description: 'Sweet and refreshing watermelon' },
    { name: 'Mango', price: 100, imageUrl: '🥭', category: 'Fruits', stock: 60, description: 'Alphonso mangoes' },
    { name: 'Pineapple', price: 80, imageUrl: '🍍', category: 'Fruits', stock: 30, description: 'Fresh pineapple' },
    { name: 'Strawberry', price: 120, imageUrl: '🍓', category: 'Fruits', stock: 25, description: 'Fresh strawberries' },

    // Vegetables
    { name: 'Spinach', price: 20, imageUrl: '🥬', category: 'Vegetables', stock: 70, description: 'Fresh green spinach' },
    { name: 'Carrot', price: 35, imageUrl: '🥕', category: 'Vegetables', stock: 80, description: 'Crunchy orange carrots' },
    { name: 'Potato', price: 25, imageUrl: '🥔', category: 'Vegetables', stock: 150, description: 'New harvest potatoes' },
    { name: 'Tomato', price: 30, imageUrl: '🍅', category: 'Vegetables', stock: 100, description: 'Ripe red tomatoes' },
    { name: 'Broccoli', price: 60, imageUrl: '🥦', category: 'Vegetables', stock: 40, description: 'Fresh broccoli florets' },
    { name: 'Onion', price: 30, imageUrl: '🧅', category: 'Vegetables', stock: 120, description: 'Red onions' },
    { name: 'Corn', price: 25, imageUrl: '🌽', category: 'Vegetables', stock: 50, description: 'Sweet corn cobs' },
    { name: 'Cucumber', price: 20, imageUrl: '🥒', category: 'Vegetables', stock: 60, description: 'Crisp cucumbers' },

    // Dairy
    { name: 'Milk 1L', price: 50, imageUrl: '🥛', category: 'Dairy', stock: 200, description: 'Full cream fresh milk' },
    { name: 'Paneer 200g', price: 120, imageUrl: '🧀', category: 'Dairy', stock: 40, description: 'Soft and fresh paneer' },
    { name: 'Butter 100g', price: 55, imageUrl: '🧈', category: 'Dairy', stock: 60, description: 'Salted butter' },
    { name: 'Yogurt', price: 30, imageUrl: '🥣', category: 'Dairy', stock: 50, description: 'Natural probiotic yogurt' },
    { name: 'Cheese Slices', price: 140, imageUrl: '🧀', category: 'Dairy', stock: 30, description: 'Processed cheese slices' },

    // Bakery
    { name: 'Bread', price: 40, imageUrl: '🍞', category: 'Bakery', stock: 40, description: 'Whole wheat bread' },
    { name: 'Croissant', price: 60, imageUrl: '🥐', category: 'Bakery', stock: 20, description: 'Butter croissant' },
    { name: 'Bagel', price: 50, imageUrl: '🥯', category: 'Bakery', stock: 25, description: 'Freshly baked bagel' },
    { name: 'Pancakes', price: 80, imageUrl: '🥞', category: 'Bakery', stock: 15, description: 'Fluffy pancake mix' },

    // Snacks
    { name: 'Popcorn', price: 30, imageUrl: '🍿', category: 'Snacks', stock: 50, description: 'Butter salted popcorn' },
    { name: 'Chips', price: 20, imageUrl: '🍟', category: 'Snacks', stock: 100, description: 'Classic salted chips' },
    { name: 'Cookies', price: 40, imageUrl: '🍪', category: 'Snacks', stock: 60, description: 'Choco chip cookies' },
    { name: 'Chocolate', price: 50, imageUrl: '🍫', category: 'Snacks', stock: 80, description: 'Milk chocolate bar' },
    { name: 'Pretzels', price: 45, imageUrl: '🥨', category: 'Snacks', stock: 30, description: 'Salted pretzels' },

    // Beverages
    { name: 'Coffee', price: 150, imageUrl: '☕', category: 'Beverages', stock: 40, description: 'Instant coffee powder' },
    { name: 'Tea', price: 100, imageUrl: '🍵', category: 'Beverages', stock: 60, description: 'Premium tea leaves' },
    { name: 'Juice', price: 90, imageUrl: '�', category: 'Beverages', stock: 30, description: 'Mixed fruit juice' },
    { name: 'Soda', price: 40, imageUrl: '🥤', category: 'Beverages', stock: 50, description: 'Carbonated soft drink' },

    // Electronics (just for fun/variety as per example)
    { name: 'Phone Case', price: 299, imageUrl: '📱', category: 'Electronics', stock: 10, description: 'Durable phone case' },
    { name: 'Headphones', price: 999, imageUrl: '🎧', category: 'Electronics', stock: 5, description: 'Wireless headphones' },

    // Clothes
    { name: 'T-Shirt', price: 499, imageUrl: '👕', category: 'Clothes', stock: 20, description: 'Cotton crew neck t-shirt' },
    { name: 'Jeans', price: 999, imageUrl: '👖', category: 'Clothes', stock: 15, description: 'Blue denim jeans' }
];

const seedDB = async () => {
    try {
        console.log('Loading environment variables...');
        // Try loading from current directory
        dotenv.config();

        // If that didn't work, try specifying path (in case cwd is different)
        if (!process.env.MONGO_URI) {
            console.log('Trying to load .env from absolute path...');
            // Assuming we are in server/ directory
            dotenv.config({ path: './.env' });
        }

        console.log('Environment variables loaded.');

        const envKeys = Object.keys(process.env).filter(key => key.includes('MONGO') || key.includes('DB'));
        console.log('Available env keys:', envKeys);

        const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI; // Try both common names

        if (!mongoUri) {
            console.error('Error: MONGO_URI is undefined.');
            process.exit(1);
        }

        console.log(`Connecting to MongoDB (URI length: ${mongoUri.length})...`);
        await mongoose.connect(mongoUri);
        console.log('Connected to mongo — seeding...');

        await Product.deleteMany({});
        await Product.insertMany(seedProducts);

        console.log('Seed complete');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
