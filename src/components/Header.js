import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
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
    });

    // Unsubscribing, when this component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []); // Calling this API only once

  return (
    <div className="flex justify-between absolute w-full px-3 sm:px-5 z-10 py-2 font-parkinsans">
      <img
        className="w-14 sm:w-20 md:w-16 rounded-lg shadow-lg"
        src={LOGO}
        alt="Logo"
      />
      {user && (
        <div className="flex items-center">
          <p className="mx-5 text-sm font-semibold">
            <i className="fa-solid fa-user-check mr-2 text-black text-lg"></i>
            {user.displayName}
          </p>
          <button
            onClick={handleSignout}
            className="bg-yellow-300 text-black p-2 rounded font-bold text-sm mx-5 px-3 shadow-md"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
