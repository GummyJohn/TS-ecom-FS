import { useState, useEffect } from 'react'
import { Products, getData } from "../ts/utils";
import axios from 'axios'

const NewItem = () => {
  const [data, setData] = useState<Products | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getNewItem() {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:4001/products/newItem');
        if (response.status === 200) {
          setData(response.data);
        }
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }
    getNewItem();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data</p>}
      {data && (
        <div className='flex'>
          <div className='w-[50%] h-[450px]'>
            <img 
              src={`../src/images/productImages/${data.image}`}     alt="" 
              className='w-full h-full'
            />
          </div>
          <div className='w-[50%]'>
            <h1>{data.title}</h1>
            <div>
              <p>{data.category}</p>
              <p>$ {data.price}</p>
            </div>
            <p>{data.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};


export default NewItem