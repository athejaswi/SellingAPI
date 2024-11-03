const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create new item
// router.post('/', (req, res) => {
//     const { title, seller_id, negotiability, condition, description, availability_timeframe } = req.body;
//     const sql = `INSERT INTO items (title, seller_id, negotiability, condition, description, availability_timeframe) VALUES (?, ?, ?, ?, ?, ?)`;
//     db.query(sql, [title, seller_id, negotiability, condition, description, availability_timeframe], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

router.post('/', (req, res) => {
    const { title, condition, description } = req.body;
    const sql = `INSERT INTO items (title, condition, description) VALUES (?, ?, ?)`;
    db.query(sql, [title, condition, description], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to add item' });
        } else {
            res.status(201).json({ message: 'Item added successfully', itemId: result.insertId });
        }
    });
});

// Get all items
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM items';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Update item
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, negotiability, condition, description, availability_timeframe } = req.body;
    const sql = `UPDATE items SET title = ?, negotiability = ?, condition = ?, description = ?, availability_timeframe = ? WHERE id = ?`;
    db.query(sql, [title, negotiability, condition, description, availability_timeframe, id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Filter items by condition
router.get('/condition/:condition', (req, res) => {
    const sql = `SELECT * FROM items WHERE condition = ?`;
    db.query(sql, [condition], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Delete item
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM items WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;
