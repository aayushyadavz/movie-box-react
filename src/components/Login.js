import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidation } from "../utils/validate";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    password: "",
  });

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleButtonClick = () => {
    setErrorMessage({
      name: isSignInForm
        ? checkValidation(nameRef.current.value, null, null) // nameRef.current refers to the input DOM element, and .value provides the current value of that input box.
        : "",
      email: checkValidation(null, emailRef.current.value, null),
      password: checkValidation(null, null, passwordRef.current.value),
    });
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div className="relative min-h-screen font-parkinsans">
      <Header />
      <div className="relative">
        <img
          src="https://www.plex.tv/wp-content/uploads/2024/01/Watch-Free-Hero-2048x1152-3.png"
          alt="Home page background images"
          className="w-full h-full object-cover"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 bg-black bg-opacity-70 p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-extrabold mb-4 text-white">
          {!isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {isSignInForm && (
          <input
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            className="block w-full p-2 text-yellow-300 font-semibold border-gray-300 rounded bg-gray-600 outline-none"
          />
        )}
        <p className="mb-4 mt-1 italic text-xs text-red-600">
          {errorMessage.name}
        </p>
        <input
          ref={emailRef}
          type="email"
          placeholder="Email address"
          className="block w-full p-2 text-yellow-300 font-semibold border-gray-300 rounded bg-gray-600 outline-none"
        />
        <p className="mb-4 mt-1 italic text-xs text-red-600">
          {errorMessage.email}
        </p>
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="block w-full p-2 text-yellow-300 font-semibold border-gray-300 rounded bg-gray-600 outline-none"
        />
        <p className="mb-4 mt-1 italic text-xs text-red-600">
          {errorMessage.password}
        </p>
        <button
          onClick={handleButtonClick}
          className="block w-full bg-yellow-300 text-black p-2 mb-4 rounded font-bold"
        >
          {isSignInForm ? "Sign Up" : "Sign In"}
        </button>
        <p className="text-xs text-white">
          {isSignInForm ? "Already a user!" : "New to Movie Box?"}
          <span
            className="underline font-semibold text-yellow-300 cursor-pointer ml-1"
            onClick={toggleSignInForm}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;

// Notes:

// useRef Hook:

/* 
Here, `useRef` provides a reference to a DOM element or a mutable value that persists across renders. When used with an input box, the ref object has a current property, which points to the DOM element. For an input box, ref.current.value contains the current value of the input field.

- `useRef` does not just store the value of the input box; it holds a reference to the DOM element.
- `useRef` is mutable and does not trigger re-renders when updated. 
*/
