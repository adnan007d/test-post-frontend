import axios from "./axios";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hook";
import { setPosts } from "./slices/postSlice";
import { Redirect, useLocation } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import { IUser, selectUser, signIn, signOut } from "./slices/userSlice";
import Login from "./pages/Login";
import decode, { JwtPayload } from "jwt-decode";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const userObject = localStorage.getItem("user");
  const user = useAppSelector(selectUser);

  useEffect(() => {
    axios.get("/posts").then((res) => {
      dispatch(setPosts(res.data));
    });
  }, [dispatch]);

  useEffect(() => {
    const logout = () => {
      dispatch(signOut());
      localStorage.removeItem("user");
    };

    if (userObject) {
      const user: IUser = JSON.parse(userObject);

      const token = user.idToken;

      if (token) {
        const decodedToken = decode<JwtPayload>(token);
        if (
          decodedToken.exp &&
          decodedToken.exp * 1000 < new Date().getTime()
        ) {
          logout();
          return;
        }

        dispatch(
          signIn({
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
            idToken: user.idToken,
          })
        );
      }
    } else logout();
  }, [location, dispatch, userObject]);

  return (
    <div className="bg-black min-h-screen">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          {user ? <Redirect to="/" /> : <Login />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
