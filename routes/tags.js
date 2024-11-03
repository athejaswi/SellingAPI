const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create a new tag
router.post('/', (req, res) => {
    const { tag_name, description } = req.body;
    const sql = `INSERT INTO tags (tag_name, description) VALUES (?, ?)`;
    db.query(sql, [tag_name, description], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Get all tags
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM tags';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(result);
    });
});

// Update tag
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { tag_name, description } = req.body;
    const sql = `UPDATE tags SET tag_name = ?, description = ?`;
    db.query(sql, [tag_name, description], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Delete tag
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM tags WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;