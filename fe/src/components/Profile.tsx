import { useParams } from "react-router-dom";
import { useFetchData } from "../api";
import Loader from "./Loader";
import { useEffect } from "react";

// type TOption = {
//   religion_cd: string;
//   religion_desc: string;
//   religion_desc_nep: string;
//   disabled: string;
//   entered_by: string;
//   entered_dt?: Date;
// };

export default function Profile() {
  const { id } = useParams<{ id: string }>();

  const {
    isPending,
    error,
    data: empData,
    refetch,
  } = useFetchData(`/v1/employee/${id}`);
  const emp = empData?.data;
  const employee = emp?.[0];

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <div className="h-full w-full grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        {isPending ? (
          <div className="min-h-screen flex items-center justify-center w-full">
            <Loader color="text-blue-800" width="w-6" height="h-6" />
          </div>
        ) : error ? (
          <div className="min-h-screen flex items-center justify-center w-full">
            <p className="text-red-500 text-sm lg:text-base font-semibold">
              Someting went wrong
            </p>
          </div>
        ) : (
          <>
            <div className="border shadow-lg p-4 rounded-lg">
              <h2 className="font-bold text-lg mb-4">Personal Details</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label htmlFor="firstName">
                      First Name<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      defaultValue={employee?.first_name}
                      type="text"
                      id="firstName"
                      placeholder="Enter your first name"
                      className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="middleName">Middle Name</label>
                    <input
                      id="middleName"
                      defaultValue={employee?.middle_name}
                      placeholder="Enter your middle name"
                      className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="lastName">
                      Last Name<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      defaultValue={employee?.sur_name}
                      id="lastName"
                      placeholder="Enter your last name"
                      className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label htmlFor="personalid">
                      Personal ID<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      defaultValue={employee?.employee_cd}
                      id="personalid"
                      placeholder="Enter your personal ID"
                      className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="phonenumber">
                      Phone Number<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      id="phonenumber"
                      defaultValue={employee?.mobile}
                      placeholder="Enter your phone number"
                      className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="dateofbirth">
                      Date of Birth<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="date"
                      id="dateofbirth"
                      placeholder="Enter your date of birth"
                      className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label htmlFor="personalid">
                      Gender<span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="flex">
                      <div className="flex items-center me-4">
                        <input
                          id="inline-radio"
                          type="radio"
                          value=""
                          name="inline-radio-group"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="inline-radio"
                          className="ms-2 text-sm font-medium text-gray-900"
                        >
                          Male
                        </label>
                      </div>
                      <div className="flex items-center me-4">
                        <input
                          id="inline-2-radio"
                          type="radio"
                          value=""
                          name="inline-radio-group"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="inline-2-radio"
                          className="ms-2 text-sm font-medium text-gray-900 "
                        >
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="phonenumber">
                      Marital Status<span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="flex">
                      <div className="flex items-center me-4">
                        <input
                          id="inline-radio"
                          type="radio"
                          value=""
                          name="inline-radio-group"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="inline-radio"
                          className="ms-2 text-sm font-medium text-gray-900"
                        >
                          Single
                        </label>
                      </div>
                      <div className="flex items-center me-4">
                        <input
                          id="inline-2-radio"
                          type="radio"
                          value=""
                          name="inline-radio-group"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="inline-2-radio"
                          className="ms-2 text-sm font-medium text-gray-900 "
                        >
                          Married
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label htmlFor="religion">Religion</label>
                    <select
                      id="religion"
                      name="religion"
                      className="bg-gray-50 border border-gray-300 text-gray-900 mb-5 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                      <option value="">Select Religion</option>
                      {/* {religionData?.map((option: TOption) => (
                        <option
                          key={option.religion_cd}
                          value={option.religion_cd}
                          className="capitalize"
                        >
                          {option.religion_desc}
                        </option>
                      ))} */}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label htmlFor="email">
                      Email<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      defaultValue={employee?.email}
                      id="email"
                      placeholder="Enter your email"
                      className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="password">
                      Password<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="border shadow-lg p-4 rounded-lg">
              <h2 className="font-bold text-lg mb-4">Company Details</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-2">
                  <div className="space-y-1 w-1/3">
                    <label htmlFor="employeeid">
                      Employee ID<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="employeeid"
                      placeholder="Enter Employee ID"
                      className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label
                      htmlFor="branch"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Branch
                    </label>
                    <select
                      id="branch"
                      name="branch"
                      className="bg-gray-50 border border-gray-300 text-gray-900 mb-5 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                      <option value="Y">Kathmandu</option>
                      <option value="N">Lalitpur</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <div className="space-y-1">
                      <label
                        htmlFor="department"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Department
                      </label>
                      <select
                        id="department"
                        name="department"
                        className="bg-gray-50 border border-gray-300 text-gray-900 mb-5 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option value="Y">HR</option>
                        <option value="N">IT</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-2 shadow-lg">
              <h2>Document</h2>
            </div>
            <div className="border-2 shadow-lg">
              <h2>Bank Account Details</h2>
            </div>
          </>
        )}
      </div>
    </>
  );
}
