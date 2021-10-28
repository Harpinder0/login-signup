import React, { useEffect, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const Login = ({history}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token) {
            history.push('/dashboard')
        }
    },[])


    const onLogin = () => {
        setLoading(true)
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            localStorage.setItem('token', userCredential._tokenResponse.idToken);
            history.push('/dashboard')
        }).catch(e => alert(e.message))
        .finally(() => setLoading(false))
    }

  return (
    <div>
      <div className="h-screen bg-white relative flex flex-col space-y-10 justify-center items-center">
        <div className="bg-white md:shadow-lg shadow-none rounded p-6 w-96">
          <h1 className="text-3xl font-bold leading-normal">Login</h1>
          <div className="space-y-5 mt-5">
            <div className="mb-4 relative">
              <input
                name="email"
                className="w-full rounded px-3 border border-gray-500 pt-2 pb-2 focus:outline-none input active:outline-none"
                type="text"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="relative flex items-center border border-gray-500 focus:ring focus:border-blue-500 rounded">
              <input
                name="password"
                className="w-full rounded px-3 pt-2 outline-none pb-2 focus:outline-none active:outline-none input active:border-blue-500"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <button className="w-full text-center bg-blue-700 hover:bg-blue-900 rounded-full text-white mt-5 py-3 font-medium"
            onClick={onLogin}
            >
              {loading ? "Loging..." : "Login"}
            </button>
          </div>
        </div>
        <p>
          Create New Account
          <Link
            className="text-blue-700 font-bold hover:bg-blue-200 hover:underline hover:p-5 p-2 rounded-full"
            to="/signup"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
