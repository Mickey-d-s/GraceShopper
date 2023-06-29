import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { fetchAllCategories } from "../api/categories";

export default function allCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await fetchAllCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Categories List</h2>
      {categories.map((category) => (
        <div key={category.category_id}>{category.category_name}</div>
      ))}
    </div>
  );
}
