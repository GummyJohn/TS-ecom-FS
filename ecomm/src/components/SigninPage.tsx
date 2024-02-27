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

  return (
    <div
      style={bgStyle}
      className="h-[90vh] relative rounded-full border-2 border-blue-500 border border-black mt-24"
    >
      <div className="absolute bg-black h-full w-full opacity-70 z-10 rounded-full"></div>

      <div className="flex flex-col justify-center items-center border-black relative z-20 h-[95vh]">
        <div className="text-center flex flex-col justify-center items-center text-white mb-10">
          <h1 className="text-3xl my-2">Join The ShopNest Family!</h1>
          <h2 className="text-2xl">
            Where spending is never gonna be a problem!
          </h2>
        </div>

        {showSignIn ? (
          <SignInForm setShowSignIn={setShowSignIn} />
        ) : (
          <RegisterFrom setShowSignIn={setShowSignIn} />
        )}
      </div>
    </div>
  );
};

export default SignOrRegisterPage;
