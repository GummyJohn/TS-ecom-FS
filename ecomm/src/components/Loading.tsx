import { ImSpinner11 } from "react-icons/im";
import { motion } from 'framer-motion'


const Loading = () => {
  return (
    <div
      className='flex justify-center items-center h-[50vh]'
    >
      <motion.div
        initial={{rotate: 0}}
        animate={{rotate: 360}}
        transition={{duration: 2, repeat: Infinity}}
      >
        <ImSpinner11 className="text-8xl text-black"/>
      </motion.div>
    </div>
  )
}

export default Loading