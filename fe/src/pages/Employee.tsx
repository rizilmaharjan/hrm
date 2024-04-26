import { useEffect, useState } from "react";
import { useFetchData } from "../api";
import Loader from "../components/Loader";
import { employeeTitle } from "../constants";
import { dateConversion } from "../utils/dateConversion";
import { Link } from "react-router-dom";

type TEmployee = {
  employee_cd: string;
  first_name: string;
  middle_name: string;
  sur_name: string;
  email: string;
  birth_dt: string;
  gender: string;
  marital_status: string;
  religion_cd: string;
};

const Employee = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 20;
  const {
    isPending,
    error,
    data: employeeData,
    refetch,
  } = useFetchData("/v1/employee", page, limit);
  // console.log(employeeData);
  const employee = employeeData?.employees;
  const count = employeeData?.rowCount;

  useEffect(() => {
    refetch(); // Call refetch whenever page changes
  }, [page, refetch]);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      setPage(1);
    }
  };
  const handleNext = () => {
    if (page < Math.ceil(count / limit)) {
      setPage(page + 1);
    } else {
      setPage(Math.ceil(count / limit));
    }
  };

  if (isPending) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader color="text-blue-800" width="w-6" height="h-6" />
      </div>
    );
  }

  if (error) {
    return (
      <span className="text-red-500 text-sm lg:text-base font-semibold">
        {" "}
        Someting went wrong
      </span>
    );
  }

  return (
    <>
      <div className="relative top-0 bottom-0 h-full shadow-md sm:rounded-lg w-full">
        <div className="flex justify-between p-3">
          <h1 className="font-semibold text-xl">Employee List</h1>
          <div className="flex items-center">
            <button
              onClick={handlePrev}
              className="flex items-center justify-center px-3 h-8 mr-2 text-sm font-medium text-gray-900 rounded-s hover:bg-gray-100"
            >
              <svg
                className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Prev
            </button>
            <span className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {page * limit - (limit - 1)}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-900">
                {limit * page}
              </span>{" "}
              of <span className="font-semibold text-gray-900">{count}</span>{" "}
              Entries
            </span>
            <div className="inline-flex">
              <button
                onClick={handleNext}
                className="flex items-center justify-center px-3 h-8 ml-2 text-sm font-medium text-gray-900 rounded-s hover:bg-gray-100"
              >
                Next
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              // onClick={() => setIsModalOpen(true)}
              className="bg-green-500 text-white w-24 py-1 rounded-lg font-semibold"
              type="button"
            >
              Add
            </button>
          </div>
        </div>
        <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-lg scrollbar-track-gray-100 h-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-fixed">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
              <tr>
                {employeeTitle.map((item) => (
                  <th
                    key={item.id}
                    scope="col"
                    className={`px-6 py-3 ${item.width}`}
                  >
                    {item.title}
                  </th>
                ))}

                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {employee &&
                employee.length > 0 &&
                employee.map((item: TEmployee) => (
                  <tr
                    key={item.employee_cd}
                    className="odd:bg-white even:bg-gray-50  border-b "
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <Link to={`/employee/profile/${item.employee_cd}`}>
                        {item.employee_cd}
                      </Link>
                    </th>
                    <td className="text-sm px-6 py-4 capitalize">
                      {`${item.first_name} ${item.middle_name} ${item.sur_name}`.toLowerCase()}
                    </td>
                    <td className="text-sm px-6 py-4">{item.email}</td>
                    <td className="px-6 py-4">
                      {dateConversion(item.birth_dt)}
                    </td>

                    <td className="px-6 py-4">{item.gender}</td>

                    <td className="px-6 py-4">{item.marital_status}</td>
                    <td className="px-6 py-4">{item.religion_cd}</td>

                    <td className="px-6 py-4">
                      <span className="flex items-center gap-4">
                        <p
                          // onClick={() => handleEdit(item.allowance_CD)}
                          className="font-medium text-blue-600 cursor-pointer hover:underline"
                        >
                          Edit
                        </p>
                        <p
                          // onClick={() => handleDelete(item.allowance_CD)}
                          className="font-medium cursor-pointer text-red-600 hover:underline"
                        >
                          Delete
                        </p>
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Employee;
