import { useEffect, useState, useLayoutEffect }from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleContext } from '../roleContext';
import { motion } from 'framer-motion';
import { MdManageAccounts, MdOutlineSystemUpdateAlt, MdDelete } from "react-icons/md";
import { SiTemporal } from "react-icons/si";
import { FcSalesPerformance } from "react-icons/fc";
import { FaThumbsUp, FaCartPlus } from "react-icons/fa";
import axios from 'axios'
import NewItem from './NewItem'

interface AdminInfo {
  amountOfUser: number;
  amountOfProducts: number;
  totalSale: number;
  topCustomer: string;
  topCustomerSum: number;
  totalSales: number
}

const AdminPage = () => {
  const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState<AdminInfo>()

  useLayoutEffect(() => {
    async function getAdminInfo(){
      try{
        const response = await axios.get('http://localhost:4001/admin/info', {
          withCredentials: true
        })
        if(response.data === 'Not Auhorized'){
          navigate('/')
        }

        if(response.status === 200){
          setAdminInfo(response.data)
        }
        
      }catch(err){
        if(err instanceof Error){
          console.log(`Error failed admininfo: ${err.message}`)
        }
      }
    }

    getAdminInfo()
  }, [])

  return (
    <div className='mt-36'>
     
      <div
        style={{boxShadow: '0px 0px 50px 10px'}} 
        className='w-[90%] mt-5 m-auto h-[40vh] border flex justify-center items-center rounded-2xl'
      >
        <div className='flex w-full flex-col px-5'>
          <h1 className='text-3xl mb-10 text-center'>Welcome Admin </h1>
          <div className='flex items-center justify-evenly'>
            <div 
              className='border text-center py-3 px-5 rounded-2xl w-[20%] h-[100px] flex  items-center justify-evenly bg-purple-500 text-white'
            >
              <div>
                <h1 className='text-xl'>Accounts</h1>
                <h1>{adminInfo?.amountOfUser}</h1>
              </div>
              <MdManageAccounts className='text-5xl'/>
            </div>
            <div className='border text-center py-3 px-5 rounded-2xl w-[20%] h-[100px] flex  items-center justify-evenly bg-purple-500 text-white'>
              <div>
                <h1 className='text-xl'>Total Products</h1>
                <h1> {adminInfo?.amountOfProducts}</h1>
              </div>
              <SiTemporal className='text-5xl'/>
            </div>
            <div className='border text-center py-3 px-5 rounded-2xl w-[20%] h-[100px] flex  items-center justify-evenly bg-purple-500 text-white'>
              <div>
                <h1 className='text-xl'>Total Sales</h1>
                <h1>$ {adminInfo?.totalSales}</h1>
              </div>
              <FcSalesPerformance className='text-5xl'/>
            </div>
            <div className='border text-center py-3 px-5 rounded-2xl w-[20%] h-[100px] flex  items-center justify-evenly bg-purple-500 text-white'>      
              <div>
                <h1 className='text-xl'>Top Customer</h1>
                <h1>{adminInfo?.topCustomer}</h1> 
                <h1>$ {adminInfo?.topCustomerSum}</h1> 
              </div>    
              <FaThumbsUp className='text-4xl'/>
            </div>
          </div>

          <div className='w-[60%] my-10 text-center m-auto'>
            <div className='flex items-center m-auto justify-center'>
              <motion.div
                initial={{ y: "-100vw" }}
                animate={{ y: 0 }}
                transition={{ duration: 1 }}
                className="text-center mr-5"
              >
                <button
                  onClick={() => navigate("/addproduct")}
                  className="w-[150px] h-[150px] rounded-[100%] hover: shadow-2xl hover:shadow-purple-500 flex justify-center items-center relative overflow-hidden"
                > 
                  <div className='absolute h-full w-full border flex justify-center items-center opacity-40'>
                    <FaCartPlus className='text-9xl'/>
                  </div>

                  <div className='w-full h-full bg-black absolute bg-opacity-50 z-10'></div>

                  <h1 className='text-white relative z-50 text-3xl'>
                    Add Product
                  </h1>
                </button>
              </motion.div>
              <motion.div
                initial={{ y: "-100vw" }}
                animate={{ y: 0 }}
                transition={{duration: 1, delay: .1 }}
                className="text-center mr-5"
              >
                <button
                  onClick={() => navigate("/browse")}
                  className="w-[150px] h-[150px] rounded-[100%] hover: shadow-2xl hover:shadow-purple-500 flex justify-center items-center relative overflow-hidden"
                >
                  <div className='absolute h-full w-full border flex justify-center items-center opacity-40'>
                    <MdDelete className='text-9xl'/>
                  </div>

                  <div className='w-full h-full bg-black absolute bg-opacity-50 z-10'></div>
                  <h1 className='text-white relative z-50 text-3xl'>
                    Delete Product
                  </h1>
                 
                </button>
              </motion.div>
              <motion.div
                initial={{ y: "-100vw" }}
                animate={{ y: 0 }}
                transition={{ delay: .2, duration: 1 }}
                className="text-center mr-5"
              >
                <button
                  onClick={() => navigate("/browse")}
                  className="w-[150px] h-[150px] rounded-[100%] hover: shadow-2xl hover:shadow-purple-500 flex justify-center items-center relative overflow-hidden"
                >
                  <div className='absolute h-full w-full border flex justify-center items-center opacity-40'>
                  <MdOutlineSystemUpdateAlt className='text-9xl'/>
                  </div>

                  <div className='w-full h-full bg-black absolute bg-opacity-50 z-10'></div>
                  <h1 className='text-white relative z-50 text-3xl'>
                    Update Product
                  </h1>         
                </button>
              </motion.div>
            </div>
          </div>
        </div>

      </div>


      <div className='mt-10 py-2 px-5'>
        <NewItem/>
      </div>
    </div>
  )
}

export default AdminPage