import { RefObject, useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Button from "../ui/Button";
import { TJobType } from "../../interfaces/types/jobType.type";
import { jobTypeSchema } from "../../validations/jobType.schema";
import Input from "../ui/Input";
// import { useCustomContext } from "../../context/DataContext";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setServiceToEdit,
  setEditID,
  setIsEdit,
} from "../../redux/edit/editSlice";
import { Instance } from "../../utils/Instance";
import Loader from "../Loader";

type TProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setJobType: React.Dispatch<React.SetStateAction<TJobType[]>>;
  isModalOpen: boolean;
};

export default function AddJobType({
  setIsModalOpen,
  setJobType,
  isModalOpen,
}: TProps) {
  // const [jobTypeDesc, setJobTypeDesc] = useState({
  //   job_type_cd: "",
  //   job_type_desc: "",
  //   tax: "Y",
  //   tax_percent: "",
  //   pf_allowed: "N",
  //   cit: "N",
  //   pay_generate: "N",
  //   grade_allowed: "N",
  //   single_rebate: "",
  //   married_rebate: "",
  //   disabled: "N",
  // });
  // const {
  //   serviceToEdit,
  //   isEdit,
  //   editID,
  //   setServiceToEdit,
  //   setEditID,
  //   setIsEdit,
  // } = useCustomContext();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TJobType>({
    resolver: zodResolver(jobTypeSchema),
  });
  const [disabledVal, setDisabledVal] = useState(false);
  const [pfAllowedVal, setPfAllowedVal] = useState(false);
  const [citVal, setCitVal] = useState(false);
  const [payGenerateVal, setPayGenerateVal] = useState(false);
  const [gradeAllowedVal, setGradeAllowedVal] = useState(false);

  const dispatch = useAppDispatch();

  const isEdit = useAppSelector((state) => state.edit.isEdit);
  const serviceToEdit = useAppSelector((state) => state.edit.serviceToEdit);
  const editID = useAppSelector((state) => state.edit.editID);

  const [isLoading, setIsLoading] = useState(false);

  const modalRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let handler = (e: any) => {
      if (!modalRef.current?.contains(e.target)) {
        setIsModalOpen(false);

        if (isEdit) {
          dispatch(setIsEdit(false));
          dispatch(
            setServiceToEdit((prev: any) => {
              if (prev) {
                return {
                  ...prev,
                  job_type_cd: "",
                  job_type_desc: "",
                  tax: "Y",
                  tax_percent: "",
                  pf_allowed: false,
                  cit: false,
                  pay_generate: false,
                  grade_allowed: false,
                  single_rebate: "",
                  married_rebate: "",
                  disabled: false,
                };
              }
            })
          );
          dispatch(setEditID(""));
        }
        console.log("i am inside the if block");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isModalOpen, setIsModalOpen]);

  // useEffect(() => {
  //   // Update userInfo when editedData changes
  //   if (jobTypeToEdit) {
  //     setJobTypeDesc(jobTypeToEdit);
  //   }
  // }, [jobTypeToEdit]);

  useEffect(() => {
    let defaultValues: any = {};
    defaultValues.job_type_cd = serviceToEdit?.job_type_cd || "";
    defaultValues.job_type_desc = serviceToEdit?.job_type_desc || "";
    defaultValues.tax = serviceToEdit?.tax || "Y";
    defaultValues.tax_percent = serviceToEdit?.tax_percent || "";
    defaultValues.pf_allowed = serviceToEdit?.pf_allowed === "Y" ? true : false;
    defaultValues.cit = serviceToEdit?.cit === "Y" ? true : false;
    defaultValues.pay_generate =
      serviceToEdit?.pay_generate === "Y" ? true : false;
    defaultValues.grade_allowed =
      serviceToEdit?.grade_allowed === "Y" ? true : false;
    defaultValues.single_rebate = serviceToEdit?.single_rebate || "";

    defaultValues.married_rebate = serviceToEdit?.married_rebate || "";
    defaultValues.disabled = serviceToEdit?.disabled === "Y" ? true : false;

    reset({ ...defaultValues });
  }, []);

  useEffect(() => {
    if (isEdit && serviceToEdit?.disabled === "Y") {
      setDisabledVal(true);
    } else {
      setDisabledVal(false);
    }
    if (isEdit && serviceToEdit?.pf_allowed === "Y") {
      setPfAllowedVal(true);
    } else {
      setPfAllowedVal(false);
    }
    if (isEdit && serviceToEdit?.cit === "Y") {
      setCitVal(true);
    } else {
      setCitVal(false);
    }
    if (isEdit && serviceToEdit?.pay_generate === "Y") {
      setPayGenerateVal(true);
    } else {
      setPayGenerateVal(false);
    }
    if (isEdit && serviceToEdit?.grade_allowed === "Y") {
      setGradeAllowedVal(true);
    } else {
      setGradeAllowedVal(false);
    }
  }, [isEdit, serviceToEdit]);

  const onSubmit = async (data: any) => {
    const jobTypeData = {
      ...data,
      job_type_cd: data.job_type_cd.toUpperCase(),
      cit: data.cit ? "Y" : "N",
      pf_allowed: data.pf_allowed ? "Y" : "N",
      pay_generate: data.pay_generate ? "Y" : "N",
      grade_allowed: data.grade_allowed ? "Y" : "N",
      disabled: data.disabled ? "Y" : "N",
    };

    try {
      setIsLoading(true);
      if (!isEdit) {
        const res = await Instance.post("/v1/job-type", jobTypeData);
        console.log(res);
        setJobType((prev) => {
          if (!prev) {
            return [res.data.data];
          } else {
            return [...prev, jobTypeData];
          }
        });
        toast.success(res.data.message);
      } else {
        const res = await Instance.put(`/v1/job-type/${editID}`, jobTypeData);
        setJobType((prev) => {
          if (!prev) return [];
          return prev.map((item) => {
            if (item.job_type_cd === editID) {
              return { ...item, ...jobTypeData };
            }
            return item;
          });
        });
        toast.success(res.data.message);
        dispatch(setIsEdit(false));
        dispatch(setEditID(""));

        dispatch(
          setServiceToEdit((prev: any) => {
            if (prev) {
              return {
                ...prev,
                job_type_cd: "",
                job_type_desc: "",
                tax: "Y",
                tax_percent: "",
                pf_allowed: false,
                cit: false,
                pay_generate: false,
                grade_allowed: false,
                single_rebate: "",
                married_rebate: "",
                disabled: false,
              };
            }
          })
        );
      }
      reset();
      setGradeAllowedVal(false);
      setPayGenerateVal(false);
      setCitVal(false);
      setDisabledVal(false);
      setPfAllowedVal(false);
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex z-20 items-center justify-center fixed inset-0 w-full bg-black/60">
        <div ref={modalRef}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white max-w-[30rem] p-8 rounded-lg"
          >
            <div className="flex justify-end mb-4">
              <RxCross2
                onClick={() => {
                  setIsModalOpen(false);

                  if (isEdit) {
                    dispatch(setIsEdit(false));
                    dispatch(
                      setServiceToEdit((prev: any) => {
                        if (prev) {
                          return {
                            ...prev,
                            job_type_cd: "",
                            job_type_desc: "",
                            tax: "Y",
                            tax_percent: "",
                            pf_allowed: false,
                            cit: false,
                            pay_generate: false,
                            grade_allowed: false,
                            single_rebate: "",
                            married_rebate: "",
                            disabled: false,
                          };
                        }
                      })
                    );
                    dispatch(setEditID(""));
                  }
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
                <Input
                  fieldName="job_type_cd"
                  register={register}
                  errors={errors}
                  maxLength={2}
                  type="text"
                  isEdit={isEdit}
                  className={`block p-2.5 w-full ${
                    isEdit ? "opacity-50" : ""
                  } text-sm text-black rounded-lg border uppercase border-gray-300 focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
              <div className="relative z-0 w-full mb-5 group col-start-2 col-span-4">
                <label
                  htmlFor="job_type_desc"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <Input
                  fieldName="job_type_desc"
                  register={register}
                  errors={errors}
                  type="text"
                  className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
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
                {...register("tax")}
                id="tax"
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
              <Input
                fieldName="tax_percent"
                register={register}
                errors={errors}
                type="text"
                setValueAs={(v) => (v === "" ? "" : parseInt(v, 10))}
                className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-2">
              <div className="flex items-center mb-5">
                <Input
                  fieldName="pf_allowed"
                  register={register}
                  errors={errors}
                  type="checkbox"
                  checked={pfAllowedVal}
                  onChange={(e) => {
                    setValue("pf_allowed", e.target.checked);
                    setPfAllowedVal(!pfAllowedVal);
                  }}
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
                <Input
                  fieldName="cit"
                  register={register}
                  errors={errors}
                  type="checkbox"
                  checked={citVal}
                  onChange={(e) => {
                    setValue("cit", e.target.checked);
                    setCitVal(!citVal);
                  }}
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
                <Input
                  fieldName="pay_generate"
                  register={register}
                  errors={errors}
                  type="checkbox"
                  checked={payGenerateVal}
                  onChange={(e) => {
                    setValue("pay_generate", e.target.checked);
                    setPayGenerateVal(!payGenerateVal);
                  }}
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
                <Input
                  fieldName="grade_allowed"
                  register={register}
                  errors={errors}
                  type="checkbox"
                  checked={gradeAllowedVal}
                  onChange={(e) => {
                    setValue("grade_allowed", e.target.checked);
                    setGradeAllowedVal(!gradeAllowedVal);
                  }}
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
              <Input
                fieldName="single_rebate"
                register={register}
                errors={errors}
                type="text"
                setValueAs={(v) => (v === "" ? "" : parseInt(v, 10))}
                className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="married_rebate"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Married Rebate
              </label>
              <Input
                fieldName="married_rebate"
                register={register}
                errors={errors}
                type="text"
                setValueAs={(v) => (v === "" ? "" : parseInt(v, 10))}
                className="block p-2.5 w-full text-sm text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                //   placeholder="Description..."
              />
            </div>
            <div className="flex items-center mb-5">
              <Input
                fieldName="disabled"
                register={register}
                errors={errors}
                type="checkbox"
                checked={disabledVal}
                onChange={(e) => {
                  setValue("disabled", e.target.checked);
                  setDisabledVal(!disabledVal);
                }}
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
              disabled={isLoading}
              className={`
    text-white
    ${
      isEdit
        ? "bg-green-500 hover:bg-green-600"
        : "bg-blue-700 hover:bg-blue-800"
    }
    ${isLoading ? "opacity-70" : ""}
    focus:ring-4 focus:outline-none focus:ring-blue-300
    font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center
  `}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader color="text-white" height="h-4" width="w-4" />
                  {isEdit ? "Editing..." : "Submitting"}
                </div>
              ) : isEdit ? (
                "Edit"
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
