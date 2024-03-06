import { useState, useEffect } from "react";
import { Products } from "../ts/interface";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import axios from "axios";

const comingSoonBg = {
  backgroundImage: "url(../src/images/comingsoon.jpg)",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const NewItem = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Products | null>();

  useEffect(() => {
    async function getNewItem() {
      try {
        const response = await axios.get(
          "http://localhost:4001/products/newItem"
        );
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (err) {
        if(err instanceof Error ){
          console.log(`newItem Error: ${err.message}`)
        }
      }
    }
    getNewItem();
  }, []);

  return (
    <div>
      {!data?.title && (
        <div className="text-center flex flex-col md:flex-row items-center justify-between  w-full m-auto">
          <div
            style={comingSoonBg}
            className="my-2 w-[300px] h-[300px] rounded-2xl md:w-[50%] md:h-[300px] md:rounded-full"
          ></div>

          <div className="md:w-[50%] my-2">
            <p className="text-3xl mb-5">
              Stay Alert New Products coming soon!
            </p>
            <p className="text-2xl">
              In the mean time check out other products
            </p>
            <button
              onClick={() => navigate("/browse")}
              className="border py-2 px-4 rounded-2xl border-black hover:bg-black hover:text-white mt-5"
            >
              Browse
            </button>
          </div>
        </div>
      )}

      {data?.title && (
        <div className="flex flex-col my-2">
          <h2 className="text-2xl text-center">Checkout Our Newest Product!</h2>
          <div className="flex items-center flex-col md:flex-row ">
            <div className="md:w-[50%] md:h-[400px]">
              <img
                src={`../src/images/productImages/${data.image}`}
                alt=""
                className="w-full h-full"
              />
            </div>

            <div className="md:w-[50%] p-3">
              <h1 className="text-center text-3xl mb-5">{data.title}</h1>
              <div className="flex flex-col md:flex-row items-center justify-evenly text-xl mb-5">
                <p className="">
                  <span className="font-bold">Category : </span>
                  {data.category}
                </p>
                <p>
                  <span className="font-bold">Price : </span>
                  <span>$ {data.price}</span>
                </p>
              </div>
              <p className=" h-[250px] overflow-auto">
                <span className="font-bold">Description :</span>
                <span className="">{data.description}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewItem;
