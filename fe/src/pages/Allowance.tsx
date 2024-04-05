import { useEffect, useState } from "react";
import { Instance } from "../utils/Instance";
// import { useNavigate } from "react-router-dom";
// import AddEvent from "../modal/AddEvent";
import { useCustomContext } from "../context/DataContext";
// import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import Delete from "../components/modal/Delete";
// import { mapServiceEventType } from "../utils/serviceEventType";
import AddAllowance from "../components/modal/AddAllowance";
import { TAllowance } from "../interfaces/types/allowance.types";
export default function Allowance() {
  const [allowanceDatas, setAllowanceDatas] = useState<TAllowance[]>([]);
  const { setEditID, setIsEdit, setServiceToEdit } = useCustomContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectDeleteId, setSelectDeleteId] = useState("");
  // const navigate = useNavigate();

  // to fetch the allowance datas
  useEffect(() => {
    const getAllowanceDatas = async () => {
      setIsLoading(true);
      try {
        const res = await Instance.get("/v1/allowance");
        console.log("allowance response", res);
        setAllowanceDatas(res.data.allowance);
        setError("");
        console.log("service-events", res);
      } catch (error: any) {
        setError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    getAllowanceDatas();
  }, []);

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
      setEditID(id);
      setIsEdit(true);
      console.log("updateAllowance clicked", updateAllowance);
      if (updateAllowance) {
        setServiceToEdit(updateAllowance);
        // navigate("/service-event/create");
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log(error);
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

  return (
    <>
      <div className="relative top-0 bottom-0 h-full shadow-md sm:rounded-lg w-full">
        {isLoading ? (
          <div className="min-h-screen flex items-center justify-center w-full">
            <Loader color="text-blue-800" width="w-6" height="h-6" />
          </div>
        ) : (
          <>
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
              />
            )}
            <div className="flex justify-between p-3">
              <h1 className="font-semibold text-xl">Allowance</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-500 text-white w-24 py-1 rounded-lg font-semibold"
                type="button"
              >
                Add
              </button>
            </div>
            {/* <div className="h-full w-full bg-red-700"> */}
            <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-lg scrollbar-track-gray-100 h-full">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-fixed">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                  <tr>
                    <th scope="col" className="px-6 py-3 w-1/12">
                      Code
                    </th>
                    <th scope="col" className="px-6 py-3 w-2/12">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/12 ">
                      Description (IN NEPALI)
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/12">
                      Taxable
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/12">
                      Facility(%)
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/12 text-center">
                      Deduct CIT
                    </th>
                    <th scope="col" className="px-6 py-3 ">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/12">
                      Salary + Allowance Flag
                    </th>
                    <th scope="col" className="px-6 py-3 w-1/12">
                      A/C
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Disabled
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {allowanceDatas &&
                    allowanceDatas.length > 0 &&
                    allowanceDatas.map((item) => (
                      <tr
                        key={item.allowance_CD}
                        className="odd:bg-white even:bg-gray-50  border-b "
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          {item.allowance_CD}
                        </th>
                        <td className="px-6 py-4">
                          {item.allowance_description}
                        </td>
                        <td className="px-6 py-4 font-[Preeti] text-lg">
                          {item.allowance_nepali_desc
                            ? item.allowance_nepali_desc
                            : "_"}
                        </td>
                        <td className="px-6 py-4">{item.allowance_taxable}</td>
                        {/* <td className="px-6 py-4">{item.allowance_facility}</td> */}
                        <td className="px-6 py-4">
                          {item.allowance_facility_percent
                            ? item.allowance_facility_percent
                            : "_"}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {item.allowance_cit_flag
                            ? item.allowance_cit_flag
                            : "_"}
                        </td>
                        <td className="px-6 py-4">{item.allowance_type}</td>
                        <td className="px-6 py-4">
                          {item.salary_allowance_flag}
                        </td>
                        <td className="px-6 py-4">
                          {item.allowance_acc_cd ? item.allowance_acc_cd : "_"}
                        </td>
                        <td className="px-6 py-4">{item.allowance_disabled}</td>
                        <td className="px-6 py-4">
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
                    ))}
                </tbody>
              </table>
            </div>
            {/* </div> */}
          </>
        )}
      </div>
    </>
  );
}
