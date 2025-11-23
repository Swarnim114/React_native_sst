import express from 'express';
import Product from '../models/product.model.js';
const router = express.Router();

// GET /api/products
router.get('/', async (req, res) => {
    try {
        const { q, category } = req.query;
        const filter = {};
        if (q) filter.name = { $regex: q, $options: 'i' };
        if (category) filter.category = category;

        const products = await Product.find(filter);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/products
router.post('/', async (req, res) => {
    try {
        const { name, price, imageUrl, category, description, stock } = req.body;
        const product = new Product({ name, price, imageUrl, category, description, stock });
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: 'Bad request', details: err.message });
    }
});

export default router;
