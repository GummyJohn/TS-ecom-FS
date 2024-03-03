import {useContext} from 'react'
import { RoleContext } from '../roleContext';
import { Products } from '../ts/interface'

interface CheckoutProp{
  cart: Products[];
}

const Checkout = ({cart}: CheckoutProp) => {
  const copyCart = [...cart];
  const { role } = useContext(RoleContext);


  return (
    <div className='mt-28'>
      <div className='w-[80%] m-auto'>
        <h1 className='text-4xl'>Checkout : {role ? role.user : 'Guest'}</h1>
        <p className='text-xl my-5'>
          Thank you for exploring my projects! We hope you've enjoyed your time with us here at ShopNest. While this isn't a live e-commerce website, we're delighted to have provided you with the opportunity to browse through all the features you were curious about
        </p>
      </div>
      <div className='w-[80%] m-auto grid grid-cols-3'>
        {copyCart.map((item) => {
          return (
            <div className='m-5 p-2' key={item.id}>
              <div className='w-[300px] h-[300px]'>
                <img src={item.image.includes('fakestore') ? item.image : `../../src/images/productImages/${item.image}` } alt="" 
                  className='w-full h-full'
                />
              </div>
              <h1>{item.title}</h1>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Checkout