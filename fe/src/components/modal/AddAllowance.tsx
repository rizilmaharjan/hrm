import { useCustomContext } from "../../context/DataContext";
import { useEffect, useState } from "react";
import { Instance } from "../../utils/Instance";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Button from "../ui/Button";
import { TAllowance } from "../../interfaces/types/allowance.types";
import AccountList from "./AccountList";
import { getErrorMessage } from "../utils/handleErrors";


type TProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAllowanceDatas: React.Dispatch<React.SetStateAction<TAllowance[]>>;
};
export default function AddAllowance({
  setIsModalOpen,
  setAllowanceDatas,
}: TProps) {
  const {
    serviceToEdit,
    isEdit,
    editID,
    setServiceToEdit,
    setEditID,
    setIsEdit,
  } = useCustomContext();
  const [serviceDesc, setServiceDesc] = useState({
    allowance_CD: serviceToEdit?.allowance_CD || "",
    allowance_facility: serviceToEdit?.allowance_facility || "",
    allowance_description: serviceToEdit?.allowance_description || "",
    allowance_nepali_desc: serviceToEdit?.allowance_nepali_desc || "",
    allowance_taxable: serviceToEdit?.allowance_taxable || "N",
    allowance_facility_percent: serviceToEdit?.allowance_facility_percent || "",
    allowance_cit: serviceToEdit?.allowance_cit_flag || "N",
    allowance_type: serviceToEdit?.allowance_type || "A",
    salary_allowance_flag: serviceToEdit?.salary_allowance_flag || "N",
    allowance_acc: serviceToEdit?.allowance_acc_cd || "",
    allowance_disabled: serviceToEdit?.allowance_disabled || "N",
    // entered_By: serviceToEdit?.ENTERED_BY || "",
    // entered_Dt: serviceToEdit?.ENTERED_DT || "",
    // SERVICE_EVENT_TYPE: serviceToEdit?.SERVICE_EVENT_TYPE || "N",
    // SALARY_ADJUST: serviceToEdit?.IS_AUTO_SALARY_ADJUST || "N",
    // updated_by: serviceToEdit?.LAST_UPDATED_BY || "",
    // updated_on: serviceToEdit.LAST_UPDATED_ON || "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string>("");

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
        const res = await Instance.post("/v1/allowance", serviceDesc);
        setAllowanceDatas((prev) => {
          if (!prev) {
            return [res.data.data];
          } else {
            return [...prev, res.data.data];
          }
        });
        toast.success(res.data.message);
      } else {
        const res = await Instance.put(`/v1/allowance/${editID}`, serviceDesc);
        setAllowanceDatas((prev) => {
          if (!prev) return [];
          return prev.map((item) => {
            if (item.allowance_CD === editID) {
              console.log("this is item", serviceDesc);
              return { ...item, ...serviceDesc };
            }
            return item;
          });
        });
        toast.success(res.data.message);

        setServiceToEdit(null);
        setIsEdit(false);
        setEditID("");
      }

      setServiceDesc((prev) => ({
        ...prev,
        allowance_CD: "",
        allowance_facility: "",
        allowance_description: "",
        allowance_nepali_desc: "",
        allowance_taxable: "N",
        allowance_facility_percent: "",
        allowance_cit: "N",
        allowance_type: "A",
        salary_allowance_flag: "N",
        allowance_acc: "",
        allowance_disabled: "N",
      }));
      setIsModalOpen(false);
    } catch (error: any) {
      const errMsg = getErrorMessage(error);
      toast.error(errMsg);
    }
  };

  const handleDoubleClick = () => {
    setIsOpen(true);
  };

  const handleAccountSelect = (account: string) => {
    setSelectedAccount(account);
    setServiceDesc((prev) => ({
      ...prev,
      allowance_acc: account,
    }));
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex z-20 items-center justify-center fixed inset-0 w-full bg-black/60">
        <form onSubmit={handleSubmit} className="bg-white w-1/3 p-8 rounded-lg">
          <div className="flex justify-between mb-6">
            <h1 className="text-lg font-semibold">Add Allowance</h1>
            <RxCross2
              onClick={() => {
                setIsModalOpen(false);
                setIsEdit(false);
                setServiceToEdit((prev: any) => {
                  return {
                    ...prev,
                    allowance_CD: "",
                    allowance_description: "",
                    allowance_nepali_desc: "",
                    allowance_taxable: "N",
                    allowance_facility_percent: "",
                    allowance_facility: "",
                    allowance_cit: "",
                    allowance_type: "",
                    salary_allowance_flag: "N",
                    allowance_acc_cd: "",
                    allowance_disabled: "",
                  };
                });
              }}
              className="cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="relative z-0 w-1/4 mb-5 group">
              <label
                htmlFor="allowance_CD"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Code
              </label>
              <input
                disabled={isEdit}
                id="allowance_CD"
                name="allowance_CD"
                onChange={handleChange}
                value={serviceDesc.allowance_CD}
                className={`block p-2.5 w-full ${
                  isEdit ? "opacity-50" : ""
                } text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="allowance_CD"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Allowance Facility
              </label>
              <input
                id="allowance_CD"
                name="allowance_facility"
                onChange={handleChange}
                value={serviceDesc.allowance_facility}
                className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* descriptions */}
          <div className="flex items-center gap-4">
            <div className="relative z-0 w-1/2 mb-5 group">
              <label
                htmlFor="allowance_description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <input
                id="allowance_description"
                name="allowance_description"
                onChange={handleChange}
                value={serviceDesc.allowance_description}
                className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Description..."
              />
            </div>

            <div className="relative z-0 w-1/2 mb-5 group">
              <label
                htmlFor="allowance_nepali_desc"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Description (In Nepali)
              </label>

              <input
                id="allowance_nepali_desc"
                name="allowance_nepali_desc"
                onChange={handleChange}
                value={serviceDesc.allowance_nepali_desc}
                className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Description In Nepali..."
              />
            </div>
          </div>

          {/* dropdowns */}

          <div className="flex items-center justify-around gap-4">
            <div className="flex flex-col justify-center w-1/2 mb-5">
              <label
                htmlFor="allowance_taxable"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Taxable
              </label>
              <select
                id="allowance_taxable"
                name="allowance_taxable"
                value={serviceDesc.allowance_taxable}
                onChange={handleChangeSelect}
                className="bg-gray-50 border border-gray-300 text-gray-900 mb-5 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="Y">Yes</option>
                <option value="N">No</option>
              </select>
            </div>

            <div className="flex flex-col justify-center w-1/2 mb-5">
              <label
                htmlFor="allowance_type"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Type
              </label>
              <select
                id="allowance_type"
                name="allowance_type"
                value={serviceDesc.allowance_type}
                onChange={handleChangeSelect}
                className="bg-gray-50 border border-gray-300 text-gray-900 mb-5 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="A">Anually</option>
                <option value="M">Monthly</option>
              </select>
            </div>
          </div>

          {/* checkboxes */}

          <div className="flex justify-around items-center">
            <div className="flex items-center w-1/2 mb-5">
              <input
                id="allowance_cit"
                type="checkbox"
                name="allowance_cit"
                checked={serviceDesc.allowance_cit === "Y"}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
              />
              <label
                htmlFor="allowance_cit"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Deduct CIT
              </label>
            </div>
            <div className="flex items-center w-1/2 mb-5">
              <input
                id="salary_allowance_flag"
                type="checkbox"
                name="salary_allowance_flag"
                checked={serviceDesc.salary_allowance_flag === "Y"}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
              />
              <label
                htmlFor="salary_allowance_flag"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Salary Allowance Flag
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="allowance_facility_percent"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Facility(%)
            </label>
            <input
              id="allowance_facility_percent"
              name="allowance_facility_percent"
              onChange={handleChange}
              value={serviceDesc.allowance_facility_percent}
              className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="allowance_acc"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              ACC_CD
            </label>
            <input
              id="allowance_acc"
              name="allowance_acc"
              onChange={handleChange}
              value={serviceDesc.allowance_acc}
              onDoubleClick={handleDoubleClick}
              className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center mb-5">
            <input
              id="allowance_disabled"
              type="checkbox"
              name="allowance_disabled"
              checked={serviceDesc.allowance_disabled === "Y"}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
            />
            <label
              htmlFor="allowance_disabled"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              Disabled
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

          {/* <label
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
          </div> */}
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
        <AccountList
          isOpen={isOpen}
          handleAccountSelect={handleAccountSelect}
        />
      </div>
    </>
  );
}
