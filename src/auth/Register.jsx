import React from "react";
import Logo from "../assets/img/logo.png";
import { LuEye, LuEyeOff } from "react-icons/lu";

const Register = () => {
  return (
    <div className="flex justify-center items-center flex-col flex-grow py-12 h-screen px-2">
      <div className="border rounded-md p-8 w-full max-w-sm shadow-lg bg-white">
        <a  href="/" className="flex items-center justify-center mb-6">
          <img src={Logo} alt="" className="h-[40px] " />
          <p className="text-primary text-xl font-black italic">PARFLY</p>
        </a>

        <form action="/">
          <div className="mb-4">
            <label className="block text-xs font-medium mb-1 text-text">
              Phone number or email
            </label>
            <input
              type="text"
              className="w-full border border-t-0 border-r-0 border-l-0 border-b-1  border-b-gray-300 outline-none py-2 text-gray-700 text-xs"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium mb-1 text-text">
              Phone number
            </label>
            <input
              type="text"
              className="w-full border border-t-0 border-r-0 border-l-0 border-b-1  border-b-gray-300 outline-none py-2 text-gray-700 text-xs"
              placeholder="Phone number"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium mb-1 text-text">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                className="w-full border border-t-0 border-r-0 border-l-0 border-b-1  border-b-gray-300 outline-none py-2 text-gray-700 text-xs relative"
                placeholder="Password (min 6 characters)"
              />
                
              <LuEye className="absolute top-2 right-3 text-gray-700" />
            </div>
          </div>

          <div className="flex justify-between items-center text-xs mb-2">
            <label className="flex items-center text-text">
              <input type="checkbox" className="mr-2 text-primary self-start" />
              <span>
                I’d like to receive offers and promotions from Parfly. I've read
                and agreed to the Direct Marketing terms in the{" "}
                <a href="" className="inline text-primary">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
          </div>

          <label className="text-[.60rem] text-text flex items-center justify-center mb-5">
            <span className="text-center text-[.60rem]">
              By clicking Sign Up below, you've read the full text and agreed to
              the{" "}
              <a href="" className="inline text-primary">
                Terms and Condition
              </a>{" "}
              and{" "}
              <a href="" className="inline text-primary">
                Privacy Policy
              </a>
              .
            </span>
          </label>

          <button
            type="submit"
            className="w-full bg-orange-500 text-sm text-white py-2 rounded-md hover:bg-orange-600"
          >
            Sign Up For Free
          </button>
        </form>

        <div className="flex items-center my-3">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-xs text-gray-500">Or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-md mb-2 hover:bg-gray-50 text-blue-500 text-xs font-semibold border-gray-400">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGFKGkE0n-MIDhhhVId5GpfwSz5wcPvTJ_Zw&s"
            alt="Facebook"
            className="h-4"
          />
          Continue with Facebook
        </button>

        <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-md mb-2 hover:bg-gray-50 text-black text-xs font-semibold border-gray-400">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG5FqrS9OkN5XrA5_GXcN7OV-SoLIl0KPwoQ&s"
            alt="Google"
            className="h-4"
          />
          Continue with Google
        </button>
      </div>

      <p className="text-xs text-center mt-2 text-text">
        Already have an account?&nbsp;
        <a href="/login" className="text-primary hover:underline font-semibold">
          Login
        </a>
      </p>
    </div>
  );
};

export default Register;
