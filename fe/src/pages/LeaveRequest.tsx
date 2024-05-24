import { useFetchData } from "../api";
import { LeaveRequestTitle } from "../constants";

const LeaveRequest = () => {
  const { data: leaveRequestData } = useFetchData("/v1/leave");
  const leaveRequest = leaveRequestData?.data;

  const handleApprove = (id) => {
    console.log(id);
  };

  const handleDecline = (id) => {
    console.log(id);
  };
  return (
    <>
      <div className="flex justify-between px-3 mt-5">
        <h1 className="font-semibold text-xl">Leave Request</h1>
      </div>
      <div className="overflow-y-scroll scrollbar-thin mt-7 scrollbar-thumb-gray-400 scrollbar-thumb-rounded-lg scrollbar-track-gray-100 h-full w-full">
        <table className="w-full text-sm  text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
            <tr>
              {LeaveRequestTitle.map((item) => (
                <th key={item.id} scope="col" className={`px-6 py-3 text-left`}>
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leaveRequest && leaveRequest.length > 0 ? (
              leaveRequest.map((item) => (
                <tr
                  key={item.EMPLOYEE_CD}
                  className="odd:bg-white even:bg-gray-50  border-b "
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item.EMPLOYEE_CD}
                  </th>
                  <td className="px-6 py-4">{item.EMPNAME}</td>
                  <td className="px-6 py-4 capitalize">{item.LEAVE_CD}</td>
                  <td className="px-6 py-4">{item.LEAVE_APPLIED_DT_NEP}</td>
                  <td className="px-6 py-4">{item.FROM_LEAVE_DT_NEP}</td>
                  <td className="px-6 py-4">{item.TO_LEAVE_DT_NEP}</td>
                  <td className="px-6 py-4">{item.NO_OF_DAYS}</td>
                  <td
                    className={`px-6 py-4 ${
                      item.APPROVED === "Y" ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {item.APPROVED === "Y" ? "Approved" : "Declined"}
                  </td>
                  {/* <td className="px-6 py-4">
                    <span className="flex items-center gap-4">
                      <p
                        onClick={() => handleApprove(item.LEAVE_APPLY_ID)}
                        className="font-medium text-green-600 cursor-pointer hover:underline"
                      >
                        Approve
                      </p>
                      <p
                        onClick={() => handleDecline(item.LEAVE_APPLY_ID)}
                        className="font-medium cursor-pointer text-red-600 hover:underline"
                      >
                        Decline
                      </p>
                    </span>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr className="">
                <td className="px-6 py-4 h-96" colSpan={12}>
                  <p className="text-center text-gray-500 text-bold text-3xl">
                    No Data Found
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LeaveRequest;
