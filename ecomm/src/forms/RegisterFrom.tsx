import { useState, useReducer, FormEvent, ChangeEvent } from 'react'
import { FaCheck, FaTimes} from 'react-icons/fa'
import { ACTIONS, controls, registerReduce } from '../ts/registerReducer'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

interface RegisterFromProps{
  setShowSignIn: (show: boolean) => void;
}

interface FormRequirements {
  username: string;
  email: string;
  password: string;
  confirmP: string;
}

const RegisterFrom = ({setShowSignIn} : RegisterFromProps) => {
  const [state, dispatch] = useReducer(registerReduce, controls);
  
  const [success, setSuccess] = useState<boolean>(false)

  const [formValues ,setFormValues] = useState<FormRequirements>({
    username: '',
    email: '',
    password: '',
    confirmP: '',
  })

  function handleValues(e: ChangeEvent<HTMLInputElement>){
    setFormValues({
      ...formValues,
      [e.target.name] : e.target.value
    })
  }
  
  const [emailDulicate, setEmailDuplicate] = useState<boolean>(false);
  const [userDulicate, setuserDuplicate] = useState<boolean>(false);

  const usernameRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validUsername = usernameRegex.test(formValues.username);
  const validPassword = passwordRegex.test(formValues.password);
  const validEmail = emailRegex.test(formValues.email);
  const matchPassword = formValues.confirmP === formValues.password && (
    formValues.confirmP.length !== 0 && formValues.password.length !== 0
  );

  async function handleRegister(e: FormEvent<HTMLFormElement>){
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:4001/register',{
        username: formValues.username,
        email: formValues.email,
        password: formValues.password
      })

      if(response.status === 404){
        setuserDuplicate(true)
        setTimeout(() => {setuserDuplicate(false)}, 1000)
      }
      
      if(response.status === 403){
        setEmailDuplicate(true)
        setTimeout(() => {setEmailDuplicate(false)}, 1000)
      }

      if(response.status === 200){
        setFormValues({
          username: '',
          email: '',
          password: '',
          confirmP: '',
        })
        setSuccess(true)
        setTimeout(() => {setSuccess(false)}, 1500)
      }
    }catch(err : unknown){
      if(err instanceof Error){
        console.log(err.message)
      }
    }
  }

  return (
    <div className='flex justify-center items-center'>
      <form 
        onSubmit={handleRegister}
        className='border-2 border-blue-500 rounded-2xl py-2 px-5 w-[300px] bg-white'
      >
        <h1 className='my-5 text-center text-3xl'>
          Register
        </h1>

        {success && (
          <div className='text-center text-xl text-blue-600'>
            <p >
              Registeration Successful!
            </p>
            <p>Return to Sign in!</p>
          </div>
          )
        }

        <div className='flex flex-col my-2'>
          <label htmlFor="username"
            className='flex items-center justify-between px-2'
          >
            <span>Username:</span>

            {formValues.username.length !== 0 && 
            <span>
              {validUsername ? <FaCheck className='text-green-500'/> : <FaTimes className='text-red-500'/> }
            </span> 
            }
          </label>

          <input type="text" id='username' name='username'
            className='border border-black rounded-2xl py-1 px-3'
            autoComplete='off'    
            value={formValues.username}
            onChange={handleValues}
            onFocus={() => dispatch({type: ACTIONS.username_focus})}
            onBlur={() => dispatch({type: ACTIONS.all_false})}
          />
        </div>
        
        {userDulicate && 
          <p className='text-red-600 text-center'>
            Username be Taken!
          </p>
        }

        <AnimatePresence>
          {(state.userFocus && !validUsername) &&(
            <motion.div
              initial={{height: 0}}
              animate={{height: 'auto'}}
              transition={{duration: .1}}
              exit={{height: 0}}
              className='flex justify-center items-center overflow-hidden'
            >
              <ul className=''>
                <li>At least 1 uppercase</li>
                <li>At least 1 number</li>
                <li>At least 1 special character</li>
                <li>At least the length of 6</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className='flex flex-col my-2'>
          <label htmlFor="email"
            className='flex items-center justify-between px-2'
          >
            <span>Email:</span>
            {formValues.email.length !== 0 && 
              <span>
                {validEmail ? <FaCheck className='text-green-500'/> : <FaTimes className='text-red-500'/> }
              </span> 
            }
          </label>
          <input type="email" id='email' name='email'
            className='border border-black rounded-2xl py-1 px-3'
            autoComplete='off' 
            value={formValues.email}
            onChange={handleValues}   
            onFocus={() => dispatch({type: ACTIONS.email_focus})}
            onBlur={() => dispatch({type: ACTIONS.all_false})}
          />
        </div>

        {emailDulicate && 
          <p className='text-red-600 text-center'>
            Email is already registered!
          </p>
        }

        <AnimatePresence>
          {(state.emailFocus && !validEmail) &&(
            <motion.div 
              initial={{height: 0}}
              animate={{height: 'auto'}}
              transition={{duration: .1}}
              exit={{height: 0}}
              className='flex justify-center items-center overflow-hidden'
            >
              Must be a valid Email
            </motion.div>
          )}
        </AnimatePresence>

        <div className='flex flex-col my-2'>
          <label htmlFor="password"
            className='flex items-center justify-between px-2'
          >
            <span>Password:</span>
            {formValues.password.length !== 0 && 
              <span>
                {validPassword ? <FaCheck className='text-green-500'/> : <FaTimes className='text-red-500'/> }
              </span> 
            }
          </label>
          <input type="password" id='password' name='password'
            className='border border-black rounded-2xl py-1 px-3'
            autoComplete='off'
            value={formValues.password}
            onChange={handleValues}
            onFocus={() => dispatch({type: ACTIONS.password_focus})}
            onBlur={() => dispatch({type: ACTIONS.all_false})}   
          />
        </div>
        
        <AnimatePresence>
          {(state.passwordFocus && !validPassword) &&(
            <motion.div 
              initial={{height: 0}}
              animate={{height: 'auto'}}
              transition={{duration: .1}}
              exit={{height: 0}}
              className='flex justify-center items-center overflow-hidden'
            >
              <ul className=''>
                <li>At least 1 uppercase</li>
                <li>At least 1 number</li>
                <li>At least 1 special Character</li>
                <li>At least the length of 6</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className='flex flex-col my-2'>
          <label htmlFor="repassword"
            className='flex items-center justify-between px-2'
          >
            <span>Confirm Password:</span>
            {formValues.confirmP.length !== 0 && 
              <span>
                {(matchPassword && validPassword ) ? <FaCheck className='text-green-500'/> : <FaTimes className='text-red-500'/> }
              </span> 
            }
          </label>
          <input type="password" id='repassword' name='confirmP'
            className='border border-black rounded-2xl py-1 px-3'
            autoComplete='off'
            value={formValues.confirmP}
            onChange={handleValues}   
            onFocus={() => dispatch({type: ACTIONS.confirm_focus})}
            onBlur={() => dispatch({type: ACTIONS.all_false})}   
          />
        </div>

        <AnimatePresence>
          {(state.confirmFocus && !matchPassword) &&(
            <motion.div
              initial={{height: 0}}
              animate={{height: 'auto'}}
              transition={{duration: .1}}
              exit={{height: 0}}
              className='flex justify-center items-center overflow-hidden'
            >
              Password must match
            </motion.div>
          )}
        </AnimatePresence>


        <div className='flex items-center justify-between'>
          <button
            disabled = {
              (validUsername && validEmail && validPassword && matchPassword) ? false : true}
            className='py-2 px-4 bg-blue-500 text-white my-4 rounded-3xl hover:bg-black cursor-pointer'
          >
            Register
          </button>
          
          <button
            onClick={() => setShowSignIn(true)}
            className='hover:border-b hover:border-blue-500 hover:text-blue-500 text-center'
          >
            Back to Sign In
          </button>
        </div>
            
      </form>
    </div>
  )
}

export default RegisterFrom