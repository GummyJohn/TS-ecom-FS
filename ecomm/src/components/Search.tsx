import { useEffect, useState, useContext } from "react";
import { IoAdd } from "react-icons/io5";
import { Products, getData } from "../ts/utils";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RoleContext } from "../roleContext";
import Loading from "./Loading";
import Card from "./Card";

const jewelryBgImg = {
  backgroundImage: "url(../src/images/jewelryBG.jpg)",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const menClothesBgImg = {
  backgroundImage: "url(../src/images/mensclothesBG.jpg)",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const technologyBgImg = {
  backgroundImage: "url(../src/images/technologyBG.jpg)",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const womenClothesBgImg = {
  backgroundImage: "url(../src/images/womenclothesBG.jpg)",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

interface SearchProps {
  addCart: (item: Products) => void;
}

const Search = ({ addCart }: SearchProps) => {
  const navigate = useNavigate();
  const { role } = useContext(RoleContext);

  const [data, setData] = useState<Products[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const filteredData = data.filter((item) => {
    if (
      item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.description.toLowerCase().includes(searchValue.toLocaleLowerCase())
    ) {
      return item;
    }
  });

  useEffect(() => {
    getData('http://localhost:4001/products/all',
      setData,
      setError,
      setLoading
    )
  }, []);

  return (
    <>
      <div className="mt-20 h-[30vh] relative flex justify-center items-center flex-col">
        <div className="flex absolute w-full h-full">
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: "0" }}
            transition={{ duration: 1.1 }}
            style={womenClothesBgImg}
            className="w-[25%] h-full"
          ></motion.div>
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: .8 }}
            style={menClothesBgImg}
            className="w-[25%] h-full"
          ></motion.div>
          <motion.div
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: .7 }}
            style={technologyBgImg}
            className="w-[25%] h-full"
          ></motion.div>
          <motion.div
            style={jewelryBgImg}
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ duration: .5 }}
            className="w-[25%] h-full"
          ></motion.div>
        </div>

        <div className="z-10 absolute bg-black opacity-60 h-full w-full"></div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .9, duration: .5 }}
          className="relative z-10 w-full "
        >
          <div className="flex w-full flex justify-center items-center">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-[50%] py-3 px-5 rounded-tl-2xl rounded-bl-2xl outline-none"
            />
            <button
              onClick={() => setSearchValue("")}
              className="text-black bg-white p-3 rounded-tr-2xl rounded-br-2xl hover:bg-blue-300"
            >
              X
            </button>
          </div>
        </motion.div>
      </div>
      <div>
        <div className="flex w-full justify-evenly items-center mt-10 ">
          {role?.role === 3000 && (
            <motion.div
              initial={{ y: "-100vw" }}
              animate={{ y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-center"
            >
              <button
                onClick={() => navigate("/addproduct")}
                className="w-[150px] h-[150px] rounded-[100%] hover: shadow-2xl hover:shadow-black flex justify-center items-center"
              >
                <IoAdd className="text-7xl"/>
              </button>
              <p>Add Item</p>
            
            </motion.div>
          )}

          <motion.div
            initial={{ y: "-100vw" }}
            animate={{ y: 0 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="text-center"
          >
            <button
              style={womenClothesBgImg}
              onClick={() => navigate("/products/Women's Clothes")}
              className="w-[150px] h-[150px] rounded-[100%] hover: shadow-2xl hover:shadow-black"
            ></button>
            <p>Women's Clothes</p>
          </motion.div>

          <motion.div
            initial={{ y: "-100vw" }}
            animate={{ y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="text-center"
          >
            <button
              style={menClothesBgImg}
              onClick={() => navigate("/products/Men's Clothes")}
              className="w-[150px] h-[150px] rounded-[100%] hover: shadow-2xl hover:shadow-black"
            ></button>
            <p>Men's Clothes</p>
          </motion.div>

          <motion.div
            initial={{ y: "-100vw" }}
            animate={{ y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-center"
          >
            <button
              style={technologyBgImg}
              onClick={() => navigate("/products/Technology")}
              className="w-[150px] h-[150px] rounded-[100%] hover: shadow-2xl hover:shadow-black"
            ></button>
            <p>Technology</p>
          </motion.div>

          <motion.div
            initial={{ y: "-100vw" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-center"
          >
            <button
              style={jewelryBgImg}
              onClick={() => navigate("/products/Jewerly")}
              className="w-[150px] h-[150px] rounded-[100%] hover: shadow-2xl hover:shadow-black"
            ></button>
            <p>Jewelry</p>
          </motion.div>
        </div>
        {error && (
          <p className="text-red-500 text-6xl text-center mt-10">
            Sorry! Network Error
          </p>
        )}

        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-wrap justify-evenly my-4">
            {filteredData.map((product) => {
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

export default Search;
