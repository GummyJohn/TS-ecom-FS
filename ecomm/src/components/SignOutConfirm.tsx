import { useContext } from 'react'
import { RoleContext} from '../roleContext'
import { useNavigate } from "react-router-dom";

interface SignOutConfirmProps{
  setSignOutConfirm: (show: boolean) => void;
}

const SignOutConfirm = ({setSignOutConfirm}: SignOutConfirmProps) => {
  const navigate = useNavigate();
  const { handleSignout } = useContext(RoleContext);

  function signOut(){
    setSignOutConfirm(false);
    handleSignout(navigate, '/')
  }

  return (
    <div className='fixed h-full w-full bg-black bg-opacity-80 z-50 top-0 flex justify-center items-center'>

    <div className='relative bg-white p-5 rounded-3xl '>
      <h1 className='text-2xl'>Are You Sure You Sign Out?</h1>
      <div className="my-5 flex justify-center items-center text-white">
        <button 
          onClick={signOut}
          className='py-2 px-6 rounded-2xl bg-red-500 hover:bg-red-700 mx-4'
        >
          Yes
        </button>
        <button 
          onClick={() => setSignOutConfirm(false)}
          className='py-2 px-6 rounded-2xl bg-blue-500 hover:bg-blue-700 mx-4'
        >
          No
        </button>
      </div>
    </div>
  </div>
  )
}

export default SignOutConfirm