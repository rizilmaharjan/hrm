import { useParams } from "react-router-dom";
import { useFetchData } from "../../api";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../ui/Button";

const AccountInfoSection = () => {
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit } = useForm();

  const { data: empOverview, refetch } = useFetchData(`/v1/employee/${id}`);
  const emp = empOverview?.data;
  const employee = emp?.[0];
  // console.log(employee);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  if (!employee) {
    <h1>Loading...</h1>;
  } else {
    return (
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-7 gap-6 mb-6 w-full">
          <div>
            <label
              htmlFor="acc_name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Account Holder Name
            </label>
            <input
              type="text"
              id="acc_name"
              {...register("acc_name")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="acc_no"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Account Number
            </label>
            <input
              type="number"
              id="acc_no"
              {...register("acc_no")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="bank_name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Bank Name
            </label>
            <input
              type="text"
              id="bank_name"
              {...register("bank_name")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="branch"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Branch
            </label>
            <input
              type="text"
              id="branch"
              {...register("brancg")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-5">
          <div>
            <label
              htmlFor="pf_no"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              PF Number
            </label>
            <input
              type="no"
              id="pf_no"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              // placeholder="Flowbite"
              required
            />
          </div>
          <div>
            <label
              htmlFor="inv_fund_no"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Investment Fund Number
            </label>
            <input
              type="number"
              id="inv_fund_no"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              {...register("inv_fund_no")}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="pan_no"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Pan Number
            </label>
            <input
              type="number"
              id="pan_no"
              {...register("pan_no")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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

export default AccountInfoSection;
