import { useState } from "react";
import Report from "../components/modal/Report";
import ApplyLeave from "./ApplyLeave";
import LeaveBalance from "../components/LeaveBalance";

const Attendance = () => {
  const [openReport, setOpenReport] = useState<boolean>(false);
  return (
    <div>
      {/* {openReport && (
        <Report openReport={openReport} setOpenReport={setOpenReport} />
      )}
      <button
        onClick={() => setOpenReport(true)}
        className="bg-green-500 text-white w-24 py-1 rounded-lg font-semibold"
        type="button"
      >
        Report
      </button> */}
      <div className="flex justify-between">
        <ApplyLeave />
        <div className="mt-10 mr-10">
          <LeaveBalance />
        </div>
      </div>
    </div>
  );
};

export default Attendance;
