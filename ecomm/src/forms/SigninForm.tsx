import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

interface SignInFromProps{
  setShowSignIn: (show: boolean) => void;
}

const SignInForm = ({setShowSignIn} : SignInFromProps) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [wrongUser, setWrongUser] = useState<boolean>(false);
  const [wrongPass, setWrongPass] = useState<boolean>(false);
  
  async function handleSubmit(e : FormEvent<HTMLFormElement>){
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type' : 'application/json'
      },
      withCredentials: true
    }

    try{
      const response = await axios.post('http://localhost:4001/signin',
        {
          username,
          password
        }, 
        config
      )

      if(response.status === 404){
        setWrongUser(true)
        setTimeout(() => {setWrongUser(false)}, 1000)
      }

      if(response.status === 401){
        setWrongPass(true)
        setTimeout(() => { setWrongUser(false) }, 1000)
      }

      if(response.status === 200) {
        navigate('/')
      }

    }catch(err: unknown){
      if(err instanceof Error){
        console.log(err.message)
      }
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <form 
        onSubmit={handleSubmit}
        className='border-2 border-blue-500 rounded-2xl py-2 px-5 w-[300px] bg-white'
      >
        <h1 className='my-5 text-center text-3xl'>
          Sign In
        </h1>

        <div className='flex flex-col my-2'>
          <label htmlFor="username">Username:</label>
          <input type="text" id='username'
            className='border border-black rounded-2xl py-1 px-3'
            autoComplete='off'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {wrongUser && 
          <p className='text-red-600 text-center'>
            Username not found!
          </p>
        }

        <div className='flex flex-col my-2'>
          <label htmlFor="password">Password:</label>
          <input type="password" id='password'
            className='border border-black rounded-2xl py-1 px-3'
            autoComplete='off'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {wrongPass && 
          <p className='text-red-600 text-center'>
            Password Incorrect!
          </p>
        }


        <div className='flex justify-between items-center '>
          <button
            className='py-2 px-4 bg-blue-500 text-white my-4 rounded-3xl hover:bg-black'
          >
            Sign In
          </button>  
        </div>

        <div className='text-center my-2'>
          <h1>Don't have a account?</h1>
          <button
            onClick={() => setShowSignIn(false)} 
            className='hover:border-b hover:border-blue-500 hover:text-blue-500'
          >
            Register Here
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm