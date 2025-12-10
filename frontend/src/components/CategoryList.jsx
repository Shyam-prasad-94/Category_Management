import { useEffect, useState } from "react";
import api from "../api";

export default function CategoryList({ setSelected }) {
    const [categories, setCategories] = useState([]);

    const loadData = () => {
        api.get("/api/categories").then((res) => setCategories(res.data));
    };
    // Expose function to refresh from CategoryForm
    window.refreshCategoryList = loadData;
    useEffect(loadData, []);

    return (
        <>
            <h2>Available Categories</h2>

            <table border="1" width="100%">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {categories.length > 0 ? (
                        categories.map((cat) => (
                            <tr key={cat.category_id}>
                                <td>{cat.category_name}</td>
                                <td>{cat.description}</td>
                                <td>
                                    <span className="status-active">
                                        {cat.status ? "Active" : "Inactive"}
                                    </span>
                                </td>



                                <td>
                                    <button className="edit-btn" onClick={() => setSelected(cat)}>Edit</button>
                                </td>
                                <td>
                                    <button
                                        className="delete-btn"
                                        onClick={() => {
                                            if (window.confirm("Are you sure?")) {
                                                api.delete(`/api/categories/${cat.category_id}`).then(loadData);
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                                No categories found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}
