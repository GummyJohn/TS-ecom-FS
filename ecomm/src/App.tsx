import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { Products } from './utils'
import CaterogryTemplate from './components/CaterogryTemplate'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Search from './components/Search'


function App() {
  const storageCartString = localStorage.getItem('cart');
  const storageCart = storageCartString ? JSON.parse(storageCartString) : null;

  const [cart, setCart] = useState<Products[]>(storageCart || [])
  const [already, setAlready] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);

  function addCart(item: Products){
    const already = cart.find((cartItem) => cartItem.id === item.id)
    if(already) {
      setAlready(true)
      setTimeout(() => { setAlready(false) }, 1000)
      return
    };

    setCart((prevCart) => [...prevCart, {...item, quanity: 1}])
    setAdded(true)
    setTimeout(() => { setAdded(false) }, 1000)

    localStorage.setItem('cart', JSON.stringify([...cart, {...item, quanity: 1}]))
  }

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
        <Route path='/' element={<Home/>}/>

        <Route path='/products/Technology' element={
          <CaterogryTemplate imgSrc='technology' category='Technology' title='Technology'
            addCart={addCart}
          />
        }/>

        <Route path="/products/Men's Clothes" element={
          <CaterogryTemplate imgSrc='mensclothes' category="Men's-Clothes" title="Men's Clothes" addCart={addCart}/>
        }/>

        <Route path="/products/Women's Clothes" element={
          <CaterogryTemplate imgSrc='womenclothes' category="Women's-Clothes" title="Women's Clothes" addCart={addCart}/>
        }/>

        <Route path='/products/Jewerly' element={
          <CaterogryTemplate imgSrc='jewelry' category="Jewerly" title="Jewerly" addCart={addCart}/>
        }/>

        <Route path='/browse' element={<Search addCart={addCart}/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
