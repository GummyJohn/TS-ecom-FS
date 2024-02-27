import { Products } from "../ts/utils";

interface CartItemProps {
  id: number;
  list: Products[];
  cartItem: Products;
  setCart: (data: Products[]) => void;
}

const CartItem = ({ list, setCart, cartItem, id }: CartItemProps) => {
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

  return (
    <div className="flex items-center ">
      <div className="w-[50%] h-[200px] p-3">
        <img src={cartItem.image} alt="" className="w-full h-full" />
      </div>

      <div className="w-[50%] text-center flex justify-center flex-col items-center">
        <p className="w-[95%] mb-2">{cartItem.title}</p>

        <div className="flex items-center justify-between w-[85%] my-2">
          <p>$ {(cartItem.price * cartItem.quanity).toFixed(2)}</p>
          <div>
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

        <button
          onClick={() => handleDelete(id)}
          className="border py-2 px-4 border rounded-2xl bg-red-500 text-white hover:bg-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
