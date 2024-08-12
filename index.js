const express = require('express');
const cors = require('cors');
const flashcardRoutes = require('./routes/flashcard.routes');
require('dotenv').config(); // environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    // origin: process.env.CORS_ORIGIN,
    origin: 'http://localhost:3000',
}))


// app.use('/',(req,res) =>{
//     res.send("Hello server is running")
// })

//flashcard routes
app.use('/api/flashcards', flashcardRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
