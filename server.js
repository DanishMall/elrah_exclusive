const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock API endpoint for processing payment
app.post('/api/checkout', (req, res) => {
    const { productName, productPrice, cardholderName, cardNumber, expiry, cvc } = req.body;

    // Validate input
    if (!productName || !productPrice || !cardholderName || !cardNumber || !expiry || !cvc) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Mock payment processing logic
    const paymentSuccessful = Math.random() > 0.2; // 80% success rate simulation

    if (paymentSuccessful) {
        res.status(200).json({ success: true, message: 'Payment successful!' });
    } else {
        res.status(500).json({ success: false, message: 'Payment failed. Please try again.' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
