// Import required modules
const express = require('express');
const router = express.Router();
const Billing = require('./models/Billing');

// Route to create a new billing record
router.post('/billing', async (req, res) => {
  try {
    // Extract data from request body
    const { user_id, total_amount, status } = req.body;

    // Create a new billing instance
    const newBilling = new Billing({ user_id, total_amount, status });

    // Save the new billing record to the database
    const billing = await newBilling.save();

    // Send response with created billing record
    res.status(201).json({ billing });
  } catch (error) {
    // Handle errors
    console.error('Error creating billing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to retrieve all billing records
router.get('/billing', async (req, res) => {
  try {
    // Retrieve all billing records from the database
    const bills = await Billing.find();

    // Send response with billing records
    res.status(200).json({ bills });
  } catch (error) {
    // Handle errors
    console.error('Error fetching billing records:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export the router
module.exports = router;
