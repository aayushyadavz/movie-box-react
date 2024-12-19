import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidation } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMAGE } from "../utils/constants";

const Login = () => {
  const [isSignUpForm, setIsSignInForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    password: "",
    signUp: "",
    signIn: "",
  });
  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleButtonClick = () => {
    const nameError = isSignUpForm
      ? checkValidation(nameRef.current.value, null, null) // nameRef.current refers to the input DOM element, and .value provides the current value of that input box.
      : "";
    const emailError = checkValidation(null, emailRef.current.value, null);
    const passwordError = checkValidation(
      null,
      null,
      passwordRef.current.value
    );

    setErrorMessage({
      name: nameError,
      email: emailError,
      password: passwordError,
    });

    // if errormessage contains some strings then return, else proceed
    if (nameError || emailError || passwordError) {
      return;
    }

    if (isSignUpForm) {
      // if there is Sign Up form
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: nameRef.current.value,
            photoURL: "",
          })
            .then(() => {
              // Profile updated!
              // After Signing Up a new user, again dispatching an action with displayName
              const { displayName, email, uid } = auth.currentUser; // Updated auth info of currentUser
              dispatch(
                addUser({ displayName: displayName, email: email, uid: uid })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage((prev) => ({
            ...prev, // Keep the current errors
            signUp: `${errorCode} - ${errorMessage}`, // Update only the signUp error
          }));
        });
    } else {
      // if there is Sign In form
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          // Signed in
          /* eslint-disable-next-line no-unused-vars */
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage((prev) => ({
            ...prev, // Keep the current errors
            signIn: `${errorCode} - ${errorMessage}`, // Update only the signUp error
          }));
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignUpForm);
  };

  return (
    <div className="relative min-h-screen font-parkinsans bg-black">
      <Header />
      <div className="relative h-screen">
        <img
          src={BG_IMAGE}
          alt="Home page background images"
          className="w-full h-full object-cover"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 md:w-2/5 lg:w-1/4 bg-black bg-opacity-70 p-5 sm:py-10 sm:px-9 md:p-8 rounded-lg shadow-lg"
      >
        <h1 className="text-2xl font-extrabold mb-4 text-white">
          {!isSignUpForm ? "Sign In" : "Sign Up"}
        </h1>
        {isSignUpForm && (
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
        <p className="mb-4 mt-1 italic text-xs text-red-600">
          {isSignUpForm ? errorMessage.signUp : errorMessage.signIn}
        </p>
        <button
          onClick={handleButtonClick}
          className="block w-full bg-yellow-300 text-black p-2 mb-4 rounded font-bold transition transform active:scale-95"
        >
          {isSignUpForm ? "Sign Up" : "Sign In"}
        </button>
        <p className="text-xs text-white">
          {isSignUpForm ? "Already a user!" : "New to Movie Box?"}
          <span
            className="underline font-semibold text-yellow-300 cursor-pointer ml-1"
            onClick={toggleSignInForm}
          >
            {isSignUpForm ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
