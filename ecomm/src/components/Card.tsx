import { RoleContext } from '../roleContext'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DeleteConfirmation from './DeleteConfirmation'

interface CardProps {
  id: number;
  img: string;
  title: string;
  price: number;
  category: string;
  onClick: () => void;
}

const Card = ({id, title, price, img, onClick, category} : CardProps) => {
  const navigate = useNavigate();
  const { role } = useContext(RoleContext);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [sizeRequired, setSizeRequired] = useState<boolean>(false);

  function sizeNeeded(){
    const titleLower = title.toLowerCase();

    if(category.includes('clothing') && !(titleLower.includes('backpack'))){
      setSizeRequired(true)
      setTimeout(() => {setSizeRequired(false)}, 1000)
    } else{
      onClick()
    }
  }
  return (
    <>
      {
        confirmDelete && (
          <DeleteConfirmation 
            id={id}
            title={title} img={img} 
            setConfirmDelete={setConfirmDelete}
            category={category}
          />
        )
      }

      <div 
        className='flex justify-between md:w-[450px] md:h-[250px] m-5 p-2 rounded-2xl relative'
      >
        <div 
          onClick={() => navigate(`/product/${id}`)}
          className='absolute h-full w-full z-10 cursor-pointer hover:border-2'
        ></div>

        <div className='w-[50%] p-2'>
          <img src={img.includes('http') ? img : `../../src/images/productImages/${img}`} 
            alt="" 
            className='w-full h-full'
          />
        </div>

        <div className='w-[50%] flex justify-between flex-col items-center text-center py-5 '>
          <h2 className="w-[90%]">{title}</h2>
          <p>$ {price}</p>
          {sizeRequired && <p className='text-red-600'>Size Required!</p>}
          {
            (role === null || role.role === 2000) && (
              <button
                onClick={sizeNeeded}
                className="border py-2 px-4 rounded-2xl bg-blue-500 text-white hover:scale-110 z-20"
              >
                Add Cart
              </button>
            )
          }
        
          { 
            role?.role === 3000 && (
              <div className='flex items-center justify-between w-full px-3 relative z-20'>
                <button
                  onClick={() => navigate(`/updateproduct/${id}`)}
                  className="border py-2 px-4 rounded-2xl bg-blue-500 text-white hover:bg-blue-700"
                >
                  Update
                </button>
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="border py-2 px-4 rounded-2xl bg-red-500 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Card