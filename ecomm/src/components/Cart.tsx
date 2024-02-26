import { motion } from 'framer-motion'
import { Products } from '../utils'
import CartItem from './CartItem';

interface CartProps {
  setShowCart : (state: boolean) => void;
  cart: Products[];
  setCart: (data: Products[]) => void;
}

const Cart = ({setShowCart, cart, setCart}: CartProps) => {
  const total = cart.reduce((total : number, curr: Products) => total + (curr.price * curr.quanity), 0).toFixed(2)

  return (
    <div className='absolute h-full w-full z-50'>
        <motion.div 
          initial={{x: '+100vw'}}
          animate={{x: 0}}
          transition={{duration: .7}}
          exit={{x: '+100vw'}}
          className='h-screen w-[40%] bg-white fixed z-40 right-0 p-3 fixed top-0'
        >
          <div className=''>
            <button   
              onClick={() => setShowCart(false)}
              className='border border-black p-3 rounded-2xl mt-5 ml-5 hover:bg-black hover:text-white'
            >
              X
            </button>
          </div>

          <div
            className='mt-10 p-2 flex flex-col h-[90%]'
          >
              <p className='text-5xl'>
                <span>Cart : </span>
                <span> ${total}</span>
              </p>
         
            
            <div
              className='h-[90%] overflow-auto'
            >
              {cart && cart.map((item) => {
                return (
                  <CartItem 
                    id={item.id}
                    key={item.id} 
                    list={cart} 
                    setCart={setCart} 
                    cartItem={item}
                  />
                )
              })}
            </div>

            <button
              className='py-2 px-4 rounded-2xl bg-black text-white mt-5'
            >
              Checkout
            </button>

          </div>
        </motion.div>
    </div>
  )
}

export default Cart