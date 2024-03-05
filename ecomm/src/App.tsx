import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Products } from "./ts/interface";
import CaterogryTemplate from "./components/CaterogryTemplate";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import SigninPage from "./components/SigninPage";
import AddProductForm from "./forms/AddProductForm";
import UpdateForm from "./forms/UpdateForm";
import ProductPage from "./components/ProductPage";
import AdminPage from "./components/AdminPage";
import Checkout from "./components/Checkout";

function App() {
  const storageCartString = localStorage.getItem("cart");
  const storageCart = storageCartString ? JSON.parse(storageCartString) : null;

  const [cart, setCart] = useState<Products[]>(storageCart || []);
  const [already, setAlready] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);

  function addCart(item: Products) {
    const already = cart.find((cartItem) => cartItem.id === item.id);
    if (already) {
      setAlready(true);
      setTimeout(() => {
        setAlready(false);
      }, 1000);
      return;
    }

    setCart((prevCart) => [...prevCart, { ...item, quanity: 1 }]);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1000);
  }

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <BrowserRouter>
      <Navbar
        cart={cart}
        setCart={setCart}
        length={cart.length}
        added={added}
        already={already}
      />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/products/technology"
          element={
            <CaterogryTemplate
              imgSrc="technology"
              category="technology"
              title="Technology"
              addCart={addCart}
            />
          }
        />

        <Route
          path="/products/men's Clothes"
          element={
            <CaterogryTemplate
              imgSrc="mensclothes"
              category="men-clothing"
              title="Men's Clothes"
              addCart={addCart}
            />
          }
        />

        <Route
          path="/products/women's Clothes"
          element={
            <CaterogryTemplate
              imgSrc="womenclothes"
              category="women-clothing"
              title="Women's Clothes"
              addCart={addCart}
            />
          }
        />

        <Route
          path="/products/jewerly"
          element={
            <CaterogryTemplate
              imgSrc="jewelry"
              category="jewelry"
              title="Jewelry"
              addCart={addCart}
            />
          }
        />

        <Route path="/admin" element={<AdminPage />} />
        <Route path="/browse" element={<Search addCart={addCart} />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/addproduct" element={<AddProductForm />} />
        <Route path="/updateproduct/:id" element={<UpdateForm />} />
        <Route path="/product/:id" element={<ProductPage addCart={addCart}/>} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
