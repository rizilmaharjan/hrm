import React from "react";
import { accountList } from "../../constants";

interface AccountListProps {
  isOpen: boolean;
  handleAccountSelect: (account: string) => void;
}

const AccountList: React.FC<AccountListProps> = ({
  isOpen,
  handleAccountSelect,
}) => {
  return (
    <>
      {isOpen && (
        <div className="flex z-50 items-center justify-center fixed inset-0 w-full bg-black/60">
          <div className="bg-white w-1/5 p-2 rounded-lg">
            <h1 className="font-bold">A/c</h1>
            <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-lg scrollbar-track-gray-100 h-52">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-fixed">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                  <tr>
                    <th scope="col" className="px-2 py-2">
                      Code
                    </th>
                    <th scope="col" className="px-6 py-2">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {accountList.map((item) => (
                    <tr
                      className="odd:bg-white  even:bg-gray-50 cursor-pointer"
                      onClick={() => handleAccountSelect(item.acc_cd)}
                    >
                      <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap ">
                        {item.acc_cd}
                      </td>
                      <td className="px-2 py-2">{item.dsp_acc_desc}</td>
                    </tr>
                  ))}
                  {/* <tr
                  className="odd:bg-white  even:bg-gray-50 cursor-pointer"
                  onClick={() => handleAccountSelect("2")}
                >
                  <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap ">
                    2
                  </td>
                  <td className="px-2 py-1">Holiday</td>
                </tr> */}
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountList;
