import { useContext, useState, useEffect, useLayoutEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Products } from "../ts/interface";
import { RoleContext } from "../roleContext";
import HamburgerMenu from "./HamburgerMenu";
import Cart from "./Cart";

interface NavbarProp {
  length: number;
  already: boolean;
  added: boolean;
  cart: Products[];
  setCart: React.Dispatch<React.SetStateAction<Products[]>>;
}

const Navbar = ({ length, already, added, cart, setCart }: NavbarProp) => {
  const navigate = useNavigate();
  const { role, handleSignout, authenticate } = useContext(RoleContext);
  const [showCart, setShowCart] = useState<boolean>(false);

  function directHome() {
    if (role?.role === 3000) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }

  useLayoutEffect(() => {
    authenticate()   
  }, [])

  return (
    <>
      <HamburgerMenu
        length={length}
        already={already}
        added={added}
        setShowCart={setShowCart}
        showCart={showCart}
        setCart={setCart}
        cart={cart}
      />

      <div
        className={
          role?.role === 3000
            ? " fixed w-full top-0 bg-white z-30 hidden md:inline py-3"
            : " fixed w-full top-0 bg-white z-30 hidden md:inline"
        }
      >
        <div className="hidden md:flex justify-between items-center py-3 px-6">
          <h1 className="text-xl">ShopNest</h1>

          <div className="flex items-center">
            <button
              onClick={directHome}
              className="mx-3 cursor-pointer hover:underline hover:text-blue-500"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/browse")}
              className="mx-3 cursor-pointer hover:underline hover:text-blue-500"
            >
              Browse
            </button>

            {!role && (
              <button
                onClick={() => navigate("/signin")}
                className="mx-3 cursor-pointer hover:underline hover:text-blue-500"
              >
                Sign In
              </button>
            )}

            {role && (
              <button
                onClick={() => handleSignout(navigate, "/")}
                className="mx-3 cursor-pointer hover:underline hover:text-blue-500"
              >
                Sign Out
              </button>
            )}
            {role?.role !== 3000 && (
              <button
                onClick={() => setShowCart(true)}
                className="border border-black p-3 rounded-full hover:border-blue-500 hover:text-blue-500 flex items-center "
              >
                {already && <p className="mr-3">Already in Cart</p>}
                {added && <p>Added to Cart</p>}
                <FaCartShopping className="text-3xl" />
                <p className="ml-1">{length}</p>
              </button>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showCart && (
            <Cart cart={cart} setCart={setCart} setShowCart={setShowCart} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navbar;
