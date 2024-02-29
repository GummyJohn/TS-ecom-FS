import { useEffect, useState } from "react";
import { getData, Products } from "../ts/utils";
import Card from "./Card";
import Loading from "./Loading";
import axios from 'axios'

interface TemplateProps {
  title?: string;
  category: string;
  imgSrc?: string;
  addCart: (item: Products) => void;
}

const CaterogryTemplate = ({
  category,
  title,
  addCart,
  imgSrc,
}: TemplateProps) => {
  const [data, setData] = useState<Products[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  console.log(data);

  const bgImg = {
    backgroundImage: `url(../src/images/${imgSrc}BG.jpg)`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  useEffect(() => {
    async function getData(){
      try{
        setLoading(true)
        const response = await axios.get(`http://localhost:4001/products/${category}`)
        if(response.status === 200){
          setData(response.data)
          setLoading(false)
        }
      }catch(err){
        setError(true)
      }
    }

    getData()
  }, []);

  return (
    <>
      <div
        style={bgImg}
        className="mt-20 h-[30vh] relative flex justify-center items-center"
      >
        <div className="z-10 absolute bg-black opacity-60 h-full w-full"></div>
        <h1 className="relative z-20 text-white text-8xl">{title}</h1>
      </div>
      <div>
        {error && (
          <p className="text-red-500 text-6xl text-center mt-10">
            Sorry! Network Error
          </p>
        )}

        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-wrap justify-evenly my-4">
            {data && data.map((product) => {
                console.log(product)
                return (
                  <Card
                    key={product.id}
                    img={product.image}
                    title={product.title}
                    price={product.price}
                    onClick={() => addCart(product)}
                  />
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default CaterogryTemplate;
