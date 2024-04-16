import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Instance } from "../utils/Instance";
import Button from "../components/ui/Button";
import { loginSchema } from "../validations/login.schema";
import Loader from "../components/Loader";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  logInFailure,
  logInStart,
  logInSuccess,
} from "../redux/user/userSlice";
import Input from "../components/ui/Input";

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const dispatch = useAppDispatch();
  const { error, loading, errMsg } = useAppSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error && errMsg) {
      toast.error(errMsg);
    }
  }, [error, errMsg]);

  const onSubmit = async (data: FieldValues) => {
    dispatch(logInStart());

    try {
      const res = await Instance.post("/v1/auth/login", data);
      dispatch(logInSuccess(res.data.userData));
      reset();
    } catch (error: any) {
      dispatch(logInFailure(error.response.data.message));
    }
  };
  return (
    <>
      <div className="max-w-sm mx-auto mt-14">
        <h1 className="text-3xl font-semibold mb-10">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 font-medium text-gray-900 "
            >
              Username
            </label>
            <Input
              fieldName="username"
              register={register}
              errors={errors}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none   "
            />
          </div>
          <div className="mb-5 relative">
            <label
              htmlFor="username"
              className="block mb-2 font-medium text-gray-900 "
            >
              Password
            </label>
            <Input
              fieldName="hashedPassword"
              register={register}
              errors={errors}
              type={showPassword ? "text" : "password"}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none    "
            />
            {showPassword ? (
              <FiEyeOff
                onClick={() => setShowPassword(false)}
                className="absolute right-3 top-11 cursor-pointer"
              />
            ) : (
              <FiEye
                onClick={() => setShowPassword(true)}
                className="absolute right-3 top-11 cursor-pointer"
              />
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
        </form>
      </div>
    </>
  );
}
