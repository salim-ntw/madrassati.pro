import React from 'react'

function Login() {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-700  flex items-center justify-center h-screen w-screen overflow-hidden">
      <div className="bg-white w-1/3 h-[60%] flex flex-col items-center pt-5 rounded-xl gap-8">
        <div className="text-center">
          <h1 className="font-bold text-2xl">TaskFlow</h1>
          <p className="text-gray-600">sign in to your account</p>
        </div>
        <div className="flex flex-col gap-4 w-[90%] ">
          <div className="flex flex-col gap-1 ">
            <label className="text-sm font-semibold "> Email Address</label>
            <input
              type="text"
              placeholder="enter your email"
              className="border-gray-300 border p-2 rounded-lg"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label className="text-sm font-semibold ">Password</label>
            <input
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="enyer your password"
              className="border-gray-300 border p-2 rounded-lg"
            />
          </div>
          <button
            // onClick={submit}
            className="bg-blue-700 rounded-lg h-9 text-white text-sm font-semibold cursor-pointer"
          >
            Sign In
          </button>
          <p className="text-center text-gray-400">
            Don't have an account ?{" "}
            <a className="text-blue-700 font-semibold" href="/register">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login
