import { useEffect, useRef, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

import { useAppDispatch } from "../redux/hooks";
import { useFetchData } from "../api";
import {
  setServiceToEdit,
  setEditID,
  setIsEdit,
} from "../redux/edit/editSlice";
// import { Instance } from "../utils/Instance";
// import { useNavigate } from "react-router-dom";
// import AddEvent from "../modal/AddEvent";
// import { useCustomContext } from "../context/DataContext";
// import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import Delete from "../components/modal/Delete";
// import { mapServiceEventType } from "../utils/serviceEventType";
import AddAllowance from "../components/modal/AddAllowance";
import { TAllowance } from "../interfaces/types/allowance.types";
import { FileExport } from "../assets/svg";
import { allowanceTitle } from "../constants";
import "jspdf-autotable";
import jsPDF from "jspdf";

export default function Allowance() {
  const [allowanceDatas, setAllowanceDatas] = useState<TAllowance[]>([]);
  // const { setEditID, setIsEdit, setServiceToEdit } = useCustomContext();
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  // const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectDeleteId, setSelectDeleteId] = useState("");
  // const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const debounceSearchTerm = useDebounce(searchTerm, 500);
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  });

  const {
    isPending,
    error: allowanceError,
    data: allowanceData,
  } = useFetchData(`/v1/allowance?search=${debounceSearchTerm}`);

  const dispatch = useAppDispatch();

  // to fetch the allowance datas
  // useEffect(() => {
  //   const getAllowanceDatas = async () => {
  //     setIsLoading(true);
  //     try {
  //       const res = await Instance.get("/v1/allowance");
  //       console.log("allowance response", res);
  //       setAllowanceDatas(res.data.allowance);
  //       setError("");
  //       console.log("service-events", res);
  //     } catch (error: any) {
  //       setError("Something went wrong");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   getAllowanceDatas();
  // }, []);

  useEffect(() => {
    setAllowanceDatas(allowanceData?.allowance);
    // console.log("allowance datas", allowanceData);
  }, [allowanceData]);

  const handleDelete = async (id: string) => {
    setIsDeleteModalOpen(true);
    setSelectDeleteId(id);
  };

  const onDeleteSuccess = () => {
    setAllowanceDatas((prev) =>
      prev.filter((event) => event.allowance_CD !== selectDeleteId)
    );
  };

  const handleEdit = async (id: string) => {
    try {
      const updateAllowance = await allowanceDatas.find(
        (item) => item.allowance_CD === id
      );
      dispatch(setEditID(id));
      dispatch(setIsEdit(true));
      console.log("updateAllowance clicked", updateAllowance);

      if (updateAllowance) {
        dispatch(setServiceToEdit(updateAllowance));
        // navigate("/service-event/create");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    let yPos = 10;
    doc.text("Allowance Data", 14, yPos);
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

    const headers = [
      "Code",
      "Description",
      "Type",
      "Taxable",
      "A/c",
      "A/c Description",
    ];
    const data = allowanceDatas.map((item) => [
      item.allowance_CD,
      item.allowance_description,
      item.allowance_type,
      item.allowance_taxable,
      item.allowance_acc_cd,
      item.allowance_acc_desc,
    ]);
    (doc as any).autoTable({
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
  //   useEffect(() => {
  //     setIsEdit(false);
  //     setServiceToEdit(null);
  //     setEditID("");
  //   }, [location.pathname]);

  //   if (error) {
  //     return <div>{error}</div>;
  //   }

  if (isPending) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader color="text-blue-800" width="w-6" height="h-6" />
      </div>
    );
  }

  if (allowanceError) {
    return <div>{allowanceError.message}</div>;
  }

  return (
    <>
      <div className="relative top-0 bottom-0 h-full shadow-md sm:rounded-lg w-full">
        {/* {isLoading ? (
          <div className="min-h-screen flex items-center justify-center w-full">
            <Loader color="text-blue-800" width="w-6" height="h-6" />
          </div>
        ) : ( */}
        {/* <> */}
        {isDeleteModalOpen && (
          <Delete
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            // selectDeleteId={selectDeleteId}
            onDeleteSuccess={onDeleteSuccess}
            deleteUrl={`/v1/allowance/${selectDeleteId}`}
          />
        )}
        {isModalOpen && (
          <AddAllowance
            setAllowanceDatas={setAllowanceDatas}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        )}
        <div className="flex justify-between p-3">
          <h1 className="font-semibold text-xl">Allowance</h1>
          <div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="px-2 py-1 rounded-lg border border-gray-400 outline-none"
            />
          </div>
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
              className="bg-green-500 text-white w-24 py-1 rounded-lg font-semibold"
              type="button"
            >
              Add
            </button>
          </div>
        </div>
        {/* <div className="h-full w-full bg-red-700"> */}
        <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-lg scrollbar-track-gray-100 h-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-fixed">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
              <tr>
                {allowanceTitle.map((item) => (
                  <th
                    key={item.id}
                    scope="col"
                    className={`px-6 py-3 ${item.width} ${
                      item.id === 9 ? "text-center" : ""
                    }`}
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
              {allowanceDatas && allowanceDatas.length > 0 ? (
                allowanceDatas.map((item) => (
                  <tr
                    key={item.allowance_CD}
                    className="odd:bg-white even:bg-gray-50  border-b "
                  >
                    <th
                      scope="row"
                      className=" py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.allowance_CD}
                    </th>
                    <td className=" py-4 px-6 capitalize">
                      {item.allowance_description.toLowerCase()}
                    </td>
                    <td
                      className={`px-6 py-4 ${
                        item.allowance_nepali_desc
                          ? " font-[Preeti]"
                          : "font-sans"
                      } text-lg`}
                    >
                      {item.allowance_nepali_desc
                        ? item.allowance_nepali_desc
                        : "_"}
                    </td>
                    <td className=" py-4 px-6">{item.allowance_taxable}</td>
                    {/* <td className=" py-4 px-6">{item.allowance_facility}</td> */}
                    <td className=" py-4 px-6">
                      {item.allowance_facility_percent
                        ? item.allowance_facility_percent
                        : "_"}
                    </td>
                    <td className=" py-4 px-6">
                      {item.allowance_cit_flag ? item.allowance_cit_flag : "_"}
                    </td>
                    <td className=" py-4 px-6">{item.allowance_type}</td>
                    <td className=" py-4 px-6">{item.salary_allowance_flag}</td>
                    <td className="py-4 px-6">
                      <span className="flex  items-center gap-6">
                        <span>
                          {item.allowance_acc_cd ? item.allowance_acc_cd : "-"}
                        </span>
                        <span className="lowercase">
                          {item.allowance_acc_desc
                            ? item.allowance_acc_desc
                            : "-"}
                        </span>
                      </span>
                    </td>
                    {/* <td className=" py-4 px-6">
                        </td> */}
                    <td className=" py-4 px-6">{item.allowance_disabled}</td>
                    <td className=" py-4 px-6">
                      <span className="flex items-center gap-4">
                        <p
                          onClick={() => handleEdit(item.allowance_CD)}
                          className="font-medium text-blue-600 cursor-pointer hover:underline"
                        >
                          Edit
                        </p>
                        <p
                          onClick={() => handleDelete(item.allowance_CD)}
                          className="font-medium cursor-pointer text-red-600 hover:underline"
                        >
                          Delete
                        </p>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="">
                  <td className="px-6 py-4 h-96" colSpan={12}>
                    <p className="text-center text-gray-500 text-bold text-3xl">
                      No Data Found
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* </div> */}
        {/* </> */}
        {/* )} */}
      </div>
    </>
  );
}
