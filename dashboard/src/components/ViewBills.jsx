import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { isAuthenticated } = useContext(Context);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBills();
    }
  }, [isAuthenticated]);

  const fetchBills = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/bills", {
        withCredentials: true,
      });
      setBills(response.data.bills);
    } catch (error) {
      toast.error("Failed to fetch bills.");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="bills">
        {bills.map((bill) => (
          <div key={bill._id} className="bill">
            <h2>Invoice Date: {bill.invoice_date}</h2>
            <p>Total Amount: ${bill.total_amount}</p>
            <p>Amount Paid: ${bill.amount_paid}</p>
            <p>Status: {bill.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
