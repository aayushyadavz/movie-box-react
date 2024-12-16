import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/"); // Navigating to Login Page
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  return (
    <div className="flex justify-between absolute w-full px-3 sm:px-5 z-10 py-2 font-parkinsans">
      <img
        className="w-14 sm:w-20 md:w-16 rounded-lg shadow-lg"
        src="https://m.media-amazon.com/images/I/41Bb+OxfMUL.png"
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
