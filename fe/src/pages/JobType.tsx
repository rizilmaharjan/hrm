import { useEffect, useState } from "react";
import { Instance } from "../utils/Instance";
import Loader from "../components/Loader";
import Delete from "../components/modal/Delete";
import AddJobType from "../components/modal/AddJobType";
import { TJobType } from "../interfaces/types/jobType.type";
import jsPDF from "jspdf";
import { FileExport } from "../assets/svg";
import "jspdf-autotable";
import { jobTypeTitle } from "../constants";

export default function JobType() {
  const [jobType, setJobType] = useState<TJobType[]>([]);
  // const { setEditID, setIsEdit, setServiceToEdit } = useCustomContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
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
  const exportToPDF = () => {
    const doc = new jsPDF();
    let yPos = 10;
    doc.text("Job Type Data", 10, yPos);
    yPos += 10;
    const addFooter = (doc: jsPDF, pageNumber: number) => {
      const pageCount = doc.getNumberOfPages();
      doc.setFontSize(10);
      doc.text(
        `Page ${pageNumber} of ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: "center" }
      );
      doc.text(
        new Date().toLocaleDateString(),
        10,
        doc.internal.pageSize.height - 10
      );
    };
    const headers = ["Code", "Description", "Tax", "CIT", "PF", "Disabled"];
    const data = jobType.map((item) => [
      item.job_type_cd,
      item.job_type_desc,
      item.tax,
      item.cit,
      item.pf_allowed,
      item.disabled,
    ]);
    doc.autoTable({
      startY: yPos,
      head: [headers],
      body: data,
      didDrawPage: (data: any) => {
        // Call addFooter function on each page draw
        addFooter(doc, data.pageNumber);
      },
    });
    // Generate Blob URL for the PDF content
    const blob = doc.output("blob");
    const pdfBlobUrl = URL.createObjectURL(blob);

    // Open the PDF content in a new tab
    const newTab = window.open(pdfBlobUrl);
    if (!newTab) {
      alert("Please allow pop-ups for this website");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="relative top-0 bottom-0 h-full shadow-md sm:rounded-lg w-full">
        {isLoading ? (
          <div className="min-h-screen flex items-center justify-center w-screen">
            <Loader color="text-blue-800" width="w-6" height="h-6" />
          </div>
        ) : (
          <>
            {isDeleteModalOpen && (
              <Delete
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                // selectDeleteId={selectDeleteId}
                onDeleteSuccess={onDeleteSuccess}
                deleteUrl={`/v1/job-type/${selectDeleteId}`}
              />
            )}
            {isModalOpen && (
              <AddJobType
                setJobType={setJobType}
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
                jobTypeToEdit={jobTypeToEdit}
                isEdit={isEdit}
                setIsEdit={setIsEdit}
                setJobTypeToEdit={setJobTypeToEdit}
              />
            )}
            <div className="flex justify-between p-3">
              <h1 className="font-semibold text-xl">Job Type</h1>
              <div className="flex gap-4">
                <button
                  onClick={exportToPDF}
                  className="bg-green-500 text-white py-1 px-2 rounded-lg font-semibold"
                  type="button"
                >
                  <FileExport />
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-green-500 text-white w-32 py-1 rounded-lg font-semibold"
                  type="button"
                >
                  Add Job Type
                </button>
              </div>
            </div>
            <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-lg scrollbar-track-gray-100 h-full">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-fixed">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                  <tr>
                    {jobTypeTitle.map((item) => (
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
                  {jobType &&
                    jobType.length > 0 &&
                    jobType.map((item) => (
                      <tr
                        key={item.job_type_cd}
                        className="odd:bg-white even:bg-gray-50 border-b "
                      >
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
                        <td className="px-6 py-4">
                          {item && item.tax_percent}
                        </td>
                        <td className="px-6 py-4">{item && item.pf_allowed}</td>
                        <td className="px-6 py-4">{item && item.cit}</td>
                        <td className="px-6 py-4">
                          {item && item.pay_generate}
                        </td>
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
                              onClick={() =>
                                handleEdit(item && item.job_type_cd)
                              }
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
            </div>
          </>
        )}
      </div>
    </>
  );
}
