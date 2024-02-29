import { useContext, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Products } from "../ts/utils";
import { RoleContext } from "../roleContext";
import Cart from "./Cart";

interface NavbarProp {
  length: number;
  already: boolean;
  added: boolean;
  cart: Products[];
  setCart: (data: Products[]) => void;
}

const Navbar = ({ length, already, added, cart, setCart }: NavbarProp) => {
  const navigate = useNavigate();
  const { role, handleSignout } = useContext(RoleContext)
  const [showCart, setShowCart] = useState<boolean>(false);

  return (
    <div className="fixed w-full top-0 bg-white z-30">
      <div className="flex justify-between items-center py-3 px-6">
        <h1 className="text-xl">ShopNest</h1>

        <div className="flex items-center">
          <button
            onClick={() => navigate("/")}
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

          {
            role === null && (
              <button
                onClick={() => navigate("/signin")}
                className="mx-3 cursor-pointer hover:underline hover:text-blue-500"
              >
                Sign In
              </button> 
            )
          }
          {
            role !== null && (
              <button
                onClick={handleSignout}
                className="mx-3 cursor-pointer hover:underline hover:text-blue-500"
              >
                Sign Out
              </button> 
            )
          }
         

          <button
            onClick={() => setShowCart(true)}
            className="border border-black p-3 rounded-full hover:border-blue-500 hover:text-blue-500 flex items-center "
          >
            {already && <p className="mr-3">Already in Cart</p>}
            {added && <p>Added to Cart</p>}
            <FaCartShopping className="text-3xl" />
            <p className="ml-1">{length}</p>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showCart && (
          <Cart cart={cart} setCart={setCart} setShowCart={setShowCart} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
