const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create a new photo
router.post('/', (req, res) => {
    const { image_url, item_id, caption } = req.body;
    const sql = `INSERT INTO photos (image_url, item_id, caption) VALUES (?, ?, ?)`;
    db.query(sql, [image_url, item_id, caption], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Get all photos
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM photos';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(result);
    });
});

// Get all photos for a specific item
router.get('/item/:item_id', (req, res) => {
    const { item_id } = req.params;
    const sql = `SELECT * FROM photos WHERE item_id = ?`;
    db.query(sql, [item_id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Update photo
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { image_url, item_id, caption } = req.body;
    const sql = `UPDATE photos SET image_url = ?, item_id = ?, caption = ?`;
    db.query(sql, [image_url, item_id, caption], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Delete photo
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM photos WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;