const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('./uploads'));

// Routes
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const packageRoutes = require('./routes/packageRoutes');
const packageFeatureRoutes = require('./routes/packageFeatureRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const systemInfoRoutes = require('./routes/systemInfoRoutes');
const contactRoutes = require('./routes/contactRoutes');


// Routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/features', packageFeatureRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/systeminfo', systemInfoRoutes);
app.use('/api/contacts', contactRoutes);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


