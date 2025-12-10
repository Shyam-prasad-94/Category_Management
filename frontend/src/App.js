import { useState } from "react";
import CategoryForm from "./components/CategoryForm";
import CategoryList from "./components/CategoryList";
import "./App.css";

function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="container">
      <h1>Category Management System</h1>

      <CategoryForm selected={selected} setSelected={setSelected} />
      <CategoryList setSelected={setSelected} />
    </div>
  );
}

export default App;
