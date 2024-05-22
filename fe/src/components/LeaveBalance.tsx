import { useFetchData } from "../api";

const LeaveBalance = () => {
  const { data: leaveBalanceData } = useFetchData("/v1/leave-balance");
  const leaveBalance = leaveBalanceData?.data;
  return (
    <>
      <div className=" p-4">
        <h3 className="font-bold text-lg">Leave Status Details</h3>
        <div className="relative overflow-x-auto bg-gray-10 text-gray-800">
          <table className="w-full text-sm text-left rtl:text-right text-gray-800">
            <thead className="text-base text-gray-900 capitalize ">
              <tr className="text-xs text-gray-700 capitalize bg-gray-50 sticky top-0">
                <th scope="col" className="px-4 py-3">
                  Leave Code
                </th>
                <th scope="col" className="px-4 py-3">
                  Leave Type
                </th>
                <th scope="col" className="px-4 py-3">
                  Leave Remaining
                </th>
              </tr>
            </thead>
            <tbody>
              {leaveBalance?.map((item) => (
                <tr
                  key={item.LEAVE_CD}
                  className="odd:bg-white even:bg-gray-50  border-b"
                >
                  <td className="px-4 py-4">{item.LEAVE_CD}</td>
                  <td className="px-4 py-4">{item.LEAVE_TYPE}</td>
                  <td className="px-4 py-4">{item.LEAVE_BALANCE}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LeaveBalance;
