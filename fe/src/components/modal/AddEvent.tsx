import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefObject, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

// import { useCustomContext } from "../../context/DataContext";
import { Instance } from "../../utils/Instance";
import { TServiceEvent } from "../../interfaces/types/serviceEvent.types";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { serviceEvent } from "../../validations/serviceEvent.schema";
import {
  setServiceToEdit,
  setIsEdit,
  setEditID,
} from "../../redux/edit/editSlice";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import Loader from "../Loader";

type TProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setServiceEvents: React.Dispatch<React.SetStateAction<TServiceEvent[]>>;
  isModalOpen: boolean;
};
export default function AddEvent({
  setIsModalOpen,
  setServiceEvents,
  isModalOpen,
}: TProps) {
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
  } = useForm<TServiceEvent>({
    resolver: zodResolver(serviceEvent),
  });

  const dispatch = useAppDispatch();

  const isEdit = useAppSelector((state) => state.edit.isEdit);
  const serviceToEdit = useAppSelector((state) => state.edit.serviceToEdit);
  const editID = useAppSelector((state) => state.edit.editID);

  const [disabledVal, setDisabledValue] = useState(false);
  const [salaryAdjustVal, setSalaryAdjustVal] = useState(false);

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
              return {
                ...prev,
                SERVICE_EVENT_CD: "",
                SERVICE_EVENT_DESC: "",
                SERVICE_EVENT_DESC_NEP: "",
                SERVICE_EVENT_TYPE: "N",
                SALARY_ADJUST: false,
                DISABLED: false,
              };
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
  }, [isModalOpen]);

  useEffect(() => {
    let defaultValues: any = {};
    defaultValues.SERVICE_EVENT_CD = serviceToEdit?.SERVICE_EVENT_CD || "";
    defaultValues.SERVICE_EVENT_DESC = serviceToEdit?.SERVICE_EVENT_DESC || "";
    defaultValues.SERVICE_EVENT_DESC_NEP =
      serviceToEdit?.SERVICE_EVENT_DESC_NEP || "";
    defaultValues.SERVICE_EVENT_TYPE = serviceToEdit?.SERVICE_EVENT_TYPE || "N";
    defaultValues.DISABLED = serviceToEdit?.DISABLED === "Y" ? true : false;
    defaultValues.SALARY_ADJUST =
      serviceToEdit?.SALARY_ADJUST === "Y" ? true : false;

    reset({ ...defaultValues });
  }, []);

  useEffect(() => {
    if (isEdit && serviceToEdit?.DISABLED === "Y") {
      setDisabledValue(true);
    } else {
      setDisabledValue(false);
    }
    if (isEdit && serviceToEdit?.SALARY_ADJUST === "Y") {
      setSalaryAdjustVal(true);
    } else {
      setSalaryAdjustVal(false);
    }
  }, [isEdit, serviceToEdit]);

  const onSubmit = async (data: FieldValues) => {
    console.log("datas before changed", data);
    const serviceEventData = {
      ...data,
      DISABLED: data.DISABLED ? "Y" : "N",
      SALARY_ADJUST: data.SALARY_ADJUST ? "Y" : "N",
    };

    console.log("datas after changed", serviceEventData);
    try {
      setIsLoading(true);
      if (!isEdit) {
        const res = await Instance.post("/v1/service-event", serviceEventData);
        console.log("addeventresponse", res.data);
        setServiceEvents((prev) => {
          if (!prev) {
            return [res.data.data];
          } else {
            return [...prev, res.data.data];
          }
        });
        toast.success(res.data.message);
      } else {
        const res = await Instance.put(
          `v1/service-event/${editID}`,
          serviceEventData
        );
        setServiceEvents((prev) => {
          if (!prev) return [];
          return prev.map((item) => {
            if (item.SERVICE_EVENT_CD === editID) {
              return { ...item, ...serviceEventData };
            }
            return item;
          });
        });
        toast.success(res.data.message);

        dispatch(
          setServiceToEdit((prev: any) => {
            return {
              ...prev,
              SERVICE_EVENT_CD: "",
              SERVICE_EVENT_DESC: "",
              SERVICE_EVENT_DESC_NEP: "",
              SERVICE_EVENT_TYPE: "N",
              SALARY_ADJUST: false,
              DISABLED: false,
            };
          })
        );
        dispatch(setIsEdit(false));
        dispatch(setEditID(""));
      }
      reset();
      setDisabledValue(false);
      setSalaryAdjustVal(false);
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex z-20 items-center justify-center fixed inset-0 w-full bg-black/60">
        <div ref={modalRef} className="bg-white w-[28%] p-8 rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-end mb-4">
              <RxCross2
                onClick={() => {
                  setIsModalOpen(false);

                  if (isEdit) {
                    dispatch(setIsEdit(false));
                    dispatch(
                      setServiceToEdit((prev: any) => {
                        return {
                          ...prev,
                          SERVICE_EVENT_CD: "",
                          SERVICE_EVENT_DESC: "",
                          SERVICE_EVENT_DESC_NEP: "",
                          SERVICE_EVENT_TYPE: "N",
                          SALARY_ADJUST: false,
                          DISABLED: false,
                        };
                      })
                    );
                    dispatch(setEditID(""));
                  }
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

              <Input
                fieldName="SERVICE_EVENT_CD"
                register={register}
                errors={errors}
                type="number"
                isEdit={isEdit}
                className={`block p-2.5 w-full ${
                  isEdit ? "opacity-50" : ""
                } text-sm text-black rounded-lg border uppercase border-gray-300 focus:ring-blue-500 focus:border-blue-500`}
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="SERVICE_EVENT_DESC"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>

              <Input
                fieldName="SERVICE_EVENT_DESC"
                register={register}
                errors={errors}
                type="text"
                className="block p-2.5 w-full text-sm text-black outline-none rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="SERVICE_EVENT_DESC_NEP"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Description (In Nepali)
              </label>

              <Input
                fieldName="SERVICE_EVENT_DESC_NEP"
                register={register}
                errors={errors}
                type="text"
                className="block p-2.5 w-full text-sm outline-none text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex items-center mb-5">
              <Input
                type="checkbox"
                fieldName="DISABLED"
                register={register}
                errors={errors}
                checked={disabledVal}
                onChange={(e) => {
                  setValue("DISABLED", e.target.checked);
                  setDisabledValue(!disabledVal);
                }}
                className="w-4 h-4 text-blue-600 outline-none bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
              />

              <label
                htmlFor="checkbox"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Disable
              </label>
            </div>

            <label
              htmlFor="SERVICE_EVENT_TYPE"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Service Event Type
            </label>

            <select
              {...register("SERVICE_EVENT_TYPE")}
              id="SERVICE_EVENT_TYPE"
              className="bg-gray-50 border border-gray-300 outline-none text-gray-900 mb-5 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="N">Normal</option>
              <option value="P">Promotion</option>
              <option value="T">Transfer</option>
              <option value="A">Appoinment</option>
            </select>

            <div className="flex items-center mb-5">
              <Input
                fieldName="SALARY_ADJUST"
                register={register}
                errors={errors}
                type="checkbox"
                checked={salaryAdjustVal}
                onChange={(e) => {
                  setValue("SALARY_ADJUST", e.target.checked);
                  setSalaryAdjustVal(!salaryAdjustVal);
                }}
                className="w-4 h-4 text-blue-600 outline-none bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
              />
              <label
                htmlFor="checkbox"
                className="ms-2 text-sm font-medium text-gray-900"
              >
                Salary Adjust
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
