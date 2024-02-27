import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

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
  const [imgIndex, setImgIndex] = useState<number>(0)

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

      <div>
        
      </div>
    </>
  )
}

export default Home