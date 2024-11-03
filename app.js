const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.json());

// Import routes
const sellersRoute = require('./routes/sellers');
const itemsRoute = require('./routes/items');
const photosRoute = require('./routes/photos');
const tagsRoute = require('./routes/tags');
const itemTagsRoute = require('./routes/item_tags');

// Use routes
app.use('/sellers', sellersRoute);
app.use('/items', itemsRoute);
app.use('/photos', photosRoute);
app.use('/tags', tagsRoute);
app.use('/item-tags', itemTagsRoute);

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.json()); // parses JSON bodies
const cors = require('cors');
app.use(cors()); // allows cross-origin requests from frontend

// Routes
app.use(itemsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
