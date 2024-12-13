import { useDispatch } from "react-redux";
import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  // Calling this API only once
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { displayName, email, uid } = user;
        dispatch(addUser({ displayName: displayName, email: email, uid: uid }));
      } else {
        // User is signed out
        dispatch(removeUser());
      }
    });
    // eslint-disable-next-line
  }, []);

  return <RouterProvider router={appRouter} />;
};

export default Body;
