import app from "./app.js";


const PORT = process.env.PORT || 4000; // Use the specified port or default to 4000

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
