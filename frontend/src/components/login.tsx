import * as React from "react";

function LoginComponent() {
  return (
    <div className="flex flex-col justify-center text-white bg-white">
      <div className="flex flex-col pb-5 w-full bg-gray-900 max-md:max-w-full">
        <div className="flex flex-col justify-center items-start px-10 py-3.5 w-full text-lg font-bold tracking-tight whitespace-nowrap border-b border-solid border-b-gray-200 max-md:px-5 max-md:max-w-full">
          <div className="flex gap-4">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ea3c1d78e941df275ce337775648ca5dbd9cc7f3fb0e77fcbaccae8bc1ea2713?"
              className="my-auto w-4 aspect-square"
            />
            <div>Cryptocash</div>
          </div>
        </div>
        <div className="flex flex-col self-center py-12 mt-5 max-w-full w-[512px]">
          <div className="flex flex-col px-4 text-base max-md:max-w-full">
            <div className="text-3xl font-bold tracking-tighter max-md:max-w-full">
              Welcome to Cryptocash
            </div>
            <div className="mt-4 leading-[150%] max-md:max-w-full">
              Log in to your account to manage your portfolio, send and receive
              cryptocurrency.
            </div>
            <div className="mt-12 font-medium leading-[150%] max-md:mt-10 max-md:max-w-full">
              Email
            </div>
            <div className="justify-center items-start py-4 pr-16 pl-4 mt-2 whitespace-nowrap rounded-xl bg-slate-800 leading-[150%] max-md:pr-5 max-md:max-w-full">
              heather@gmail.com
            </div>
            <div className="mt-6 font-medium leading-[150%] max-md:max-w-full">
              Password
            </div>
            <div className="justify-center items-start py-4 pr-16 pl-4 mt-2 whitespace-nowrap rounded-xl bg-slate-800 leading-[150%] max-md:pr-5 max-md:max-w-full">
              password123
            </div>
            <div className="mt-4 text-sm leading-5 text-slate-400 max-md:max-w-full">
              Forgot your password?
            </div>
            <div className="flex justify-center items-center px-16 py-2.5 mt-6 text-sm font-bold tracking-wide leading-5 whitespace-nowrap bg-blue-600 rounded-xl max-md:px-5 max-md:max-w-full">
              <div className="justify-center bg-blue-600 aspect-[2]">
                Log in
              </div>
            </div>
            <div className="self-center mt-4 text-sm leading-5 text-center text-slate-400">
              OR
            </div>
          </div>
          <div className="flex justify-center items-center px-16 py-2.5 mx-4 mt-6 mb-16 text-sm font-bold tracking-wide leading-5 whitespace-nowrap rounded-xl bg-slate-800 max-md:px-5 max-md:mr-2.5 max-md:mb-10 max-md:max-w-full">
            <div className="flex gap-2">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/32b5c49acaba49fbef7336537a3fcc77d261fd6ed9c710e4545fd59e016a38f7?"
                className="self-start w-5 aspect-square"
              />
              <div className="grow justify-center bg-slate-800">
                Sign in with Google
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;