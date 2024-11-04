const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create a new item-tag association
router.post('/', (req, res) => {
    const { item_id, tag_id } = req.body;
    const sql = `INSERT INTO item_tags (item_id, tag_id) VALUES (?, ?)`;
    db.query(sql, [item_id, tag_id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Get all item-tag associations
router.get('/', (req, res) => {
    console.log("hi");
    const sql = `SELECT * FROM item_tags`;
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Get tags for a specific item
router.get('/item/:item_id', (req, res) => {
    const { item_id } = req.params;
    const sql = `
        SELECT tags.* 
        FROM item_tags 
        JOIN tags ON item_tags.tag_id = tags.id 
        WHERE item_tags.item_id = ?`;
    db.query(sql, [item_id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Get items for a specific tag
router.get('/tag/:tag_id', (req, res) => {
    const { tag_id } = req.params;
    const sql = `
        SELECT items.* 
        FROM item_tags 
        JOIN items ON item_tags.item_id = items.id 
        WHERE item_tags.tag_id = ?`;
    db.query(sql, [tag_id], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Delete an item-tag association
router.delete('/', (req, res) => {
    const { item_id, tag_id } = req.body;
    const sql = `DELETE FROM item_tags WHERE item_id = ? AND tag_id = ?`;
    db.query(sql, [item_id, tag_id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;
