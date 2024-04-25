import { useState } from "react";
import { useForm } from "react-hook-form";
import { Instance } from "../utils/Instance";
import { TPayroll } from "../interfaces/types/payroll.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { payrollSchema } from "../validations/payroll.schema";
import { generatePDF } from "../utils/generatePdf";
import Loader from "../components/Loader";

type TPayrollForm = {
  fiscalYr: string;
  voucherNo: number;
  processMonth: string;
};

const Payroll: React.FC = () => {
  const [payrollData, setPayrollData] = useState<TPayroll[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPayrollForm>({ resolver: zodResolver(payrollSchema) });

  const onSubmit = async (data: TPayrollForm) => {
    console.log(data);
    try {
      setIsLoading(true);
      const response = await Instance.get("/v1/payroll");
      setPayrollData(response?.data?.data);
      setIsLoading(false);
      generatePDF(response?.data?.data);
      console.log(response?.data?.data); // Log API response data
    } catch (error) {
      console.error("Error fetching payroll data:", error);
    }
  };

  return (
    <div id="payroll-table">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[20rem] p-4">
        {/* Fiscal year input */}
        <div className="relative z-0 w-full mb-5 group col-start-1">
          <label
            htmlFor="fiscal_yr"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Fiscal Year
          </label>
          <input
            {...register("fiscalYr")}
            type="string"
            className="block p-2.5 w-full text-sm uppercase text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
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
          <input
            {...register("processMonth")}
            type="string"
            className="block p-2.5 w-full text-sm uppercase text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
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
          <input
            {...register("voucherNo")}
            type="number"
            className="block p-2.5 w-full text-sm uppercase text-black rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
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
