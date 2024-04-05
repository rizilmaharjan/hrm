import { useEffect, useState } from "react";
import { Instance } from "../utils/Instance";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import Button from "../components/ui/Button";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { loginSchema } from "../validations/login.schema";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  logInFailure,
  logInStart,
  logInSuccess,
} from "../redux/user/userSlice";
import { TLogin } from "../interfaces/types/login.types";

export default function Login() {
  const [loginDetails, setLoginDetails] = useState<TLogin>({
    username: "",
    hashedPassword: "",
  });
  const dispatch = useAppDispatch();
  const { error, loading, errMsg } = useAppSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginSchema.validate(loginDetails, { abortEarly: false });
      // setIsLoading(true);
      dispatch(logInStart());

      const res = await Instance.post("/v1/auth/login", loginDetails);
      console.log("login response", res);
      setLoginDetails((prev) => ({
        ...prev,
        username: "",
        hashedPassword: "",
      }));
      dispatch(logInSuccess(res.data.userData));
      // localStorage.setItem("username", res.data.userData.USER_CD);
      console.log("Test routing");
    } catch (error: any) {
      if (error.response) {
        // toast.error(error.response.data.message);
        dispatch(logInFailure(error.response.data.message));
      } else if (error.request) {
        // toast.error("Network error");
        dispatch(logInFailure("Network Error"));
      }

      if (error.inner) {
        const newErrors: { [key: string]: string } = {};
        error.inner.forEach((err: any) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  useEffect(() => {
    if (error && errMsg) {
      toast.error(errMsg);
    }
  }, [error, errMsg]);
  return (
    <>
      <div className="max-w-sm mx-auto mt-14">
        <h1 className="text-3xl font-semibold mb-10">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              value={loginDetails.username}
              autoComplete="off"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
              placeholder="name@example.com"
            />
            {errors.username && (
              <div className="text-red-500 text-xs mt-1 font-semibold">
                {errors.username}
              </div>
            )}
          </div>
          <div className="mb-5 relative">
            <label
              htmlFor="hashedPassword"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="hashedPassword"
              id="hashedPassword"
              onChange={handleChange}
              value={loginDetails.hashedPassword}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    "
            />
            {loginDetails.hashedPassword &&
              (showPassword ? (
                <FiEyeOff
                  onClick={() => setShowPassword(false)}
                  className="absolute right-3 top-10 cursor-pointer"
                />
              ) : (
                <FiEye
                  onClick={() => setShowPassword(true)}
                  className="absolute right-3 top-10 cursor-pointer"
                />
              ))}
            {errors.hashedPassword && (
              <div className="text-red-500 text-xs mt-1 font-semibold">
                {errors.hashedPassword}
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {loading ? (
              <>
                <div className="flex items-center gap-2">
                  <Loader color="text-white" height="h-4" width="w-4" />
                  Loading...
                </div>
              </>
            ) : (
              "Login"
            )}
          </Button>
          {/* <button
            type="submit"
            disabled={isLoading}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            {isLoading ? (
              <>
                <div className="flex items-center gap-2">
                  <Loader color="text-white" height="h-4" width="w-4" />
                  Loading...
                </div>
              </>
            ) : (
              "Login"
            )}
          </button> */}
        </form>
      </div>
    </>
  );
}
