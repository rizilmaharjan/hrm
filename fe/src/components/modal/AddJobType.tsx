import { RefObject, useEffect, useState } from "react";
import { Instance } from "../../utils/Instance";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Button from "../ui/Button";
import { TJobType } from "../../interfaces/types/jobType.type";
import { forwardRef } from "react";
import { getErrorMessage } from "../utils/handleErrors";

type TProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setJobType: React.Dispatch<React.SetStateAction<TJobType[]>>;
  jobTypeToEdit: TJobType | undefined;
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setJobTypeToEdit: React.Dispatch<React.SetStateAction<TJobType | undefined>>;
  closeJobModalRef: RefObject<HTMLDivElement>;
};
const AddJobType = forwardRef<HTMLDivElement, TProps>(
  (
    {
      setIsModalOpen,
      setJobType,
      jobTypeToEdit,
      isEdit,
      setIsEdit,
      setJobTypeToEdit,
      closeJobModalRef,
    }: TProps,
    ref
  ) => {
    const [jobTypeDesc, setJobTypeDesc] = useState({
      job_type_cd: "",
      job_type_desc: "",
      tax: "Y",
      tax_percent: "",
      pf_allowed: "N",
      cit: "N",
      pay_generate: "N",
      grade_allowed: "N",
      single_rebate: "",
      married_rebate: "",
      disabled: "N",
    });
    useEffect(() => {
      // Update userInfo when editedData changes
      if (jobTypeToEdit) {
        setJobTypeDesc(jobTypeToEdit);
      }
    }, [jobTypeToEdit]);

    useEffect(() => {
      const checkboxValue = localStorage.getItem("checkboxValue");
      if (checkboxValue === "true") {
        setJobTypeDesc((prev) => ({
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
      setJobTypeDesc((prev) => ({
        ...prev,
        [name]: newValue,
      }));
      if (name === "DISABLED" && type === "checkbox") {
        localStorage.setItem("checkboxValue", newValue);
      }
    };

    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      setJobTypeDesc((prev) => ({
        ...prev,
        [name]: value, // Update the SERVICE_EVENT_TYPE property
      }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if (!isEdit) {
          const res = await Instance.post("/v1/job-type", jobTypeDesc);
          console.log(res);
          if (res.status === 201) {
            toast.success(res.data.message);
            setJobType((prev) => {
              if (!prev) {
                return [res.data.data];
              } else {
                return [...prev, jobTypeDesc];
              }
            });
          }
        } else {
          const res = await Instance.put(
            `/v1/job-type/${jobTypeDesc.job_type_cd}`,
            jobTypeDesc
          );
          if (res.status === 200) {
            toast.success(res.data.message);
            setJobType((prev) => {
              if (!prev) return [];
              return prev.map((item) => {
                if (item.job_type_cd === jobTypeDesc.job_type_cd) {
                  return { ...item, ...jobTypeDesc };
                }
                return item;
              });
            });
          }
          setIsEdit(false);
        }

        setJobTypeToEdit((prev) => {
          if (prev) {
            return {
              ...prev,
              job_type_cd: "",
              job_type_desc: "",
              tax: "Y",
              tax_percent: "",
              pf_allowed: "N",
              cit: "N",
              pay_generate: "N",
              grade_allowed: "N",
              single_rebate: "",
              married_rebate: "",
              disabled: "N",
            };
          }
        });

  setIsModalOpen(false);
      } catch (error: any) {
        console.log("this is error", error);
      }
    };
    return (
      <>
        <div
          ref={ref}
          className="flex z-20 items-center justify-center fixed inset-0 w-full bg-black/60"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white max-w-[30rem] p-8 rounded-lg"
          >
            <div className="flex justify-end mb-4">
              <RxCross2
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEdit(false);
                  setJobTypeToEdit((prev) => {
                    if (prev) {
                      return {
                        ...prev,
                        job_type_cd: "",
                        job_type_desc: "",
                        tax: "Y",
                        tax_percent: "",
                        pf_allowed: "N",
                        cit: "N",
                        pay_generate: "N",
                        grade_allowed: "N",
                        single_rebate: "",
                        married_rebate: "",
                        disabled: "N",
                      };
                    }
                  });
                }}
                className="cursor-pointer"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="relative z-0 w-full mb-5 group col-start-1 ">
                <label
                  htmlFor="job_type_cd"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Code
                </label>
                <input
                  disabled={isEdit}
                  id="job_type_cd"
                  name="job_type_cd"
                  onChange={handleChange}
                  value={jobTypeDesc.job_type_cd}
                  className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Code"
                  required
                />
              </div>
              <div className="relative z-0 w-full mb-5 group col-start-2 col-span-4">
                <label
                  htmlFor="job_type_desc"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <input
                  id="job_type_desc"
                  name="job_type_desc"
                  onChange={handleChange}
                  value={jobTypeDesc.job_type_desc}
                  className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Description..."
                  required
                />
              </div>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="tax"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Tax Applicable?
              </label>
              <select
                id="tax"
                name="tax"
                value={jobTypeDesc.tax}
                onChange={handleChangeSelect}
                className="bg-gray-50 border border-gray-300 text-gray-900 mb-5 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="Y">Yes(Slab)</option>
                <option value="F">Yes(Flat)</option>
                <option value="N">No</option>
              </select>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="tax_percent"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Flat %
              </label>
              <input
                id="tax_percent"
                name="tax_percent"
                onChange={handleChange}
                value={jobTypeDesc.tax_percent}
                className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                //   placeholder="Description In Nepali..."
              />
            </div>
            <div className="grid grid-cols-2">
              <div className="flex items-center mb-5">
                <input
                  id="pf_allowed"
                  type="checkbox"
                  name="pf_allowed"
                  checked={jobTypeDesc.pf_allowed === "Y"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                />
                <label
                  htmlFor="pf_allowed"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  PF
                </label>
              </div>
              <div className="flex items-center mb-5">
                <input
                  id="cit"
                  type="checkbox"
                  name="cit"
                  checked={jobTypeDesc.cit === "Y"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                />
                <label
                  htmlFor="cit"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  CIT
                </label>
              </div>
              <div className="flex items-center mb-5">
                <input
                  id="pay_generate"
                  type="checkbox"
                  name="pay_generate"
                  checked={jobTypeDesc.pay_generate === "Y"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                />
                <label
                  htmlFor="pay_generate"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  Pay Gen
                </label>
              </div>
              <div className="flex items-center mb-5">
                <input
                  id="grade_allowed"
                  type="checkbox"
                  name="grade_allowed"
                  checked={jobTypeDesc.grade_allowed === "Y"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                />
                <label
                  htmlFor="grade_allowed"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  Is Grade
                </label>
              </div>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="single_rebate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Single Rebate
              </label>
              <input
                id="single_rebate"
                name="single_rebate"
                onChange={handleChange}
                value={jobTypeDesc.single_rebate}
                className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                //   placeholder="Description..."
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="married_rebate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Married Rebate
              </label>
              <input
                id="married_rebate"
                name="married_rebate"
                onChange={handleChange}
                value={jobTypeDesc.married_rebate}
                className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                //   placeholder="Description..."
              />
            </div>
            <div className="flex items-center mb-5">
              <input
                id="disabled"
                type="checkbox"
                name="disabled"
                checked={jobTypeDesc.disabled === "Y"}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
              />
              <label
                htmlFor="disabled"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Disable
              </label>
            </div>

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
);

export default AddJobType;
