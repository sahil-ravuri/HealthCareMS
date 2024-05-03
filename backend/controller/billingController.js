import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import Billing from "../models/Billing.js"; // Assuming Billing model is imported correctly
import ErrorHandler from "../middlewares/error.js";
import cloudinary from "cloudinary";

// Function to create a new billing record
export const createBilling = catchAsyncErrors(async (req, res, next) => {
  const { user_id, total_amount, status } = req.body;
  
  // Check if all required fields are provided
  if (!user_id || !total_amount || !status) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  try {
    // Create a new billing instance
    const newBilling = new Billing({ user_id, total_amount, status });

    // Save the new billing record to the database
    const billing = await newBilling.save();

    // Send response with created billing record
    res.status(201).json({ success: true, data: billing });
  } catch (error) {
    // Handle errors
    console.error('Error creating billing:', error);
    next(new ErrorHandler('Internal server error', 500));
  }
});

// Function to retrieve all billing records
export const getAllBilling = catchAsyncErrors(async (req, res, next) => {
  try {
    // Retrieve all billing records from the database
    const bills = await Billing.find();

    // Send response with billing records
    res.status(200).json({ success: true, data: bills });
  } catch (error) {
    // Handle errors
    console.error('Error fetching billing records:', error);
    next(new ErrorHandler('Internal server error', 500));
  }
});
