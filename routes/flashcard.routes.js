const express = require('express');
const router = express.Router();
const pool = require('../config/dbconfig');

// Route to get all flashcards
router.get('/', async (_, res) => {
    console.log("request ayi hai")
    try {
        const [rows] = await pool.query('SELECT * FROM flashcards');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({ error: 'Database query failed' });
    }
});

// Route to add a new flashcard
router.post('/', async (req, res) => {
    const { question, answer } = req.body;
    // console.log(question,answer)
    try {
        const [result] = await pool.query(
            'INSERT INTO flashcards (question, answer) VALUES (?, ?)',
            [question, answer]
        );
        res.status(201).json({ id: result.insertId, question, answer });
    } catch (error) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

// Route to update an existing flashcard
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    console.log(id,question,answer)
    try {
        const [result] = await pool.query(
            'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?',
            [question, answer, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Flashcard not found' });
        }
        res.json({ id, question, answer });
    } catch (error) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

// Route to delete a flashcard
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query(
            'DELETE FROM flashcards WHERE id = ?',
            [id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Flashcard not found' });
        }
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).json({ error: 'Database query failed' });
    }
});

module.exports = router;
