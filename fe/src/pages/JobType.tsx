import { useEffect, useState } from "react";
import { Instance } from "../config/Instance";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import Delete from "../modal/Delete";
import AddJobType from "../modal/AddJobType";
export type TJobType = {
  job_type_cd: string;
  job_type_desc: string;
  tax: string;
  pf_allowed: string;
  cit: string;
  disabled: string;
  entered_by: string;
  entered_dt?: Date;
  pay_generate?: string;
  tax_percent?: number;
  single_rebate?: number;
  married_rebate?: number;
  grade_allowed?: string;
  is_job_expire_date?: string;
  job_expire_months?: number;
  is_social_security_fund?: string;
  job_type_group?: string;
};

export default function JobType() {
  const [jobType, setJobType] = useState<TJobType[]>([]);
  // const { setEditID, setIsEdit, setServiceToEdit } = useCustomContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectDeleteId, setSelectDeleteId] = useState("");
  const [jobTypeToEdit, setJobTypeToEdit] = useState<TJobType>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  //Get all Job type data
  useEffect(() => {
    const getJobType = async () => {
      setIsLoading(true);
      try {
        const res = await Instance.get("/v1/job-type");
        setJobType(res.data.data);
        setError("");
      } catch (error: any) {
        setError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    getJobType();
  }, []);

  const handleDelete = async (id: string) => {
    setIsDeleteModalOpen(true);
    setSelectDeleteId(id);
    // try {
    //   const res = await Instance.delete(`/v1/service/${id}`);
    //   setServiceEvents((prev) => {
    //     const filteredService = prev.filter(
    //       (event) => event.SERVICE_EVENT_CD !== id
    //     );
    //     return filteredService;
    //   });
    // } catch (error) {}
  };

  const onDeleteSuccess = () => {
    setJobType((prev) =>
      prev.filter((event) => event.job_type_cd !== selectDeleteId)
    );
  };

  const handleEdit = (id: string) => {
    const update = jobType.find((item) => item.job_type_cd === id);
    if (update) {
      setIsEdit(true);
      // setEditID(id);
      setJobTypeToEdit(update);
      setIsModalOpen(true);
    }
  };

  // useEffect(() => {
  //   setIsEdit(false);
  //   setServiceToEdit(null);
  //   setEditID("");
  // }, [location.pathname]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
        {isLoading ? (
          <div className="min-h-screen flex items-center justify-center w-full">
            <Loader color="text-blue-800" width="w-6" height="h-6" />
          </div>
        ) : (
          <>
            {isDeleteModalOpen && (
              <Delete
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                selectDeleteId={selectDeleteId}
                onDeleteSuccess={onDeleteSuccess}
              />
            )}
            {isModalOpen && (
              <AddJobType
                setJobType={setJobType}
                setIsModalOpen={setIsModalOpen}
                jobTypeToEdit={jobTypeToEdit}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
              />
            )}
            <div className="flex justify-between p-3">
              <h1 className="font-semibold text-xl">Job Type</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-500 text-white w-32 py-1 rounded-lg font-semibold"
                type="button"
              >
                Add Job Type
              </button>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 top-0">
                <tr>
                  <th scope="col" className="px-6 py-3 w-1/12">
                    Code
                  </th>
                  <th scope="col" className="px-6 py-3 w-4/12">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 w-2/12 ">
                    Tax Applicable?
                  </th>
                  <th scope="col" className="px-6 py-3 w-1/12">
                    Flat %
                  </th>
                  <th scope="col" className="px-6 py-3 w-1/12">
                    PF
                  </th>
                  <th scope="col" className="px-6 py-3 w-1/12">
                    CIT
                  </th>
                  <th scope="col" className="px-6 py-3 w-1/12">
                    Pay Gen.
                  </th>
                  <th scope="col" className="px-6 py-3 w-1/12">
                    Is Grade
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Single Rebate
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Married rebate
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Disable
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-3xl scrollbar-track-gray-100 h-64">
                {jobType &&
                  jobType.length > 0 &&
                  jobType.map((item) => (
                    <tr className="odd:bg-white even:bg-gray-50 border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {item && item.job_type_cd}
                      </th>
                      <td className="px-6 py-4">
                        {item && item.job_type_desc}
                      </td>
                      <td className="px-6 py-4">{item && item.tax}</td>
                      <td className="px-6 py-4">{item && item.tax_percent}</td>
                      <td className="px-6 py-4">{item && item.pf_allowed}</td>
                      <td className="px-6 py-4">{item && item.cit}</td>
                      <td className="px-6 py-4">{item && item.pay_generate}</td>
                      <td className="px-6 py-4">
                        {item && item.grade_allowed}
                      </td>
                      <td className="px-6 py-4">
                        {item && item.single_rebate}
                      </td>
                      <td className="px-6 py-4">
                        {item && item.married_rebate}
                      </td>
                      <td className="px-6 py-4">{item && item.disabled}</td>

                      {/* <td className="px-6 py-4">{item.ENTERED_BY}</td>
        <td className="px-6 py-4">
          {dateConversion(item.ENTERED_DT)}
        </td> */}
                      {/* <td className="px-6 py-4">
          {item.IS_AUTO_SALARY_ADJUST || "_"}
        </td> */}
                      {/* <td className="px-6 py-4">{item.LAST_UPDATED_BY || "_"}</td>
        <td className="px-6 py-4">
          {(item.LAST_UPDATED_ON &&
            dateConversion(item.LAST_UPDATED_ON)) ||
            "_"}
        </td> */}
                      <td className="px-6 py-4">
                        <span className="flex items-center gap-4">
                          <p
                            onClick={() => handleEdit(item && item.job_type_cd)}
                            className="font-medium text-blue-600 cursor-pointer hover:underline"
                          >
                            Edit
                          </p>
                          <p
                            onClick={() =>
                              handleDelete(item && item.job_type_cd)
                            }
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
          </>
        )}
      </div>
    </>
  );
}
