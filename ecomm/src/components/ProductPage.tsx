import { useState, useEffect, useContext } from 'react'
import { RoleContext } from '../roleContext'
import { useParams } from 'react-router-dom'
import { Products } from '../ts/interface'
import Loading from './Loading'
import axios from 'axios'

interface ProductPageProps {
  addCart : (item: Products) => void;
}

const size = ['XS', 'S', 'M', 'L', 'XL']

const ProductPage = ({addCart} : ProductPageProps) => {
  const { role } = useContext(RoleContext)
  const { id } = useParams();
  const [data, setData] = useState<Products>();
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState<boolean>();
  const [selectSize, setSelectSize] = useState<string>('')

  useEffect(() => {
    async function getProduct(){
      try{
        setLoading(true)
        const response = await axios.get(`http://localhost:4001/products/getitem/${id}`)
        if(response.status === 200){
          setLoading(false)
          setData(response.data)
        }
      }catch(err){
        if(err instanceof Error){
          console.log(err.message)
        }
      }
    }
    getProduct()
  }, [])


  return (
    <div>
      {
        loading ? <Loading/> : (
          <div className='mt-16'>
            <div className='flex flex-col md:flex-row items-center justify-center py-5 px-8 max-w-[1800px] m-auto'>
              <div className='md:w-[50%] rounded-2xl h-full'>
                <img 
                  src={
                    data?.image.includes('fakestore') ? data.image:  
                    `../src/images/productImages/${data?.image}`
                  }                   
                  alt="product" 
                  className='h-full w-full rounded-2xl p-2'
                />
              </div>
              <div className='md:w-[50%] text-center p-8'>
                <h1 className='text-3xl mb-5'>{data?.title}</h1>
                <h2 className='text-2xl my-5'>$ {data?.price}</h2>
                
                { (data?.category.includes('clothing') && !data?.title.includes('Backpack')) && (
                  <div className='flex items-center justify-center'>
                    {
                      size.map((size) => {
                        return (
                          <button
                            key={size}
                            onClick={() => setSelectSize(size)}
                            className={selectSize === size ?  'border p-2 rounded-2xl mx-4 bg-blue-500 text-white' : 'border p-2 rounded-2xl mx-4 hover:bg-blue-600 hover:text-white'}
                          >
                            {size}
                          </button>
                        )
                      })
                    }
                  </div>
                )}

                <p className='text-left my-5 h-[350px] overflow-auto'>
                  <span className='font-bold text-xl'>Description : </span> 
                  {data?.description}
                </p>
                    
                {role?.role === 2000 || role === null && (
                  <button 
                    onClick={()=> addCart({...data, size: selectSize})}
                    className="border py-2 px-4 rounded-2xl bg-blue-500 text-white hover:scale-110"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ProductPage