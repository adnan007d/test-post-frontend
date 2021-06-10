import { setCookie } from "nookies";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import { createUser } from "../actions/userActions";
import { auth, GoogleProvider } from "../firebase";

const Login: FC = () => {
  const history = useHistory();

  const signIn = async () => {
    try {
      const result = await auth.signInWithPopup(GoogleProvider);
      const user = result.user;
      const token = await user?.getIdToken();
      setCookie(null, "token", token || "", { path: "/" });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user?.toJSON(), idToken: token })
      );
      await createUser({
        displayName: user?.displayName || "",
        photoURL: user?.photoURL || "",
        email: user?.email || "",
        uid: user?.uid || "",
      });
      history.push("/");
      console.info("Hello");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen w-screen grid place-items-center bg-black">
      <button onClick={signIn} className="btn border border-white">
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
