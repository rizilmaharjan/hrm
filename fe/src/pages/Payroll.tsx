import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Instance } from "../utils/Instance";
import { TPayroll } from "../interfaces/types/payroll.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { payrollSchema } from "../validations/payroll.schema";
import { generatePDF } from "../utils/generatePdf";
import Loader from "../components/Loader";
import { useFetchData } from "../api";
import { TReport } from "../interfaces/types/report.types";

type TPayrollForm = {
  fiscalYr: string;
  voucherNo: number;
  processMonth: string;
};

const Payroll: React.FC = () => {
  const [payrollData, setPayrollData] = useState<TPayroll[] | null>(null);

  const { data: reportData } = useFetchData("/v1/fiscal-yr");
  const { data: monthData } = useFetchData("/v1/pay-month");

  const fiscalYearData = reportData?.data;
  const payMonthData = monthData?.data;

  const presentFiscalYr = fiscalYearData?.find(
    (opt) => opt.status === "R"
  )?.fiscal_yr;
  // console.log(presentFiscalYr);
  const firstMonth = payMonthData?.[0]?.month_cd?.toString();
  const [fiscalYr, setFiscalYr] = useState<string>(presentFiscalYr);
  // console.log(fiscalYr);
  const [month, setMonth] = useState<string | undefined>(firstMonth);
  const [voucherNo, setVoucherNo] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPayrollForm>({
    resolver: zodResolver(payrollSchema),
    // defaultValues: {
    //   fiscalYr:
    //     fiscalYearData?.find((option: TReport) => option.status === "R")
    //       ?.fiscal_yr || "",
    //   voucherNo: "",
    //   processMonth: payMonthData?.[0]?.month_cd?.toString() || "",
    // },
  });

  useEffect(() => {
    const getVoucherNo = async () => {
      // console.log(fiscalYr, month);
      try {
        if (fiscalYr || month) {
          const res = await Instance.get(
            `/v1/voucher-no?fiscal_yr=${fiscalYr || ""}&process_month=${
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
  }, [fiscalYr, month]); // Include both dependencies

  const printReport = async (data: TPayrollForm) => {
    try {
      setIsLoading(true);
      const response = await Instance.get(
        `/v1/payroll?fiscal_yr=${data.fiscalYr}&process_month=${data.processMonth}&pay_vch_no=${voucherNo}`
      );
      setPayrollData(response?.data?.data);
      setIsLoading(false);

      // Convert month to a number before using it to find pay_month_desc
      const monthNumber = parseInt(month || "", 10);
      const month_desc = payMonthData?.find(
        (opt) => opt.month_cd === monthNumber
      )?.pay_month_desc;

      if (month_desc) {
        generatePDF(fiscalYr, month_desc, response?.data?.data);
      } else {
        console.error("Month description not found for the selected month.");
      }
    } catch (error) {
      console.error("Error fetching payroll data:", error);
    }
  };

  // Render loading state if data is still being fetched
  if (!fiscalYearData || !payMonthData) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader color="text-blue-800" width="w-6" height="h-6" />
      </div>
    );
  }

  return (
    <div id="payroll-table">
      <form onSubmit={handleSubmit(printReport)} className="max-w-[20rem] p-4">
        {/* Fiscal year input */}
        <div className="relative z-0 w-full mb-5 group col-start-1">
          <label
            htmlFor="fiscal_yr"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Fiscal Year
          </label>
          <select
            id="fiscalYr"
            className="bg-gray-50 border border-gray-300 text-gray-900 mb-5 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("fiscalYr")}
            onChange={(e) => setFiscalYr(e.target.value)}
            defaultValue={
              fiscalYearData?.find((opt) => opt.status === "R")?.fiscal_yr
            }
          >
            {fiscalYearData?.map((option: TReport, index: number) => (
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
              <p className="text-red-500 text-sm">{errors.fiscalYr.message}</p>
            )
          )}
        </div>
        {/* Month input */}
        <div className="relative z-0 w-full mb-5 group col-start-1">
          <label
            htmlFor="process_month"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Month
          </label>
          <select
            id="processMonth"
            className="bg-gray-50 border border-gray-300 text-gray-900 mb-5 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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

        {/* Voucher number input */}
        <div className="relative z-0 w-auto mb-5 group col-start-1">
          <label
            htmlFor="voucherNo"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Voucher Number
          </label>
          <textarea
            {...register("voucherNo", {
              required: "Voucher Number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Voucher Number must be a number",
              },
            })}
            // type="text"
            className="block p-2.5 w-full text-sm uppercase text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            value={voucherNo.join(", ")}
          />
          {typeof errors.voucherNo === "number" ? (
            <p className="text-red-500 text-xs">{errors.voucherNo}</p>
          ) : (
            errors.voucherNo &&
            typeof errors.voucherNo.message === "string" && (
              <p className="text-red-500 text-sm">{errors.voucherNo.message}</p>
            )
          )}
        </div>

        <button
          disabled={isLoading}
          className={`bg-green-500 text-white w-24 py-1 rounded-lg font-semibold ${
            isLoading ? "opacity-50" : ""
          }`}
          type="submit"
        >
          {isLoading ? (
            <>
              <div className="flex items-center justify-center gap-2 py-1">
                <Loader color="text-white" height="h-4" width="w-4" />
              </div>
            </>
          ) : (
            "Export"
          )}
        </button>
      </form>
    </div>
  );
};

export default Payroll;
