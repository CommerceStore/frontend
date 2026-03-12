import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductsPage } from "@/pages/products/ProductsPage";
import { ProductDetailPage } from "@/pages/products/ProductDetailPage";
import { CartPage } from "@/pages/cart/CartPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
