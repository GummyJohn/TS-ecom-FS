import { RoleContext } from '../roleContext'
import { useContext, useState } from 'react'
import DeleteConfirmation from './DeleteConfirmation'

interface CardProps {
  id: number;
  img: string;
  title: string;
  price: number;
  onClick: () => void;
}

const Card = ({id, title, price, img, onClick} : CardProps) => {
  const { role } = useContext(RoleContext)
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  return (
    <>
      {
        confirmDelete && (
          <DeleteConfirmation 
            id={id}
            title={title} img={img} 
            setConfirmDelete={setConfirmDelete}
          />
        )
      }
      <div 
        className='flex justify-between w-[450px] h-[250px] my-5 p-2 rounded-2xl'
      >
        <div className='w-[50%] p-2'>
          <img src={img.includes('http') ? img : `../../src/images/productImages/${img}`} 
            alt="" 
            className='w-full h-full'
          />
        </div>

        <div className='w-[50%] flex justify-between flex-col items-center text-center py-5' >
          <h2 className="w-[90%]">{title}</h2>
          <p>$ {price}</p>
        {
          (role === null || role.role === 2000) && (
            <button
              onClick={onClick}
              className="border py-2 px-4 rounded-2xl bg-blue-500 text-white hover:scale-110"
            >
              Add Cart
            </button>
          )
        }
        
        { 
          role?.role === 3000 && (
            <div className='flex items-center justify-between w-full px-3'>
              <button
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