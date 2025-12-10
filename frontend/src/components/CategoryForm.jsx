import { useEffect, useState } from "react";
import api from "../api";

export default function CategoryForm({ selected, setSelected }) {
  const [form, setForm] = useState({
    category_name: "",
    description: "",
  });

  useEffect(() => {
    if (selected) {
      setForm(selected);
    }
  }, [selected]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (form.category_id) {
      await api.put(`/api/categories/${form.category_id}`, form);
      alert("Category updated successfully!");
    } else {
      await api.post("/api/categories", form);
      alert("Category added successfully!");
    }

    setForm({ category_name: "", description: "" });
    setSelected(null);

    // Refresh list without reload
    if (typeof window.refreshCategoryList === "function") {
      window.refreshCategoryList();
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
};


  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{form.category_id ? "Update Category" : "Add Category"}</h2>

      <input
        type="text"
        placeholder="Category Name"
        required
        value={form.category_name}
        onChange={(e) => setForm({ ...form, category_name: e.target.value })}
      />

      <textarea
        placeholder="Category Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <button type="submit">
  {form.category_id ? "Update Category" : "Create Category"}
</button>

      {form.category_id && (
        <button
          type="button"
          className="cancel-btn"
          onClick={() => {
            setForm({ category_name: "", description: "" });
            setSelected(null);
          }}
        >
          Cancel Edit
        </button>
      )}
    </form>
  );
}
