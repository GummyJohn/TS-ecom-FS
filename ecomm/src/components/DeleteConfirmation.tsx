import { useState } from 'react'
import axios from 'axios'

interface DeleteConfirmProps{
  id: number;
  img: string;
  title: string;
  setConfirmDelete: (show: boolean) => void;
}


const DeleteConfirmation = (
  {id, title, img, setConfirmDelete} : DeleteConfirmProps
) => {
  const [successfulD, setSuccessfulD] = useState<boolean>(false);

  async function handleDeleteProduct(id: number){
    try{
      const response = await axios.delete(`http://localhost:4001/products/delete/${id}`)

      if(response.status === 200){
        setSuccessfulD(true)
      }

    }catch(err){
      if(err instanceof Error){
        console.log(err.message)
      }
    }
  }

  function closeAndReload(){
    setSuccessfulD(false)
    setConfirmDelete(false)
    window.location.reload()
  }

  return (
    <>
      <div className='fixed h-full w-full bg-black bg-opacity-80 z-50 top-0 flex justify-center items-center '>

        <div className='relative bg-white flex justify-center items-center w-[500px] p-5 rounded-3xl'>
          <button 
            onClick={closeAndReload}
            className='absolute top-5 right-5 border p-3 rounded-full bg-black text-white hover:bg-red-500'
          >
            X 
          </button>

          <div className='text-center mt-10'>
            <div className='my-3'>
              <p className='text-3xl text-red-500'>Are you sure you want to Delete</p>
              <p className='text-2xl w-[90%] m-auto my-2'>{title} ?</p>
            </div>

            <div className='h-[500px] w-full m-auto my-4'>
              <img src={img.includes('http') ? img : `../../src/images/productImages/${img}`} 
                alt="" 
                className='w-full h-full'
              />
            </div>

            {
              successfulD ? 
              <p className='text-3xl text-red-500'>
                Successfully Deleted!
              </p> : (
                <button 
                  onClick={() => handleDeleteProduct(id)}
                  className='py-2 px-4 bg-red-500 bg-red-500 text-white hover:bg-red-700 rounded-2xl'
                >
                  Delete
                </button>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteConfirmation
