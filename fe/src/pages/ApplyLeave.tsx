import { useForm } from "react-hook-form";
import Dropdown, { ItemProps } from "../components/Dropdown";
import { useState } from "react";
import { useFetchData } from "../api";

type TLeaveType = {
  leave_cd: string;
  leave_desc: string;
};

const ApplyLeave = () => {
  const { register, handleSubmit } = useForm();
  const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);
  const { data: employeeData } = useFetchData("/v1/employee");
  const { data: leaveTypeData } = useFetchData("/v1/leave-type");
  const leaveType = leaveTypeData?.data;
  // const employees = employeeData?.employees;
  // console.log("Employees: ", employees);
  const dropdownData = employeeData?.employees?.map((item) => ({
    id: item.employee_cd,
    title: `${item.first_name} ${item.middle_name || ""} ${item.sur_name}`,
  }));
  // console.log(dropdownData);
  const handleSelect = (item: ItemProps) => {
    setSelectedItem(item);
    console.log(item);
  };

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="bg-gray-100 max-w-[48rem] p-4 m-2 rounded-lg">
        <h1 className="text-lg font-bold mb-6">Leave Application</h1>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 mb-2 gap-8 items-center">
              <label htmlFor="leave-from">Leave From</label>
              <div className="flex items-center">
                <input
                  type="text"
                  {...register("leaveFromNep")}
                  className="block w-full p-2.5 text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="ml-3 font-bold">B.S.</span>
              </div>
              <div className="flex items-center">
                <input
                  type="date"
                  {...register("leaveFrom")}
                  className="block w-full p-2.5 text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="ml-3 font-bold">A.D.</span>
              </div>
            </div>
            <div className="grid grid-cols-3 mb-2 gap-8 items-center">
              <label htmlFor="leave-to">Leave To</label>
              <div className="flex items-center">
                <input
                  type="text"
                  {...register("leaveToNep")}
                  className="block w-full p-2.5 text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="ml-3 font-bold">B.S.</span>
              </div>
              <div className="flex items-center">
                <input
                  type="date"
                  {...register("leaveTo")}
                  className="block w-full p-2.5 text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="ml-3 font-bold">A.D.</span>
              </div>
            </div>
            <div className="grid grid-cols-2 mb-2">
              <label htmlFor="leave-type">Leave Type</label>
              <select
                {...register("leaveType")}
                className="bg-gray-50 border border-gray-300 text-gray-900 mb-5 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              >
                <option value="">Select</option>
                {leaveType?.map((leave: TLeaveType) => (
                  <option key={leave.leave_cd} value={leave.leave_cd}>
                    {leave.leave_desc}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-2">
              <div className="col-span-1 flex items-center ps-3 border border-gray-300 rounded">
                <input
                  defaultChecked
                  id="full-time-leave"
                  type="radio"
                  value="C"
                  {...register("absenceType")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="full-time-leave"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900"
                >
                  Full-Time Leave
                </label>
              </div>
              <div className="col-span-2 flex items-center ps-3 border border-gray-300 rounded">
                <input
                  id="fore-noon"
                  type="radio"
                  value="F"
                  {...register("absenceType")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="fore-noon"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900"
                >
                  Fore Noon (Half)
                </label>
                <input
                  id="after-noon"
                  type="radio"
                  value="A"
                  {...register("absenceType")}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="after-noon"
                  className="w-full py-4 ms-2 text-sm font-medium text-gray-900"
                >
                  After Noon (Half)
                </label>
              </div>
            </div>
            <div className="grid grid-cols-2 mb-2 items-center">
              <label htmlFor="contact-no">Contact No</label>
              <input
                type="text"
                {...register("phoneNo")}
                className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 mb-2 items-center">
              <label htmlFor="remarks">Remarks</label>
              <textarea
                {...register("remarks")}
                className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 mb-2 items-center">
              <label htmlFor="job-assign-to">Job Assign To</label>
              <Dropdown
                items={dropdownData}
                placeholder="Search items..."
                inputStyles="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                dropdownStyles="bg-white"
                onSelect={handleSelect}
              />
              {/* <input
                type="text"
                className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              /> */}
            </div>
            <div className="grid grid-cols-2 mb-2 items-center">
              <label htmlFor="supervising-officer-cd">
                Supervising Officer Code
              </label>
              <input
                type="text"
                className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 mb-2 items-center">
              <label htmlFor="sanctioning-officer-cd">
                Sanctioning Officer Code
              </label>
              <Dropdown
                items={dropdownData}
                placeholder="Search items..."
                inputStyles="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                dropdownStyles="bg-white"
                onSelect={handleSelect}
              />
              {/* <input
                type="text"
                className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              /> */}
            </div>
            {/* <Dropdown
              items={["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]}
              placeholder="Search items..."
              inputStyles="text-gray-700"
              dropdownStyles="bg-white"
              onSelect={handleSelect}
            /> */}
            <div className="flex items-center justify-end gap-4">
              <button
                type="submit"
                // disabled={isLoading}
                className="text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>
              <button
                type="reset"
                // disabled={isLoading}
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ApplyLeave;
