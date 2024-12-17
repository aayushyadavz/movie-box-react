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
        // Sign-out successful
      })
      .catch((error) => {
        console.error("Error during sign-out:", error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in
        const { displayName, email, uid } = authUser;
        dispatch(addUser({ displayName, email, uid }));
        navigate("/browse"); // Navigate to the browse page
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/"); // Navigate to the login page
      }
      setIsAuthChecked(true); // Auth state has been checked
    });

    return () => unsubscribe(); // Cleanup subscription
    // eslint-disable-next-line
  }, []);

  // Prevent rendering until auth state is verified
  if (!isAuthChecked) {
    return null; // Or a loader if preferred
  }

  return (
    <div className="flex justify-between absolute w-full px-3 sm:px-5 z-10 py-2 font-parkinsans">
      <img
        className="w-14 sm:w-20 md:w-16 rounded-lg shadow-lg"
        src={LOGO}
        alt="Logo"
      />
      {user && user.displayName && (
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
