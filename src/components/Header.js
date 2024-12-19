import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false); // To ensure rendering happens only after auth state is checked

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.error("Error during sign-out:", error);
      });
  };

  useEffect(() => {
    // Placing this logic here because the header component is rendered throughout the app
    // This allows tracking of authentication state changes globally
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { displayName, email, uid } = user;
        dispatch(addUser({ displayName: displayName, email: email, uid: uid }));
        navigate("/browse"); // Sign In - navigate to browse page
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/"); // Sign Out - navigate to login page
      }
      setIsAuthChecked(true); // Auth state has been checked
    });

    // Unsubscribing, when this component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []); // Calling this API only once

  // Prevent rendering until auth state is verified
  if (!isAuthChecked) {
    return null;
  }

  return (
    <div
      className="flex justify-between absolute w-full px-2 sm:px-5 z-10 py-2 font-parkinsans"
      style={{
        backgroundColor:
          user && user.displayName ? "rgba(0, 0, 0, 0.5)" : "transparent",
      }}
    >
      <img
        className="w-10 sm:w-20 md:w-16 rounded-lg shadow-lg"
        src={LOGO}
        alt="Logo"
      />
      {user && user.displayName && (
        <div className="flex items-center">
          <p className="mx-4 sm:mx-5 text-[9px] sm:text-xs font-medium text-white">
            <i className="fa-solid fa-user-check mr-1 sm:mr-2 text-white text-xs sm:text-base"></i>
            {user.displayName}
          </p>
          <button
            onClick={handleSignout}
            className="bg-yellow-300 text-black p-[5px] sm:p-2 rounded font-bold text-xs sm:text-sm mr-2 sm:mx-5 px-[7px] sm:px-3 shadow-md transition transform active:scale-95"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
