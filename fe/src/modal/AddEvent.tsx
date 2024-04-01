import { useCustomContext } from "../context/DataContext";
import { useEffect, useState } from "react";
import { Instance } from "../config/Instance";
import toast from "react-hot-toast";
import { ServiceEvent } from "../pages/ServiceEvent";
import { RxCross2 } from "react-icons/rx";
import Button from "../components/ui/Button";

type TProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setServiceEvents: React.Dispatch<React.SetStateAction<ServiceEvent[]>>;
};
export default function AddEvent({ setIsModalOpen, setServiceEvents }: TProps) {
  const {
    serviceToEdit,
    isEdit,
    editID,
    setServiceToEdit,
    setEditID,
    setIsEdit,
  } = useCustomContext();
  const [serviceDesc, setServiceDesc] = useState({
    SERVICE_EVENT_CD: serviceToEdit?.SERVICE_EVENT_CD || "",
    SERVICE_EVENT_DESC: serviceToEdit?.SERVICE_EVENT_DESC || "",
    SERVICE_EVENT_DESC_NEP: serviceToEdit?.SERVICE_EVENT_DESC_NEP || "",
    DISABLED: serviceToEdit?.DISABLED || "N",
    // entered_By: serviceToEdit?.ENTERED_BY || "",
    // entered_Dt: serviceToEdit?.ENTERED_DT || "",
    SERVICE_EVENT_TYPE: serviceToEdit?.SERVICE_EVENT_TYPE || "N",
    SALARY_ADJUST: serviceToEdit?.IS_AUTO_SALARY_ADJUST || "N",
    // updated_by: serviceToEdit?.LAST_UPDATED_BY || "",
    // updated_on: serviceToEdit.LAST_UPDATED_ON || "",
  });

  useEffect(() => {
    const checkboxValue = localStorage.getItem("checkboxValue");
    if (checkboxValue === "true") {
      setServiceDesc((prev) => ({
        ...prev,
        disabled: "Y",
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const newValue =
      type === "checkbox" ? (checked ? "Y" : "N") : e.target.value;
    setServiceDesc((prev) => ({
      ...prev,
      [name]: newValue,
    }));
    if (name === "DISABLED" && type === "checkbox") {
      localStorage.setItem("checkboxValue", newValue);
    }
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setServiceDesc((prev) => ({
      ...prev,
      [name]: value, // Update the SERVICE_EVENT_TYPE property
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!isEdit) {
        const res = await Instance.post("/v1/service-event", serviceDesc);
        setServiceEvents((prev) => {
          if (!prev) {
            return [res.data.data];
          } else {
            return [...prev, res.data.data];
          }
        });
        toast.success("Event Added Successfully");
      } else {
        const res = await Instance.put(
          `/v1/service-event/${editID}`,
          serviceDesc
        );
        setServiceEvents((prev) => {
          if (!prev) return [];
          return prev.map((item) => {
            if (item.SERVICE_EVENT_CD === editID) {
              console.log("this is item", serviceDesc);
              return { ...item, ...serviceDesc };
            }
            return item;
          });
        });

        setServiceToEdit(null);
        setIsEdit(false);
        setEditID("");
      }

      setServiceDesc((prev) => ({
        ...prev,
        SERVICE_EVENT_CD: "",
        SERVICE_EVENT_DESC: "",
        SERVICE_EVENT_DESC_NEP: "",
        DISABLED: "N",
        SERVICE_EVENT_TYPE: "",
      }));
      setIsModalOpen(false);
    } catch (error: any) {
      console.log("this is error", error);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center fixed inset-0 w-full bg-black/60">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-[28%] p-8 rounded-lg"
        >
          <div className="flex justify-end mb-4">
            <RxCross2
              onClick={() => {
                setIsModalOpen(false);
                setIsEdit(false);
                setServiceToEdit((prev) => {
                  return {
                    ...prev,
                    SERVICE_EVENT_CD: "",
                    SERVICE_EVENT_DESC: "",
                    SERVICE_EVENT_DESC_NEP: "",
                    DISABLED: "N",
                    SERVICE_EVENT_TYPE: "",
                  };
                });
              }}
              className="cursor-pointer"
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="SERVICE_EVENT_CD"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Event CD
            </label>
            <input
              id="SERVICE_EVENT_CD"
              name="SERVICE_EVENT_CD"
              onChange={handleChange}
              value={serviceDesc.SERVICE_EVENT_CD}
              className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="SERVICE_EVENT_DESC"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <input
              id="SERVICE_EVENT_DESC"
              name="SERVICE_EVENT_DESC"
              onChange={handleChange}
              value={serviceDesc.SERVICE_EVENT_DESC}
              className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Description..."
            />
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="SERVICE_EVENT_DESC_NEP"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Description (In Nepali)
            </label>

            <input
              id="SERVICE_EVENT_DESC_NEP"
              name="SERVICE_EVENT_DESC_NEP"
              onChange={handleChange}
              value={serviceDesc.SERVICE_EVENT_DESC_NEP}
              className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Description In Nepali..."
            />
          </div>
          <div className="flex items-center mb-5">
            <input
              id="checkbox"
              type="checkbox"
              name="DISABLED"
              checked={serviceDesc.DISABLED === "Y"}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
            />
            <label
              htmlFor="checkbox"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              Disable
            </label>
          </div>
          {/* <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="entered_By"
              name="entered_By"
              value={serviceDesc.entered_By}
              onChange={handleChange}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Entered By"
            />
          </div> */}
          {/* <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="SERVICE_EVENT_TYPE"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Event Type
            </label>

            <input
              type="text"
              id="SERVICE_EVENT_TYPE"
              name="SERVICE_EVENT_TYPE"
              value={serviceDesc.SERVICE_EVENT_TYPE}
              onChange={handleChange}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Event Type"
            />
          </div> */}

          <label
            htmlFor="SERVICE_EVENT_TYPE"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Service Event Type
          </label>
          <select
            id="SERVICE_EVENT_TYPE"
            name="SERVICE_EVENT_TYPE"
            value={serviceDesc.SERVICE_EVENT_TYPE}
            onChange={handleChangeSelect}
            className="bg-gray-50 border border-gray-300 text-gray-900 mb-5 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="N">Normal</option>
            <option value="P">Promotion</option>
            <option value="T">Transfer</option>
            <option value="A">Appoinment</option>
          </select>

          <div className="flex items-center mb-5">
            <input
              id="checkbox"
              type="checkbox"
              name="SALARY_ADJUST"
              checked={serviceDesc.SALARY_ADJUST === "Y"}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
            />
            <label
              htmlFor="checkbox"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              Salary Adjust
            </label>
          </div>
          {/* <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="updated_by"
              name="updated_by"
              value={serviceDesc.updated_by}
              onChange={handleChange}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Updated By"
            />
          </div> */}
          {/* <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="updated_on"
              name="updated_on"
              value={serviceDesc.updated_on}
              onChange={handleChange}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Updated On"
            />
          </div> */}

          <Button
            type="submit"
            className={`text-white ${
              isEdit ? "bg-green-500" : "bg-blue-700"
            }  ${
              isEdit ? "hover:bg-green-600" : "hover:bg-blue-800"
            }  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center`}
          >
            {isEdit ? "Edit" : "Submit"}
          </Button>
        </form>
      </div>
    </>
  );
}
