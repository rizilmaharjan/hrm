import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";

// import { Instance } from "../utils/Instance";
import AddEvent from "../components/modal/AddEvent";
import { useFetchData } from "../api";
// import { useCustomContext } from "../context/DataContext";
import Delete from "../components/modal/Delete";
import { mapServiceEventType } from "../utils/serviceEventType";
import { TServiceEvent } from "../interfaces/types/serviceEvent.types";
import { serviceEventTitle } from "../constants";
import { FileExport } from "../assets/svg";
import "jspdf-autotable";
import jsPDF from "jspdf";
import { useAppDispatch } from "../redux/hooks";
import {
  setServiceToEdit,
  setEditID,
  setIsEdit,
} from "../redux/edit/editSlice";
import Loader from "../components/Loader";

export default function ServiceEvent() {
  const [serviceEvents, setServiceEvents] = useState<TServiceEvent[]>([]);
  // const { setEditID, setIsEdit, setServiceToEdit } = useCustomContext();
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectDeleteId, setSelectDeleteId] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const debounceSearchTerm = useDebounce(searchTerm, 500);
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  });
  console.log("i am flickering");
  const {
    isPending,
    error: serviceEventError,
    data: serviceEventData,
  } = useFetchData(`/v1/service-event?search=${debounceSearchTerm}`);

  useEffect(() => {
    setServiceEvents(serviceEventData?.serviceEvents);
  }, [serviceEventData]);

  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   const getServiceEvents = async () => {
  //     setIsLoading(true);
  //     try {
  //       const res = await Instance.get("/v1/service-event");
  //       setServiceEvents(res.data.serviceEvents);
  //       setError("");
  //       console.log("service-events", res);
  //     } catch (error:serviceEventError: any) {
  //       setError("Something went wrong");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   getServiceEvents();
  // }, []);

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
    // } catch (error:serviceEventError) {}
  };

  const onDeleteSuccess = () => {
    setServiceEvents((prev) =>
      prev.filter((event) => event.SERVICE_EVENT_CD !== selectDeleteId)
    );
  };

  const handleEdit = async (id: string) => {
    try {
      const updateService = await serviceEvents.find(
        (item) => item.SERVICE_EVENT_CD === id
      );

      dispatch(setEditID(id));

      // setEditID(id);
      dispatch(setIsEdit(true));
      if (updateService) {
        dispatch(setServiceToEdit(updateService));
        // navigate("/service-event/create");
        setIsModalOpen(true);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(setIsEdit(false));
    dispatch(setServiceToEdit(null));
    dispatch(setEditID(""));
  }, [location.pathname, setEditID, setIsEdit, setServiceToEdit]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    let yPos = 10;
    doc.text("Service Event Data", 14, yPos);
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

    const headers = ["Code", "Description", "Type", "Disabled"];
    const data = serviceEvents.map((item) => [
      item.SERVICE_EVENT_CD,
      item.SERVICE_EVENT_DESC,
      item.SERVICE_EVENT_TYPE,
      item.DISABLED,
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

  if (serviceEventError) {
    return <div>{serviceEventError.message}</div>;
  }
  if (isPending) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader color="text-blue-800" width="w-6" height="h-6" />
      </div>
    );
  }

  return (
    <>
      <div className="h-full shadow-md sm:rounded-lg">
        {/* {isLoading ? (
          <div className="h-screen flex items-center justify-center w-full">
            <Loader color="text-blue-800" width="w-6" height="h-6" />
          </div>
        ) : ( */}
        {/* <> */}
        {isDeleteModalOpen && (
          <Delete
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            onDeleteSuccess={onDeleteSuccess}
            deleteUrl={`/v1/service/${selectDeleteId}`}
          />
        )}
        {isModalOpen && (
          <AddEvent
            setServiceEvents={setServiceEvents}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        )}
        <div className="flex justify-between px-3 mt-5">
          <h1 className="font-semibold text-xl">Service Event</h1>
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
              Add Event
            </button>
          </div>
        </div>
        <div className="overflow-y-scroll scrollbar-thin mt-7 scrollbar-thumb-gray-400 scrollbar-thumb-rounded-lg scrollbar-track-gray-100 h-full w-full">
          <table className="w-full text-sm  text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
              <tr>
                {serviceEventTitle.map((item) => (
                  <th
                    key={item.id}
                    scope="col"
                    className={`px-6 py-3 ${item.width}`}
                  >
                    {item.title}
                  </th>
                ))}
                <th scope="col" className="px-6 py-3 w-2/12">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {serviceEvents && serviceEvents.length > 0 ? (
                serviceEvents.map((item) => (
                  <tr
                    key={item.SERVICE_EVENT_CD}
                    className="odd:bg-white even:bg-gray-50  border-b "
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.SERVICE_EVENT_CD}
                    </th>
                    <td className="px-6 py-4 capitalize">
                      {item.SERVICE_EVENT_DESC.toLowerCase()}
                    </td>
                    <td
                      className={`px-6 py-4 ${
                        item.SERVICE_EVENT_DESC_NEP
                          ? " font-[Preeti]"
                          : "font-sans"
                      } text-lg`}
                    >
                      {item.SERVICE_EVENT_DESC_NEP
                        ? item.SERVICE_EVENT_DESC_NEP
                        : "_"}
                    </td>
                    <td className="px-6 py-4">
                      {mapServiceEventType(item.SERVICE_EVENT_TYPE) || "_"}
                    </td>
                    <td className="px-6 py-4">{item.SALARY_ADJUST || "_"}</td>

                    <td className="px-6 py-4">{item.DISABLED}</td>
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
                          onClick={() => handleEdit(item.SERVICE_EVENT_CD)}
                          className="font-medium text-blue-600 cursor-pointer hover:underline"
                        >
                          Edit
                        </p>
                        <p
                          onClick={() => handleDelete(item.SERVICE_EVENT_CD)}
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
        {/* </> */}
        {/* )} */}
      </div>
    </>
  );
}
