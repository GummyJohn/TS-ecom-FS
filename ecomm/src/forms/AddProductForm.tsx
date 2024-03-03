import { FaCloudDownloadAlt } from "react-icons/fa";
import  { 
  ChangeEvent, FormEvent, 
  useState, useContext, useEffect
} from 'react'
import { RoleContext } from "../roleContext";
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'

interface ProductInfo{
  title : string;
  price: string;
  description: string;
  category: string;
}

const AddProductForm = () => {
  const { role } = useContext(RoleContext);
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);

  const [image, setImage] = useState<string>();
  const [imageFile, setImageFile] = useState<File| null>();

  function filereader(e: ChangeEvent<HTMLInputElement>){
    const file = e.target.files &&  e.target.files[0];
    if(file){
      setImage(URL.createObjectURL(file))
      setImageFile(file)
    }
  }
  const [productInfo, setProductInfo] = useState<ProductInfo>({
    title: '',
    price: '',
    description: '',
    category: '',
  });
  
  function changeProductValue(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ){
    setProductInfo({
      ...productInfo,
      [e.target.name] : e.target.value
    })
  }
 
  async function handleAddProduct(e : FormEvent<HTMLFormElement>){
    e.preventDefault();

    if(productInfo.title === '' || productInfo.price === '' ||    productInfo.description === '' || productInfo.category === '') {
      console.log('missing info')
      return;
    };
    
    const formData = new FormData();
    formData.append('title', productInfo.title);
    formData.append('price', productInfo.price);
    formData.append('description', productInfo.description);
    formData.append('category', productInfo.category);
    if (imageFile) {
      formData.append('file', imageFile);
    }

    try{
      const response = await axios.post('http://localhost:4001/handleproducts/add', formData)

      if(response.status === 404){
        setError(true)
        setTimeout(() => { setError(false) }, 1000)
      }

      if(response.status === 200){
        navigate(`/products/${productInfo.category}`)
      }
    }catch(err){
      if(err instanceof Error){
        console.log(err.message)
      }
    }
  }

  function redirect(){
    if(role?.role === 2000) {
      navigate('/')
    }
    
    if(!role) {
      navigate('/')
    }
  }

  useEffect(() => {
    redirect()
  }, [])


  return (
    <div className='flex flex-col justify-center items-center mt-16'>
      <div>
        <h1 className='my-5 text-3xl text-center'>Add a Product</h1>
        <h2
          onClick={() => navigate('/')}
          className='text-center mt-10 cursor-pointer hover:text-blue-600 hover:underline text-xl'
        > 
          Back to Home
        </h2>
        {error && (
          <p className='text-2xl text-center text-red-500'>
            Product might already be in Inventory!
          </p>
        )}
      </div>

      <form
        onSubmit={handleAddProduct}
        className='md:flex border border-black p-2 px-4 rounded-2xl md:w-[1000px] md:h-[500px] mt-10 w-full h-full'
      >
        <div className='md:w-[50%] p-2 px-4'>
          <div className='border border-black h-[90%] rounded-2xl my-2 flex justify-center items-center'>
            {
              image ?
              <img 
              src={image} 
              className='rounded-2xl h-full w-full'
              /> : 
              <FaCloudDownloadAlt className="text-9xl text-blue-500"/>
            }
          </div>

          <label htmlFor="file"
            className='py-2 px-4 rounded-2xl bg-blue-500 text-white cursor-pointer hover:bg-blue-800'
          >Add Image</label>
          <input type="file" id='file' className='hidden'
            onChange={filereader}
          />

        </div>

        <div className=' p-2 md:w-[50%]'>
          <div className='flex flex-col mb-2'>
            <label htmlFor="title"
              className='text-2xl'
            >
              Title:
            </label>
            <input type="text" id="title" name="title"
              value={productInfo.title}
              onChange={changeProductValue}
              className='p-1 px-2 border border-black rounded-xl'
            />
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex flex-col mb-2'>
              <label htmlFor="price"
                className='text-2xl'
              >
                Price:
              </label>
              <input type="number" id="price" min="0" name="price"
                value={productInfo.price}
                onChange={changeProductValue}
                className='p-1 px-2 border border-black rounded-xl'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="cateogry" className='text-2xl'>
                Cateogry
              </label>
              <select name='category' id='cateogry' 
                className='p-1 px-4 border border-black rounded-xl'
                onChange={changeProductValue}
              >
                <option value="">Select a Category</option>
                <option value="jewelry">Jewelry</option>
                <option value="technology">Technology</option>
                <option value="men's clothing">Men's Clothes</option>
                <option value="women's clothing">Women's Clothes</option>
              </select>
            </div>
          </div>
          
          <div className='flex flex-col mb-2'>
            <label htmlFor="description"
              className='text-2xl'
            >
              Description:
            </label>
            <textarea 
              name="description" id="description" 
              cols={50}
              rows={10}
              value={productInfo.description}
              onChange={changeProductValue}
              className='p-1 px-2 border border-black rounded-xl'
            ></textarea>
          </div>

          <div className='text-center'>
            <button
              className='border border-white py-1 px-4 rounded-2xl bg-blue-600 text-white hover:bg-blue-800 '
            >
              Add To Inventory
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddProductForm