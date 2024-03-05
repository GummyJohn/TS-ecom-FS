import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleContext } from '../roleContext';
import { FaCartShopping } from "react-icons/fa6";
import { motion, AnimatePresence } from 'framer-motion';
import { Products } from '../ts/interface'


interface HamburgerMenuProp {
  length: number;
  already: boolean;
  added: boolean;
  setShowCart: (show: boolean) => void;
}

function HamburgerMenu({length, already, added, setShowCart}:HamburgerMenuProp) {
  const navigate = useNavigate();
  const { role, authenticate, handleSignout } = useContext(RoleContext);
  const [showMenu, setShowMenu] = useState<boolean>(false)

  function navigateCloseMenu(path: string){
    setShowMenu(false);
    navigate(path)
  }
 
  return (
    <>
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

        {role?.role !== 3000 && (
            <button
              onClick={() => setShowCart(true)}
              className="border border-black p-3 rounded-full text-black  flex items-center "
            >
              {already && <p className="mr-3">Already in Cart</p>}
              {added && <p>Added to Cart</p>}
              <FaCartShopping className="text-3xl" />
              <p className="ml-1">{length}</p>
            </button>
          )}
      </div>

      <AnimatePresence>
        {showMenu && (
          <motion.div 
            initial={{y: '-100vw'}}
            animate={{y: 0}}
            transition={{duration: .4}}
            exit={{y: '-100vw'}}
            className='fixed top-0 border border-black w-full z-30 bg-white flex justify-center items-center py-[14px]'
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
                <button 
                  onClick={() => navigateCloseMenu('/signin')}
                  className='mr-5'
                >
                  Sign In
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


export default HamburgerMenu