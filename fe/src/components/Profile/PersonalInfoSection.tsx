import { useParams } from "react-router-dom";
import { useFetchData } from "../../api";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";

const PersonalInfoSection = () => {
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, setValue } = useForm();

  const { data: empOverview, refetch } = useFetchData(`/v1/employee/${id}`);
  const emp = empOverview?.data;
  const employee = emp?.[0];
  // console.log(employee);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (employee) {
      const birth_dt = new Date(employee.birth_dt).toISOString().split("T")[0];
      setValue("employee_cd", employee.employee_cd);
      setValue("first_name", employee.first_name);
      setValue("middle_name", employee.middle_name);
      setValue("sur_name", employee.sur_name);
      setValue("gender", employee.gender);
      setValue("mobile", employee.mobile);
      setValue("birth_dt", birth_dt);
      setValue("marital_status", employee.marital_status);
      setValue("citizenship_no", employee.citizenship_no);
      setValue("email", employee.email);
      setValue("password", employee.employee_password);
    }
  }, [employee, setValue]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  if (!employee) {
    <h1>Loading...</h1>;
  } else {
    return (
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-7 gap-6 mb-6 w-full grid-cols-1">
          <div>
            <label
              htmlFor="personal_id"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Employee Code
            </label>
            <input
              type="number"
              id="employee_cd"
              {...register("employee_cd")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              First name
            </label>
            <input
              type="text"
              id="first_name"
              {...register("first_name")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="middle_name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Middle name
            </label>
            <input
              type="text"
              id="middle_name"
              {...register("middle_name")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="sur_name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Last name
            </label>
            <input
              type="text"
              id="sur_name"
              {...register("sur_name")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-5">
          <div>
            <label
              htmlFor="citizenship_no"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Citizenship Number
            </label>
            <input
              type="text"
              id="cirizenship_no"
              {...register("citizenship_no")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          <div>
            <label
              htmlFor="mobile"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Phone Number
            </label>
            <input
              type="number"
              id="mobile"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              {...register("mobile")}
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Gender
            </label>
            <select
              {...register("gender")}
              id="gender"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="birth_dt"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="birth_dt"
              {...register("birth_dt")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              // placeholder="flowbite.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="marital_status"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Marital Status
            </label>
            <select
              id="marital_status"
              {...register("marital_status")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value="S">Single</option>
              <option value="M">Married</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
        </div>
        <Button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </Button>
      </form>
    );
  }
};

export default PersonalInfoSection;
