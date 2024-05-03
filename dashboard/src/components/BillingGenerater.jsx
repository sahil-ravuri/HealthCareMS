import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    user_id: "",
    items: [{ name: "", quantity: 0, price: 0 }],
    status: "",
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newItems = [...formData.items];
    newItems[index][name] = value;
    setFormData({ ...formData, items: newItems });
  };

  const addNewItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: "", quantity: 0, price: 0 }],
    });
  };

  const removeItem = (index) => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData({ ...formData, items: newItems });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/billing",
        formData
      );
      toast.success("Bill generated successfully!");
      console.log("Bill:", response.data.data);
      // Clear form data after successful submission
      setFormData({
        user_id: "",
        items: [{ name: "", quantity: 0, price: 0 }],
        status: "",
      });
    } catch (error) {
      toast.error("Failed to generate bill.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            name="user_id"
            value={formData.user_id}
            onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
          />
        </div>
        <div>
          <label>Items:</label>
          {formData.items.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Name"
                value={item.name}
                onChange={(e) => handleChange(e, index)}
                name="name"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleChange(e, index)}
                name="quantity"
              />
              <input
                type="number"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleChange(e, index)}
                name="price"
              />
              <button type="button" onClick={() => removeItem(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addNewItem}>Add Item</button>
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          />
        </div>
        <button type="submit">Generate Bill</button>
      </form>
    </div>
  );
};

export default Dashboard;
