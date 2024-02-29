import { useState, useContext, useEffect } from 'react'
import { RoleContext } from '../roleContext'
import { useNavigate } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import NewItem from '../components/NewItem'

interface ShowcaseProps{
  title: string;
  subText: string;
  path: string
}

const showcaseInfo = [
  {
    title: 'Techonolgy', 
    subtext: 'Look at the latest modern Technogoly with us!', 
    path: '/products/Technology', 
    img: '../src/images/technologyBG.jpg'
  },
  {
    title: "Men's Clothes", 
    subtext:" Discover the newest trends in men's fashion with us!", path: "/products/Men's Clothes", 
    img: '../src/images/mensclothesBG.jpg'
  },
  {
    title: "Women's Clothes", 
    subtext: "Indulge in the latest trends in women's fashion with us!", 
    path: "/products/Women's Clothes",
    img: '../src/images/womenclothesBG.jpg'
  },
  {
    title: 'Jewerly', 
    subtext: 'Explore the finest contemporary jewelry trends with us!', path: '/products/Jewerly',
    img: '../src/images/jewelryBG.jpg'
  },
]  

const Showcase = ({title, subText, path}: ShowcaseProps) => {
  const navigate = useNavigate();

  return (
    <div className='text-center'>
      <div className='text-7xl mb-5'>{title}</div>
      <p className='text-2xl mb-5'>{subText}</p>
      <button onClick={() => navigate(path)}
        className='border py-2 px-4 rounded-2xl hover:bg-black'
      >
        Shop now!
      </button>
    </div>
  )
}

const Home = () => {
  console.log('home rendered')
  const navigate = useNavigate();
  const { role, authenticate } = useContext(RoleContext)
  const [imgIndex, setImgIndex] = useState<number>(0)
  const [data, setData] = useState({})

  const bgStyle = {
    backgroundImage : `url(${showcaseInfo[imgIndex].img})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }

  function changeShowcase(sign: string){
    if(sign === '+'){
      if(imgIndex === showcaseInfo.length - 1){
        setImgIndex(0)
      }else{
        setImgIndex(imgIndex + 1)
      }
    }

    if(sign === '-'){
      if(imgIndex === 0){
        setImgIndex(showcaseInfo.length - 1)
      }else{
        setImgIndex(imgIndex - 1)
      }
    }
  }

  return (
    <>
      <div style={bgStyle}
        className='h-[50vh] mt-20 relative flex items-center'
      >
        <div className='bg-black absolute opacity-70 h-full w-full z-10'></div>
        <div className='relative z-20 text-white flex justify-between items-center w-full px-10'>
          <button onClick={() => changeShowcase('-')}
            className='hover:bg-black rounded-full p-2 '
          >
            <FaChevronLeft className='text-5xl'/>
          </button>
          <Showcase 
            title={showcaseInfo[imgIndex].title}
            subText={showcaseInfo[imgIndex].subtext}
            path={showcaseInfo[imgIndex].path}
          />
          <button onClick={() => changeShowcase('+')}
            className='hover:bg-black rounded-full p-2 '
          >
            <FaChevronRight className='text-5xl'/>
          </button>
        </div>
      </div>

      {
        role === null && (
        <div className='h-[40vh] text-center flex justify-center items-center'>
          <div 
            style={{boxShadow: '0px 0px 50px 10px'}}
            className='border p-4 w-[90%] rounded-3xl shadow-2xl shadow-black'
          >
            <p className='text-3xl mb-7'>Welcome Guest to ShopNest!</p>
            <p className='text-xl w-[80%] m-auto text-center mb-7'>
              Explore a premier destination where cutting-edge technology, the latest in men's and women's fashion, and exquisite jewelry of unparalleled quality converge, offering a comprehensive shopping experience like no other!
            </p>
            <p className='text-xl w-[80%] m-auto text-center mb-7'>
              Embark on an unparalleled shopping journey with us! Register an account to unlock exclusive access to the latest products and ensure you never miss out on exciting updates. Don't settle for being a guest when you can elevate your experience with us!
            </p>
            <button 
              onClick={() => navigate('/signin')}
              className='border py-2 px-4 rounded-2xl border-black hover:bg-black hover:text-white'
            >
              Sign Up
            </button>
          </div>
        </div>
        )
      }
      { 
        role !== null && (
          <div className='h-[40vh]'>
            <div>Welcome User : {role.user}</div> 
            <NewItem/>
          </div>
        )
      }      
    </>
  )
}

export default Home