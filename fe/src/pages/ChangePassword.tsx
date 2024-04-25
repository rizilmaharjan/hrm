import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../components/ui/Button";
import { TChangePassword } from "../interfaces/types/changePassword.types";
import { changePasswordSchema } from "../validations/changePassword.schema";
import { Instance } from "../utils/Instance";

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TChangePassword>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: TChangePassword) => {
    try {
      const res = await Instance.post("/v1/auth/changePassword", data);
      console.log(res);
      toast.success(res.data.message);
      reset();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  return (
    <>
      <div className="p-4 w-full h-full">
        <h1 className="text-lg font-bold mb-6">Change Password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[20rem]">
          <div className="relative z-0 w-auto mb-5 group col-start-1">
            <label
              htmlFor="oldPassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Old Password
            </label>
            <input
              {...register("oldPassword")}
              type="password"
              className="block p-2.5 w-full text-sm uppercase text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            {typeof errors.oldPassword === "string" ? (
              <p className="text-red-500 text-xs">{errors.oldPassword}</p>
            ) : (
              errors.oldPassword &&
              typeof errors.oldPassword.message === "string" && (
                <p className="text-red-500 text-sm">
                  {errors.oldPassword.message}
                </p>
              )
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group col-start-1 ">
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              New Password
            </label>
            <input
              {...register("newPassword")}
              type="password"
              className="block p-2.5 w-full text-sm uppercase text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            {typeof errors.newPassword === "string" ? (
              <p className="text-red-500 text-xs">{errors.newPassword}</p>
            ) : (
              errors.newPassword &&
              typeof errors.newPassword.message === "string" && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </p>
              )
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group col-start-1 ">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              className="block p-2.5 w-full text-sm uppercase text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
            {typeof errors.confirmPassword === "string" ? (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
            ) : (
              errors.confirmPassword &&
              typeof errors.confirmPassword.message === "string" && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )
            )}
          </div>
          <Button
            type="submit"
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
