import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { reportSchema, TReportSchema } from "../../validations/report.schema";
import { useFetchData } from "../../api";
import { TReport } from "../../interfaces/types/report.types";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { departmentData } from "../../constants";
import { Instance } from "../../utils/Instance";
import AccountList from "./AccountList";
import ListModal from "./ListModal";

type TReportProps = {
  openReport: boolean;
  setOpenReport: React.Dispatch<React.SetStateAction<boolean>>;
};

const Report: React.FC<TReportProps> = (openReport, setOpenReport) => {
  const [year, setYear] = useState<string>();
  // console.log(fiscalYr);
  const [month, setMonth] = useState<string>();
  const [voucherNo, setVoucherNo] = useState<number[]>([]);
  const [selectedOffice, setSelectedOffice] = useState("");
  const [officeDescription, setOfficeDescription] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [positionDescription, setPositionDescription] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [listData, setListData] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TReportSchema>({
    // resolver: zodResolver(reportSchema),
  });
  const { data: fiscalYrDatas } = useFetchData("/v1/fiscal-yr");
  const { data: payMonthDatas } = useFetchData("/v1/pay-month");
  const { data: officeDatas } = useFetchData("/v1/office");
  const { data: positionDatas } = useFetchData("/v1/position");

  const fiscalYrData = fiscalYrDatas?.data;
  const payMonthData = payMonthDatas?.data;
  const officeData = officeDatas?.data;
  //   const departmentData = departmentData;
  const positionData = positionDatas?.data;
  const reportHeading: string = "Payroll Sheet";

  type TOffice = {
    office_cd: string;
    office_desc: string;
  };
  type TDepartment = {
    department_cd: string;
    department_desc: string;
  };
  type TPosition = {
    position_cd: string;
    position_desc: string;
  };

  useEffect(() => {
    const getVoucherNo = async () => {
      // console.log(fiscalYr, month);
      try {
        if (year || month) {
          const res = await Instance.get(
            `/v1/voucher-no?fiscal_yr=${year || ""}&process_month=${
              month || ""
            }`
          );
          const voucherNumbers = res.data.data.map(
            (voucher: any) => voucher.pay_vch_no
          );
          setVoucherNo(voucherNumbers);
          // console.log(voucherNumbers);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getVoucherNo();
  }, [year, month]);

  const onSubmit = (data) => {
    console.log("data", data);
    console.log("type of data", typeof data);
  };

  // Function to handle office selection
  const handleOfficeSelect = (e) => {
    const selectedOfficeCode = e.target.value;
    const selectedOffice = officeData.find(
      (option: TOffice) => option.office_cd === selectedOfficeCode
    );
    setSelectedOffice(selectedOfficeCode);
    setOfficeDescription(selectedOffice?.office_desc || "");
  };

  useEffect(() => {
    if (officeData && selectedOffice) {
      // Update description when selected office changes
      const updatedOffice = officeData.find(
        (option: TOffice) => option.office_cd === selectedOffice
      );
      setOfficeDescription(updatedOffice?.office_desc || "");
    }
  }, [selectedOffice, officeData]);

  const handleDepartmentSelect = (e) => {
    const selectedDepartmentCode = e.target.value;
    const selectedDepartment = departmentData.find(
      (option: TDepartment) => option.department_cd === selectedDepartmentCode
    );
    setSelectedDepartment(selectedDepartmentCode);
    setDepartmentDescription(selectedDepartment?.department_desc || "");
  };

  useEffect(() => {
    if (departmentData && selectedDepartment) {
      // Update description when selected office changes
      const updatedDepartment = departmentData.find(
        (option: TDepartment) => option.department_cd === selectedDepartment
      );
      setDepartmentDescription(updatedDepartment?.department_desc || "");
    }
  }, [selectedDepartment]);

  const handlePositionSelect = (e) => {
    const selectedPositionCode = e.target.value;
    const selectedPosition = positionData.find(
      (option: TPosition) => option.position_cd === selectedPositionCode
    );
    setSelectedPosition(selectedPositionCode);
    setPositionDescription(selectedPosition?.position_desc || "");
  };

  useEffect(() => {
    if (positionData && selectedPosition) {
      // Update description when selected office changes
      const updatedPosition = positionData.find(
        (option: TPosition) => option.position_cd === selectedPosition
      );
      setPositionDescription(updatedPosition?.position_desc || "");
    }
  }, [selectedPosition, positionData]);

  const openListModal = (data) => {
    console.log(data);
    setIsOpen(true);
    setListData(data);
  };

  const handleSelectRow = (rowData) => {
    console.log("Selected row data:", rowData);
    switch (rowData.id) {
      case "o":
        setSelectedOffice(rowData.code);
        setOfficeDescription(rowData.description);
        break;
      case "d":
        setSelectedDepartment(rowData.code);
        setDepartmentDescription(rowData.description);
        break;
      case "p":
        setSelectedPosition(rowData.code);
        setPositionDescription(rowData.description);
        break;
      default:
        break;
    }
  };

  const handleCloseModal = () => {
    setOpenReport(false);
  };
  if (openReport) {
    return (
      <>
        <div className="flex z-20 items-center justify-center fixed inset-0 w-full bg-black/60">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white w-full max-w-[30rem] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-2 flex justify-between items-center mb-4 border-b-2">
              <h2>{reportHeading}</h2>
              <RxCross2 onClick={handleCloseModal} className="cursor-pointer" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center z-0 w-full px-4 mb-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-1"
                />
                <label
                  htmlFor="printId"
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  Print ID
                </label>
              </div>
              <div className="relative z-0 w-full mb-2 px-4">
                <label
                  htmlFor="fiscalYr"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Fiscal Year
                </label>
                <select
                  {...register("fiscalYr")}
                  id="fiscalYr"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(e) => setYear(e.target.value)}
                  // defaultValue={
                  //   fiscalYrData?.find((opt: TReport) => opt.status === "R")
                  //     ?.fiscal_yr
                  // }
                >
                  <option value="">Select Year</option>
                  {fiscalYrData?.map((option: TReport, index: number) => (
                    <option
                      key={index}
                      value={option.fiscal_yr}
                      className="capitalize"
                    >
                      {option.fiscal_yr}
                    </option>
                  ))}
                </select>

                {typeof errors.fiscalYr === "string" ? (
                  <p className="text-red-500 text-xs">{errors.fiscalYr}</p>
                ) : (
                  errors.fiscalYr &&
                  typeof errors.fiscalYr.message === "string" && (
                    <p className="text-red-500 text-sm">
                      {errors.fiscalYr.message}
                    </p>
                  )
                )}
              </div>

              <div className="relative z-0 w-full px-4 mb-2">
                <label
                  htmlFor="voucherNo"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Voucher Number
                </label>
                <input
                  {...register("voucherNo")}
                  // type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={voucherNo.join(", ")}
                />
                {typeof errors.voucherNo === "number" ? (
                  <p className="text-red-500 text-xs">{errors.voucherNo}</p>
                ) : (
                  errors.voucherNo &&
                  typeof errors.voucherNo.message === "string" && (
                    <p className="text-red-500 text-sm">
                      {errors.voucherNo.message}
                    </p>
                  )
                )}
              </div>
              <div className="relative z-0 w-full px-4 mb-2">
                <label
                  htmlFor="process_month"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Month
                </label>
                <select
                  id="processMonth"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  {...register("processMonth")}
                  onChange={(e) => setMonth(e.target.value)}
                >
                  <option value="">Select Month</option>
                  {payMonthData?.map((option: TReport, index: number) => (
                    <option
                      key={index}
                      value={option.month_cd?.toString()}
                      className="capitalize"
                    >
                      {option.pay_month_desc}
                    </option>
                  ))}
                </select>
                {typeof errors.processMonth === "string" ? (
                  <p className="text-red-500 text-xs">{errors.processMonth}</p>
                ) : (
                  errors.processMonth &&
                  typeof errors.processMonth.message === "string" && (
                    <p className="text-red-500 text-sm">
                      {errors.processMonth.message}
                    </p>
                  )
                )}
              </div>
            </div>
            <div className="mx-3 py-1 bg-gray-50 rounded-md">
              <div className="relative z-0 w-full px-1 mb-2">
                <label
                  htmlFor="office"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Office
                </label>
                <div className="flex items-center gap-4">
                  <input
                    id="office"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5"
                    {...register("office")}
                    value={selectedOffice}
                    onChange={handleOfficeSelect}
                    onDoubleClick={() =>
                      openListModal(
                        officeData.map((office: TOffice) => ({
                          id: "o",
                          code: office.office_cd,
                          description: office.office_desc,
                        }))
                      )
                    }
                  />
                  {typeof errors.office === "string" ? (
                    <p className="text-red-500 text-xs">{errors.office}</p>
                  ) : (
                    errors.office &&
                    typeof errors.office.message === "string" && (
                      <p className="text-red-500 text-sm">
                        {errors.office.message}
                      </p>
                    )
                  )}
                  <input
                    type="text"
                    value={officeDescription}
                    disabled
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                  />
                </div>
              </div>

              <div className="relative z-0 w-full px-1 mb-2">
                <label
                  htmlFor="department"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Department
                </label>
                <div className="flex items-center gap-4">
                  <input
                    id="department"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5"
                    {...register("department")}
                    value={selectedDepartment}
                    onChange={handleDepartmentSelect}
                    onDoubleClick={() =>
                      openListModal(
                        departmentData.map((department: TDepartment) => ({
                          id: "d",
                          code: department.department_cd,
                          description: department.department_desc,
                        }))
                      )
                    }
                  />
                  {/* <select
                  id="department"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5"
                  {...register("department")}
                  value={selectedDepartment}
                  onChange={handleDepartmentSelect}
                >
                  {departmentData?.map((option: TDepartment) => (
                    <option
                      key={option.department_cd}
                      value={option.department_cd?.toString()}
                    >
                      {option.department_cd}
                    </option>
                  ))}
                </select> */}
                  {typeof errors.department === "string" ? (
                    <p className="text-red-500 text-xs">{errors.department}</p>
                  ) : (
                    errors.department &&
                    typeof errors.department.message === "string" && (
                      <p className="text-red-500 text-sm">
                        {errors.department.message}
                      </p>
                    )
                  )}
                  <input
                    type="text"
                    value={departmentDescription}
                    disabled
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                  />
                </div>
              </div>
              <div className="relative z-0 w-full px-1 mb-2">
                <label
                  htmlFor="position"
                  className="block mb-1 text-sm font-medium text-gray-900"
                >
                  Position
                </label>
                <div className="flex items-center gap-4">
                  <input
                    id="position"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5"
                    {...register("position")}
                    value={selectedPosition}
                    onChange={handlePositionSelect}
                    onDoubleClick={() =>
                      openListModal(
                        positionData.map((position: TPosition) => ({
                          id: "p",
                          code: position.position_cd,
                          description: position.position_desc,
                        }))
                      )
                    }
                  />
                  {/* <select
                  id="position"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/4 p-2.5"
                  {...register("position")}
                  value={selectedPosition}
                  onChange={handlePositionSelect}
                >
                  {positionData?.map((option: TPosition) => (
                    <option
                      key={option.position_cd}
                      value={option.position_cd?.toString()}
                    >
                      {option.position_cd}
                    </option>
                  ))}
                </select> */}
                  {typeof errors.position === "string" ? (
                    <p className="text-red-500 text-xs">{errors.position}</p>
                  ) : (
                    errors.position &&
                    typeof errors.position.message === "string" && (
                      <p className="text-red-500 text-sm">
                        {errors.position.message}
                      </p>
                    )
                  )}
                  <input
                    type="text"
                    value={positionDescription}
                    disabled
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5"
                  />
                </div>
              </div>
            </div>
            <div className="relative z-0 w-full mb-2 px-4">
              <label
                htmlFor="destination"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Destination
              </label>
              <select
                id="destination"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                {...register("destination")}
                //   onChange={(e) => setFiscalYr(e.target.value)}
              >
                <option value="pdf" className="capitalize">
                  PDF
                </option>
                <option value="screen" className="capitalize">
                  Screen
                </option>
                <option value="printer" className="capitalize">
                  Printer
                </option>
                <option value="spreadsheet" className="capitalize">
                  SpreadSheet
                </option>
              </select>

              {typeof errors.fiscalYr === "string" ? (
                <p className="text-red-500 text-xs">{errors.fiscalYr}</p>
              ) : (
                errors.fiscalYr &&
                typeof errors.fiscalYr.message === "string" && (
                  <p className="text-red-500 text-sm">
                    {errors.fiscalYr.message}
                  </p>
                )
              )}
            </div>
            <button
              className="bg-green-500 text-white flex justify-center mx-4 w-25 py-1 px-4 mb-4 rounded-lg font-semibold"
              type="submit"
            >
              Report
            </button>
          </form>
          {positionData && (
            <ListModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              data={listData}
              onSelectRow={handleSelectRow}
            />
          )}
        </div>
      </>
    );
  } else {
    // If openReport is false, return null or an empty fragment
    return null;
  }
};

export default Report;
