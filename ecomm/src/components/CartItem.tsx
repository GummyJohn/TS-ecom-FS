import { useNavigate } from "react-router-dom";
import { Products } from "../ts/interface";

interface CartItemProps {
  id: number;
  list: Products[];
  cartItem: Products;
  setCart: (data: Products[]) => void;
  setShowCart:  (state: boolean) => void;
}

const CartItem = ({ list, setCart, cartItem, id, setShowCart }: CartItemProps) => {
  const navigate = useNavigate();
  function addQuanity(id: number) {
    const findItem = list.find((item) => item.id === id);

    setCart(
      list.map((item) =>
        item.id === findItem?.id
          ? { ...item, quanity: item.quanity + (item.quanity < 9 ? 1 : 0) }
          : item
      )
    );
  }

  function subQuanity(id: number) {
    const findItem = list.find((item) => item.id === id);

    setCart(
      list.map((item) =>
        item.id === findItem?.id
          ? { ...item, quanity: item.quanity - (item.quanity > 1 ? 1 : 0) }
          : item
      )
    );
  }

  function handleDelete(id: number) {
    const filtered = list.filter((item) => item.id !== id);

    setCart(filtered);
  }
  
  function navigateProduct(id: number){
    navigate(`/product/${id}`)
    setShowCart(false)
    console.log(id)
  }

  return (
    <div className="flex flex-col 2xl:flex-row items-center my-5 border-b-2 pb-5 relaitve">
      <div className="md:w-[50%] h-[200px] md:h-full p-3">
        <img
          src={
            cartItem.image.includes("http")
              ? cartItem.image
              : `../../src/images/productImages/${cartItem.image}`
          }
          alt="cart item"
          className="w-full h-full"
        />
      </div>

      <div className="md:w-[50%] text-center flex justify-center flex-col items-center relative z-20">
        <p className="w-[95%] mb-2">{cartItem.title}</p>
        <p>Size: {cartItem.size}</p>
        <div className="flex flex-col xl:flex-row items-center justify-between w-[85%] my-2 w-full">
          <p>${(cartItem.price * cartItem.quanity).toFixed(2)}</p>
          <div className="flex items-center">
            <button
              onClick={() => addQuanity(id)}
              className="py-2 px-4 border rounded-2xl bg-blue-500 text-white hover:bg-blue-700 mx-2"
            >
              +
            </button>
            <span>{cartItem.quanity}</span>

            <button
              onClick={() => subQuanity(id)}
              className="py-2 px-4 border rounded-2xl bg-blue-500 text-white hover:bg-blue-700 mx-2"
            >
              -
            </button>
          </div>
        </div>
        <div>
          <button
            onClick={() => handleDelete(id)}
            className="border py-2 px-4 border rounded-2xl bg-red-500 text-white hover:bg-red-700 mx-2"
          >
            Remove
          </button>
          <button
            onClick={() => navigateProduct(id)}
            className="border py-2 px-4 border rounded-2xl text-white bg-blue-500 hover:bg-blue-700 mx-2"
          >
            More Info
          </button>

        </div>
      </div>
    </div>
  );
};

export default CartItem;
