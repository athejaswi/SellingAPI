const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Create a new seller
router.post('/', (req, res) => {
    const { username, firstName, lastName } = req.body;
    const sql = `INSERT INTO sellers (username, firstName, lastName) VALUES (?, ?, ?)`;
    db.query(sql, [username, firstName, lastName], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Get all sellers
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM sellers';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

// Update a seller
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { username, firstName, lastName, items_sold } = req.body;
    const sql = `UPDATE sellers SET username = ?, firstName = ?, lastName = ?, items_sold = ? WHERE id = ?`;
    db.query(sql, [username, firstName, lastName, items_sold, id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Delete a seller
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM sellers WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

module.exports = router;
