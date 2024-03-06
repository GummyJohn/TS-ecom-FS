import { Products } from "../ts/interface";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<Products>();
  const [error, setError] = useState<boolean>();

  function changeValues(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ){
    if(!data) return;
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
  }

  async function updateItem(e: FormEvent){
    e.preventDefault();
    
  try{
    const response = await axios.put(`http://localhost:4001/handleproducts/update/${id}`, data);

    if(response.status === 200){
      navigate(`/product/${id}`)
    }
  }catch(err){
    if(err instanceof Error){
      console.log(`update failed : ${err.message}`)
    }
  } 

  }

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await axios.get(
          `http://localhost:4001/products/item/${id}`,{
            headers: {
              'Content-Type' : 'application/json'
            },
            withCredentials: true
          }
        );
        
        if(response.data === 'Not Auhorized'){
          navigate('/')
        }
        
        if(response.status === 200){
          setData(response.data)
        }
      } catch (err) {
        setError(true);
      }
    }
    getProduct()
  }, [id]);
  
  return (
    <div className='flex flex-col justify-center items-center mt-16 w-[90%] m-auto md:w-full'>
      <div>
        <div>
          <h1 className='my-5 text-3xl text-center'>Update</h1>
          <h2 className='my-5 text-3xl text-center'>{data?.title}</h2>
        </div>
      </div>

      <form onSubmit={updateItem}
        className='md:flex border border-black p-2 px-4 rounded-2xl md:w-[1000px] md:h-[500px] mt-10 w-full h-full'
      >
        {
          error ? 
          <div className='text-red-500 text-5xl h-full w-full flex flex-col justify-center items-center'>
            <h1>Sorry! Something went wrong,</h1>
            <h2>Try Refreshing the page</h2>
          </div> :
          <>
            <div className='md:w-[50%] p-2 px-4'>
              <div className='w-[90%] h-[90%] rounded-2xl my-2'>
                <img 
                  src={data?.image.includes('fakestore') ?  
                  data.image: 
                  `../src/images/productImages/${data?.image}`} 
                  alt="image" 
                  className='rounded-2xl h-full w-full'
                />
              </div>
            </div>

            <div className=' p-2 md:w-[50%]'>

              <div className='flex flex-col mb-2'>
                <label htmlFor="title"
                  className='text-2xl'
                >
                  Title:
                </label>
                <input type="text" id="title" name="title"
                  className='p-1 px-2 border border-black rounded-xl'
                  defaultValue={data?.title}
                  onChange={changeValues}
                />
              </div>
              
              <div className='flex flex-col mb-2'>
                <label htmlFor="price"
                  className='text-2xl'
                >
                  Price:
                </label>
                <input type="number" id="price" min="0" name="price"
                  step='any'
                  className='p-1 px-2 border border-black rounded-xl'
                  defaultValue={data?.price}
                  onChange={changeValues}
                />
              </div>
              
              <div className='flex flex-col mb-2'>
                <label htmlFor="description"
                  className='text-2xl'
                >
                  Description:
                </label>
                <textarea 
                  name="description" id="description" 
                  cols={50} rows={10}
                  className='p-1 px-2 border border-black rounded-xl'
                  defaultValue={data?.description}
                  onChange={changeValues}
                ></textarea>
              </div>

              <div className='text-center'>
                <button
                  className='border border-white py-1 px-4 rounded-2xl bg-blue-600 text-white hover:bg-stone-500 '
                >
                  Update
                </button>
              </div>
            </div>
          </>
        }
      </form>
    </div>
  );
};

export default UpdateForm;
