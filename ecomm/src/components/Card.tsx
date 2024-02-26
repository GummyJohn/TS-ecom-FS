interface CardProps {
  img: string;
  title: string;
  price: number;
  onClick: () => void;
}

const Card = ({ title, price, img, onClick} : CardProps) => {
  return (
    <div 
      className='flex justify-between w-[450px] h-[250px] my-5 p-2 rounded-2xl'
    >
      <div className='w-[50%] p-2'>
        <img src={img} alt="" className='w-full h-full'/>
      </div>

      <div className='w-[50%] flex justify-between flex-col items-center text-center py-5' >
        <h2 className="w-[90%]">{title}</h2>
        <p>$ {price}</p>

        <button
          onClick={onClick}
          className="border py-2 px-4 rounded-2xl bg-blue-500 text-white hover:scale-110"
        >
          Add Cart
        </button>
      </div>
    </div>
  )
}

export default Card