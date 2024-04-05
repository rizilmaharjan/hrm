import { useState, useEffect } from "react";
import { Instance } from "../utils/Instance";
import { useCustomContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

// type ServiceEvent = {
//   SERVICE_EVENT_CD: string;
//   SERVICE_EVENT_DESC: string;
//   SERVICE_EVENT_DESC_NEP: string | null;
//   DISABLED: string;
//   ENTERED_BY: string;
//   ENTERED_DT: string;
//   SERVICE_EVENT_TYPE: string;
//   IS_AUTO_SALARY_ADJUST: string;
//   LAST_UPDATED_BY: string | null;
//   LAST_UPDATED_ON: string | null;
// };
export default function Service() {
  const {
    serviceToEdit,
    isEdit,
    editID,
    setServiceToEdit,
    setEditID,
    setIsEdit,
  } = useCustomContext();
  const navigate = useNavigate();
  const [serviceDesc, setServiceDesc] = useState({
    service_Event_CD: serviceToEdit?.SERVICE_EVENT_CD || "",
    service_Event_Description: serviceToEdit?.SERVICE_EVENT_DESC || "",
    service_Event_Nepali: serviceToEdit?.SERVICE_EVENT_DESC_NEP || "",
    disabled: serviceToEdit?.DISABLED || "N",
    entered_By: serviceToEdit?.ENTERED_BY || "",
    entered_Dt: serviceToEdit?.ENTERED_DT || "",
    event_type: serviceToEdit?.SERVICE_EVENT_TYPE || "",
    salaryAdjust: serviceToEdit?.IS_AUTO_SALARY_ADJUST || "N",
    updated_by: serviceToEdit?.LAST_UPDATED_BY || "",
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    const newValue = type === "checkbox" ? checked : value;
    const processedValue =
      name === "disabled" || name === "salaryAdjust"
        ? checked
          ? "Y"
          : "N"
        : newValue;
    setServiceDesc((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
    if (name === "disabled" && type === "checkbox") {
      localStorage.setItem("checkboxValue", newValue.toString());
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!isEdit) {
        const res = await Instance.post("/v1/service-event", serviceDesc);
      } else {
        const res = await Instance.put(
          `/v1/service-event/${editID}`,
          serviceDesc
        );
        setServiceToEdit(null);
        setIsEdit(false);
        setEditID("");
      }

      setServiceDesc((prev) => ({
        ...prev,
        service_Event_CD: "",
        service_Event_Description: "",
        service_Event_Nepali: "",
        disabled: "N",
        entered_By: "",
        entered_Dt: "",
        event_type: "",
        salaryAdjust: "N",
        updated_by: "",
      }));
      navigate("/service-events");
    } catch (error: any) {
      console.log("this is error", error);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-14">
        <form onSubmit={handleSubmit}>
          {!isEdit && (
            <div className="mb-5">
              <input
                type="text"
                id="serviceEventCD"
                name="service_Event_CD"
                value={serviceDesc.service_Event_CD}
                onChange={handleChange}
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Service Event CD"
              />
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <textarea
              id="service_Event_Description"
              name="service_Event_Description"
              onChange={handleChange}
              value={serviceDesc.service_Event_Description}
              rows={4}
              className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Description..."
            ></textarea>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <textarea
              id="service_Event_Nepali"
              name="service_Event_Nepali"
              onChange={handleChange}
              value={serviceDesc.service_Event_Nepali}
              rows={4}
              className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Description In Nepali..."
            ></textarea>
          </div>
          <div className="flex items-center mb-5">
            <input
              id="checkbox"
              type="checkbox"
              name="disabled"
              checked={serviceDesc.disabled === "Y"}
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
          <div className="relative z-0 w-full mb-5 group">
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
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="event_type"
              name="event_type"
              value={serviceDesc.event_type}
              onChange={handleChange}
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Event Type"
            />
          </div>
          <div className="flex items-center mb-5">
            <input
              id="checkbox"
              type="checkbox"
              name="salaryAdjust"
              checked={serviceDesc.salaryAdjust === "Y"}
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
          <div className="relative z-0 w-full mb-5 group">
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
          </div>
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
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </Button>
          {/* <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button> */}
        </form>
      </div>
    </>
  );
}
