import { useCustomContext } from "../../context/DataContext";
import { RefObject, useEffect, useRef, useState } from "react";
import { Instance } from "../../utils/Instance";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import Button from "../ui/Button";
import { TAllowance } from "../../interfaces/types/allowance.types";
import AccountList from "./AccountList";
import { allowanceSchema } from "../../validations/allowance.schema";

import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type TProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAllowanceDatas: React.Dispatch<React.SetStateAction<TAllowance[]>>;
  isModalOpen: boolean;
};
export default function AddAllowance({
  setIsModalOpen,
  isModalOpen,
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
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TAllowance>({
    resolver: zodResolver(allowanceSchema),
  });
  const [citVal, setCitVal] = useState(false);
  const [salaryAllowanceFlag, setSalaryALlowanceFlag] = useState(false);
  const [disabledVal, setDisabledVal] = useState(false);

  // const [isOpen, setIsOpen] = useState(false);
  // const [selectedAccount, setSelectedAccount] = useState<string>("");

  const modalRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: any) => {
      if (!modalRef.current?.contains(e.target)) {
        setIsModalOpen(false);

        setServiceToEdit((prev: any) => {
          return {
            ...prev,
            allowance_CD: "",
            allowance_description: "",
            allowance_nepali_desc: "",
            allowance_taxable: "N",
            allowance_facility_percent: "",
            allowance_facility: "",
            allowance_cit_flag: false,
            allowance_type: "",
            salary_allowance_flag: false,
            allowance_acc_cd: "",
            allowance_disabled: false,
          };
        });
        if (isEdit) {
          setIsEdit(false);
        }
        console.log("i am inside the if block");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [setIsModalOpen, setServiceToEdit]);

  //   const checkboxValue = localStorage.getItem("checkboxValue");
  //   if (checkboxValue === "true") {
  //     setServiceDesc((prev) => ({
  //       ...prev,
  //       disabled: "Y",
  //     }));
  //   }
  // }, []);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, type } = e.target;
  //   const checked = (e.target as HTMLInputElement).checked;
  //   const newValue =
  //     type === "checkbox" ? (checked ? "Y" : "N") : e.target.value;
  //   setServiceDesc((prev) => ({
  //     ...prev,
  //     [name]: newValue,
  //   }));
  //   if (name === "DISABLED" && type === "checkbox") {
  //     localStorage.setItem("checkboxValue", newValue);
  //   }
  // };

  // const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setServiceDesc((prev) => ({
  //     ...prev,
  //     [name]: value, // Update the SERVICE_EVENT_TYPE property
  //   }));
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   allowanceSchema.parse(serviceDesc);
  //   try {
  //     if (!isEdit) {
  //       const res = await Instance.post("/v1/allowance", serviceDesc);
  //       setAllowanceDatas((prev) => {
  //         if (!prev) {
  //           return [res.data.data];
  //         } else {
  //           return [...prev, res.data.data];
  //         }
  //       });
  //       toast.success(res.data.message);
  //     } else {
  //       const res = await Instance.put(`/v1/allowance/${editID}`, serviceDesc);
  //       setAllowanceDatas((prev) => {
  //         if (!prev) return [];
  //         return prev.map((item) => {
  //           if (item.allowance_CD === editID) {
  //             console.log("this is item", serviceDesc);
  //             return { ...item, ...serviceDesc };
  //           }
  //           return item;
  //         });
  //       });
  //       toast.success(res.data.message);

  //       setServiceToEdit(null);
  //       setIsEdit(false);
  //       setEditID("");
  //     }

  //     setServiceDesc((prev) => ({
  //       ...prev,
  //       allowance_CD: "",
  //       allowance_facility: "",
  //       allowance_description: "",
  //       allowance_nepali_desc: "",
  //       allowance_taxable: "N",
  //       allowance_facility_percent: "",
  //       allowance_cit: "N",
  //       allowance_type: "A",
  //       salary_allowance_flag: "N",
  //       allowance_acc: "",
  //       allowance_disabled: "N",
  //     }));
  //     setIsModalOpen(false);
  //   } catch (error: any) {
  //     toast.error(error);
  //   }
  // };

  // const handleDoubleClick = () => {
  //   setIsOpen(true);
  // };

  // const handleAccountSelect = (account: string) => {
  //   setSelectedAccount(account);
  //   setServiceDesc((prev) => ({
  //     ...prev,
  //     allowance_acc: account,
  //   }));
  //   setIsOpen(false);
  // };

  useEffect(() => {
    const defaultValues: any = {};
    defaultValues.allowance_CD = serviceToEdit?.allowance_CD || "";
    defaultValues.allowance_description =
      serviceToEdit?.allowance_description || "";
    defaultValues.allowance_nepali_desc =
      serviceToEdit?.allowance_nepali_desc || "";
    defaultValues.allowance_taxable = serviceToEdit?.allowance_taxable || "N";
    defaultValues.allowance_facility = serviceToEdit?.allowance_facility || "";
    defaultValues.allowance_facility_percent =
      serviceToEdit?.allowance_facility_percent || "";
    defaultValues.allowance_cit_flag =
      serviceToEdit?.allowance_cit_flag === "Y" ? true : false;
    defaultValues.allowance_type = serviceToEdit?.allowance_type || "A";
    defaultValues.salary_allowance_flag =
      serviceToEdit?.salary_allowance_flag === "Y" ? true : false;
    defaultValues.allowance_acc_cd = serviceToEdit?.allowance_acc_cd || "";
    defaultValues.allowance_disabled =
      serviceToEdit?.allowance_disabled === "Y" ? true : false;

    reset({ ...defaultValues });
  }, [reset, serviceToEdit]);

  useEffect(() => {
    if (isEdit && serviceToEdit?.allowance_disabled === "Y") {
      setDisabledVal(true);
    } else {
      setDisabledVal(false);
    }
    if (isEdit && serviceToEdit?.salary_allowance_flag === "Y") {
      setSalaryALlowanceFlag(true);
    } else {
      setSalaryALlowanceFlag(false);
    }

    if (isEdit && serviceToEdit?.allowance_cit_flag === "Y") {
      setCitVal(true);
    } else {
      setCitVal(false);
    }
  }, [isEdit, serviceToEdit]);
  const onSubmit = async (data: any) => {
    // console.log("these are the allowances datas", data);
    const allowanceDatas = {
      ...data,
      allowance_CD: data.allowance_CD.toUpperCase(),
      allowance_cit_flag: data.allowance_cit_flag ? "Y" : "N",
      allowance_disabled: data.allowance_disabled ? "Y" : "N",
      salary_allowance_flag: data.salary_allowance_flag ? "Y" : "N",
    };
    try {
      if (!isEdit) {
        const res = await Instance.post("/v1/allowance", allowanceDatas);
        console.log("allowance datas response", res);
        setAllowanceDatas((prev) => {
          if (!prev) {
            return [res.data.data];
          } else {
            return [...prev, res.data.data];
          }
        });
        toast.success(res.data.message);
      } else {
        const res = await Instance.put(
          `/v1/allowance/${editID}`,
          allowanceDatas
        );
        console.log("allowance edit datas response", res);
        setAllowanceDatas((prev) => {
          if (!prev) return [];
          return prev.map((item) => {
            if (item.allowance_CD === editID) {
              return { ...item, ...allowanceDatas };
            }
            return item;
          });
        });
        toast.success(res.data.message);
        setIsEdit(false);
        setEditID("");
        setServiceToEdit((prev: any) => {
          return {
            ...prev,
            allowance_CD: "",
            allowance_description: "",
            allowance_nepali_desc: "",
            allowance_taxable: "N",
            allowance_facility_percent: "",
            allowance_facility: "",
            allowance_cit_flag: false,
            allowance_type: "",
            salary_allowance_flag: false,
            allowance_acc_cd: "",
            allowance_disabled: false,
          };
        });
      }
      reset();
      setCitVal(false);
      setSalaryALlowanceFlag(false);
      setDisabledVal(false);
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error);
      console.log("allowance errors", error);
    }
    console.log(
      "these are the allowances datas after conversion",
      allowanceDatas
    );
  };

  return (
    <>
      <div className="flex z-20 items-center justify-center fixed inset-0 w-full bg-black/60">
        <div ref={modalRef} className="bg-white w-1/3 p-8 rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between mb-6">
              <h1 className="text-lg font-semibold">Add Allowance</h1>
              <RxCross2
                onClick={() => {
                  setIsModalOpen(false);
                  setServiceToEdit((prev: any) => {
                    return {
                      ...prev,
                      allowance_CD: "",
                      allowance_description: "",
                      allowance_nepali_desc: "",
                      allowance_taxable: "N",
                      allowance_facility_percent: "",
                      allowance_facility: "",
                      allowance_cit_flag: false,
                      allowance_type: "",
                      salary_allowance_flag: false,
                      allowance_acc_cd: "",
                      allowance_disabled: false,
                    };
                  });
                  if (isEdit) {
                    setIsEdit(false);
                  }
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
                <Input
                  fieldName="allowance_CD"
                  register={register}
                  errors={errors}
                  type="text"
                  maxLength={3}
                  className={`block p-2.5 w-full ${
                    isEdit ? "opacity-50" : ""
                  } text-sm text-black rounded-lg border uppercase border-gray-300 focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>

              <div className="relative z-0 w-full mb-5 group">
                <label
                  htmlFor="allowance_CD"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Allowance Facility
                </label>
                <Input
                  fieldName="allowance_facility"
                  register={register}
                  errors={errors}
                  type="text"
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
                <Input
                  fieldName="allowance_description"
                  register={register}
                  errors={errors}
                  type="text"
                  className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="relative z-0 w-1/2 mb-5 group">
                <label
                  htmlFor="allowance_nepali_desc"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Description (In Nepali)
                </label>

                <Input
                  fieldName="allowance_nepali_desc"
                  register={register}
                  errors={errors}
                  type="text"
                  className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
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
                  {...register("allowance_taxable")}
                  id="allowance_taxable"
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
                  {...register("allowance_type")}
                  id="allowance_type"
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
                <Input
                  fieldName="allowance_cit_flag"
                  register={register}
                  errors={errors}
                  type="checkbox"
                  checked={citVal}
                  onChange={(e) => {
                    setValue("allowance_cit_flag", e.target.checked);
                    setCitVal(!citVal);
                  }}
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
                <Input
                  fieldName="salary_allowance_flag"
                  register={register}
                  errors={errors}
                  type="checkbox"
                  checked={salaryAllowanceFlag}
                  onChange={(e) => {
                    setValue("salary_allowance_flag", e.target.checked);
                    setSalaryALlowanceFlag(!salaryAllowanceFlag);
                  }}
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
              <Input
                fieldName="allowance_facility_percent"
                register={register}
                errors={errors}
                setValueAs={(v) => (v === "" ? "" : parseInt(v, 10))}
                type="text"
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
              <Input
                fieldName="allowance_acc_cd"
                register={register}
                errors={errors}
                type="text"
                className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center mb-5">
              <Input
                fieldName="allowance_disabled"
                type="checkbox"
                register={register}
                errors={errors}
                checked={disabledVal}
                onChange={(e) => {
                  setValue("allowance_disabled", e.target.checked);
                  setDisabledVal(!disabledVal);
                }}
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
        </div>

        {/* <AccountList
          isOpen={isOpen}
          handleAccountSelect={handleAccountSelect}
        /> */}
      </div>
    </>
  );
}
