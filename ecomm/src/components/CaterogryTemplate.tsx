import { useEffect, useState } from "react";
import { Products } from "../ts/interface";
import Card from "./Card";
import Loading from "./Loading";
import axios from "axios";

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

  const bgImg = {
    backgroundImage: `url(../src/images/${imgSrc}BG.jpg)`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };

  useEffect(() => {
    async function data() {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4001/products/${category}`
        );

        if (response.status === 200) {
          setData(response.data);
          setLoading(false);
        }
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }

    data();
  }, []);

  return (
    <>
      <div
        style={bgImg}
        className=" h-[50vh] mt-16 md:h-[30vh] relative flex justify-center items-center text-center"
      >
        <div className="z-10 absolute bg-black opacity-60 h-full  w-full"></div>
        <h1 className="relative text-5xl z-20 text-white md:text-8xl">{title}</h1>
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
          <div className=" flex flex-col md:flex-row md:flex-wrap justify-evenly my-4">
            {data &&
              data.map((product) => {
                return (
                  <Card
                    id={product.id}
                    category={product.category}
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
