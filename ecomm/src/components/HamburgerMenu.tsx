import { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleContext } from '../roleContext';
import { FaCartShopping } from "react-icons/fa6";
import { motion, AnimatePresence } from 'framer-motion';
import { Products } from '../ts/interface';
import Cart from './Cart';

interface HamburgerMenuProp {
  length: number;
  already: boolean;
  added: boolean;
  showCart: boolean;
  cart: Products[];
  setShowCart: (show: boolean) => void;
  setCart: React.Dispatch<React.SetStateAction<Products[]>>;
}

function HamburgerMenu(
  {length, already, added, showCart ,setShowCart, setCart, cart}:HamburgerMenuProp) {
  const navigate = useNavigate();
  const { role, authenticate, handleSignout } = useContext(RoleContext);
  const [showMenu, setShowMenu] = useState<boolean>(false)
  
  function navigateCloseMenu(path: string){
    setShowMenu(false);
    navigate(path)
  }

  function homePath(){
    setShowMenu(false);
    if(role?.role === 3000){
      navigate('/admin')
    }else{
      navigate('/')
    }
  }
 
  function signOut(){
    setShowMenu(false);
    handleSignout(navigate, '/')
  }

  useLayoutEffect(() => {
    authenticate();
  }, [])

  return (
    <>
      {role?.role === 3000 && (
        <div className=' md:hidden w-full flex items-center h-[10vh] justify-evenly py-2 px-4 fixed z-30 top-0 bg-white'>
          <button 
            onClick={homePath}
            className='mr-5'
          >
            Home
          </button>
          <button 
            onClick={() => navigateCloseMenu('/browse')}
            className='mr-5'
          >
            Browse
          </button>
          {
            role && (
              <button 
                onClick={signOut}
                className='mr-5'
                >
                Sign Out
              </button>
            )
          }
        </div>
      )}

      {(role?.role === 2000 || role === null) && (
        <div 
          className=' md:hidden w-full flex items-center justify-between py-2 px-4 fixed z-30 top-0 bg-white'
        >
          <div 
            className='bg-white border-2 h-10 w-10 border-black flex  items-center rounded-[50%] z-30 justify-center relative'
          > 
            <button 
              onClick={() => setShowMenu(true)}
              className='flex flex-col justify-center items-center h-full w-full rounded-[50%] justify-center'
            >
              <div className ='flex flex-col justify-evenly items-center h-[50%] w-[50%] rounded-[50%]'>
                <div 
                  className='bg-black h-1 w-full rounded-2xl'
                ></div>

                <div
                  className='bg-black h-1 w-full rounded-2xl '
                ></div>
              </div>
            </button>
          </div> 
          
          <button
            onClick={() => setShowCart(true)}
            className="border border-black p-3 rounded-full text-black flex items-center"
          >
            {already && <p className="mr-3">Already in Cart</p>}
            {added && <p>Added to Cart</p>}
            <FaCartShopping className="text-3xl" />
            <p className="ml-1">{length}</p>
          </button>
        
        </div>
      )}

        <AnimatePresence>
          {showCart && (
            <Cart cart={cart} setCart={setCart} setShowCart={setShowCart} />
          )}
        </AnimatePresence>

      <AnimatePresence>
        {showMenu && (
          <motion.div 
            initial={{y: '-100vw'}}
            animate={{y: 0}}
            transition={{duration: .4}}
            exit={{y: '-100vw'}}
            className='fixed top-0 border border-black w-full z-30 bg-white flex justify-center items-center py-[13px]'
          >   
            <div className='flex items-center justify-between w-full px-5'>
              <button
                onClick={() => setShowMenu(false)}
                className='border-2 border-black p-2 rounded-full'
              >
                X
              </button>
              <div className=''>
                <button 
                  onClick={() => navigateCloseMenu('/')}
                  className='mr-5'
                >
                  Home
                </button>
                <button 
                  onClick={() => navigateCloseMenu('/browse')}
                  className='mr-5'
                >
                  Browse
                </button>
                { 
                  role?.role ? (
                    <button 
                      onClick={signOut}
                      className='mr-5'
                    >
                      Sign Out
                    </button>
                 ) : (
                    <button 
                      onClick={() => navigateCloseMenu('/signin')}
                      className='mr-5'
                    >
                      Sign In
                    </button>
                 )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


export default HamburgerMenu