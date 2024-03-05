import { useState } from "react";
import SignInForm from "../forms/SigninForm";
import RegisterFrom from "../forms/RegisterFrom";

const bgStyle = {
  backgroundImage: `url(../src/images/signin.jpg)`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const SignOrRegisterPage = () => {
  const [showSignIn, setShowSignIn] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false)

  return (
    <div
      style={bgStyle}
      className="h-full md:h-[130vh] lg:full 2xl:h-[90vh] relative 2xl:rounded-full 2xl:border-2 border-blue-500  mt-16"
    >
      <div className="absolute bg-black h-full w-full opacity-70 z-10 2xl:rounded-full"></div>

      <div className="flex flex-col justify-center items-center border-black relative z-20 h-[95vh]">
        <div className="text-center flex flex-col justify-center items-center text-white mb-10 md:hidden lg:inline">
          <h1 className="text-3xl my-2">Join The ShopNest Family!</h1>
          <h2 className="text-2xl px-4">
            Where spending is never gonna be a problem!
          </h2>
        </div>

        {showSignIn ? (
          <SignInForm setShowSignIn={setShowSignIn} success={success}/>
        ) : (
          <RegisterFrom setShowSignIn={setShowSignIn} setSuccess={setSuccess}/>
        )}
      </div>
    </div>
  );
};

export default SignOrRegisterPage;
