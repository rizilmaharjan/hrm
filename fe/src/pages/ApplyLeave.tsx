import { useForm, SubmitHandler } from "react-hook-form";
import Dropdown, { ItemProps } from "../components/Dropdown";
import { useEffect, useState } from "react";
import { useFetchData } from "../api";
import { Instance } from "../utils/Instance";
import { useAppSelector } from "../redux/hooks";

type TLeaveType = {
  leave_cd: string;
  leave_desc: string;
};

type TApplyLeave = {
  FROM_LEAVE_DT_NEP: string;
  FROM_LEAVE_DT: string;
  TO_LEAVE_DT_NEP: string;
  TO_LEAVE_DT: string;
  LEAVE_CD: string;
  LEAVE_TYPE: string;
  PHONE_NO: string;
  REMARKS: string;
  JOB_ASSIGN_TO: string;
  SUPERVISING_EMPLOYEE_CD: string;
  SANCTIONING_EMPLOYEE_CD: string;
};

const ApplyLeave = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const EMPLOYEE_CD = currentUser?.EMPLOYEE_CD;

  const { register, handleSubmit, setValue, reset } = useForm<TApplyLeave>();
  const [selectedJobAssign, setSelectedJobAssign] = useState<ItemProps | null>(
    null
  );
  const [selectedSupervisor, setSelectedSupervisor] =
    useState<ItemProps | null>(null);
  const [selectedSanctioningOfficer, setSelectedSanctioningOfficer] =
    useState<ItemProps | null>(null);

  const [englishDateFrom, setEnglishDateFrom] = useState("");
  const [englishDateTo, setEnglishDateTo] = useState("");
  const [nepaliDateFrom, setNepaliDateFrom] = useState("");
  const [nepaliDateTo, setNepaliDateTo] = useState("");

  useEffect(() => {
    if (englishDateFrom) {
      reset((prevValues) => ({
        ...prevValues,
        FROM_LEAVE_DT: englishDateFrom,
      }));
    }
  }, [englishDateFrom, reset]);

  useEffect(() => {
    if (englishDateTo) {
      reset((prevValues) => ({
        ...prevValues,
        TO_LEAVE_DT: englishDateTo,
      }));
    }
  }, [englishDateTo, reset]);

  useEffect(() => {
    if (nepaliDateFrom) {
      reset((prevValues) => ({
        ...prevValues,
        FROM_LEAVE_DT_NEP: nepaliDateFrom,
      }));
    }
  }, [nepaliDateFrom, reset]);

  useEffect(() => {
    if (nepaliDateTo) {
      reset((prevValues) => ({
        ...prevValues,
        TO_LEAVE_DT_NEP: nepaliDateTo,
      }));
    }
  }, [nepaliDateTo, reset]);

  const { data: employeeData } = useFetchData("/v1/employee");
  const { data: leaveTypeData } = useFetchData("/v1/leave-type");
  const leaveType = leaveTypeData?.data;

  const dropdownData = employeeData?.employees?.map((item) => ({
    id: item.employee_cd,
    title: `${item.first_name} ${item.middle_name || ""} ${item.sur_name}`,
  }));

  const handleSelectJobAssign = (item: ItemProps) => {
    setSelectedJobAssign(item);
    setValue("JOB_ASSIGN_TO", item.id); // Set the value in the form
  };

  const handleSelectSupervisor = (item: ItemProps) => {
    setSelectedSupervisor(item);
    setValue("SUPERVISING_EMPLOYEE_CD", item.id); // Set the value in the form
  };

  const handleSelectSanctioningOfficer = (item: ItemProps) => {
    setSelectedSanctioningOfficer(item);
    setValue("SANCTIONING_EMPLOYEE_CD", item.id); // Set the value in the form
  };

  const onSubmit: SubmitHandler<TApplyLeave> = (data) => {
    const leaveData = { EMPLOYEE_CD, ...data };
    console.log(leaveData);
  };

  const convertNepaliToEnglish = async (nepaliDate: string, field: string) => {
    try {
      const res = await Instance.post("/v1/nep-to-eng", { nepaliDate });
      const formattedDate = new Date(res.data.data).toISOString().slice(0, 10);
      if (field === "leaveFrom") {
        setEnglishDateFrom(formattedDate);
      } else if (field === "leaveTo") {
        setEnglishDateTo(formattedDate);
      }
    } catch (error) {
      console.log("Error converting nepali to english", error);
    }
  };

  const convertEnglishToNepali = async (englishDate: string, field: string) => {
    console.log("englishDate", englishDate);
    console.log("typeofenglishDate", typeof englishDate);
    try {
      const res = await Instance.post("/v1/eng-to-nep", { englishDate });
      const formattedDate = new Date(res.data.data).toISOString().slice(0, 10);

      console.log("nepaliDate", res);
      if (field === "leaveFrom") {
        setNepaliDateFrom(formattedDate);
      } else if (field === "leaveTo") {
        setNepaliDateTo(formattedDate);
      }
    } catch (error) {
      console.error("Error converting English to Nepali:", error);
    }
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
                  {...register("FROM_LEAVE_DT_NEP")}
                  onBlur={(e) =>
                    convertNepaliToEnglish(e.target.value, "leaveFrom")
                  }
                  className="block w-full p-2.5 text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="ml-3 font-bold">B.S.</span>
              </div>
              <div className="flex items-center">
                <input
                  type="date"
                  {...register("FROM_LEAVE_DT")}
                  onBlur={(e) =>
                    convertEnglishToNepali(e.target.value, "leaveFrom")
                  }
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
                  {...register("TO_LEAVE_DT_NEP")}
                  onBlur={(e) =>
                    convertNepaliToEnglish(e.target.value, "leaveTo")
                  }
                  className="block w-full p-2.5 text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="ml-3 font-bold">B.S.</span>
              </div>
              <div className="flex items-center">
                <input
                  type="date"
                  {...register("TO_LEAVE_DT")}
                  onBlur={(e) =>
                    convertEnglishToNepali(e.target.value, "leaveTo")
                  }
                  className="block w-full p-2.5 text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="ml-3 font-bold">A.D.</span>
              </div>
            </div>
            <div className="grid grid-cols-2 mb-2">
              <label htmlFor="leave-type">Leave Type</label>
              <select
                {...register("LEAVE_CD")}
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
                  {...register("LEAVE_TYPE")}
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
                  {...register("LEAVE_TYPE")}
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
                  {...register("LEAVE_TYPE")}
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
                {...register("PHONE_NO")}
                className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 mb-2 items-center">
              <label htmlFor="remarks">Remarks</label>
              <textarea
                {...register("REMARKS")}
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
                onSelect={handleSelectJobAssign}
              />
              <input type="hidden" {...register("JOB_ASSIGN_TO")} />
            </div>
            <div className="grid grid-cols-2 mb-2 items-center">
              <label htmlFor="supervising-officer-cd">
                Supervising Officer Code
              </label>
              <Dropdown
                items={dropdownData}
                placeholder="Search items..."
                inputStyles="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                dropdownStyles="bg-white"
                onSelect={handleSelectSupervisor}
              />
              <input type="hidden" {...register("SUPERVISING_EMPLOYEE_CD")} />
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
                onSelect={handleSelectSanctioningOfficer}
              />
              <input type="hidden" {...register("SANCTIONING_EMPLOYEE_CD")} />
            </div>
            <div className="flex items-center justify-end gap-4">
              <button
                type="submit"
                className="text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>
              <button
                type="reset"
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
