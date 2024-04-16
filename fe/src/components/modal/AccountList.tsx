import React, { useEffect, useState } from "react";
import { Instance } from "../../utils/Instance";
import { RxCross2 } from "react-icons/rx";

interface AccountListProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAccountSelect: (account: string, desc: string) => void;
}

type TAccount = {
  acc_cd: string;
  acc_desc: string;
  acc_type: string;
};

const AccountList: React.FC<AccountListProps> = ({
  isOpen,
  setIsOpen,
  handleAccountSelect,
}) => {
  const [account, setAccount] = useState<TAccount[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const getAccount = async () => {
      try {
        const response = await Instance.get(
          `http://localhost:8000/api/v1/account`
        );
        setAccount(response.data.data);
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };
    getAccount();
  }, []);

  const filteredAccounts = account.filter(
    (item) =>
      item.acc_cd.toLowerCase().includes(searchInput.toLowerCase()) ||
      item.acc_desc.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      {isOpen && (
        <div className="flex z-50 items-center justify-center fixed inset-0 w-full bg-black/60">
          <div className="bg-white w-1/4 p-2 rounded-lg">
            <div className="flex justify-between items-center px-2 py-1">
              <h1 className="font-bold">A/c</h1>
              <div className="flex items-center gap-2">
                <label htmlFor="search">Find:</label>
                <input
                  className="px-2 py-1 border-2 rounded-md"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <RxCross2
                size={20}
                onClick={() => {
                  setIsOpen(false);
                }}
                className="cursor-pointer"
              />
            </div>
            <div className="overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-thumb-rounded-lg scrollbar-track-gray-100 h-52">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 table-fixed">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                  <tr>
                    <th scope="col" className="px-2 py-2 w-1/6">
                      Code
                    </th>
                    <th scope="col" className="px-2 py-2 w-5/6">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.map((item) => (
                    <tr
                      key={item.acc_cd}
                      className="odd:bg-white even:bg-gray-50 cursor-pointer"
                      onClick={() =>
                        handleAccountSelect(item.acc_cd, item.acc_desc)
                      }
                    >
                      <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap ">
                        {item.acc_cd}
                      </td>
                      <td className="px-2 py-2">{item.acc_desc}</td>
                    </tr>
                  ))}
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
