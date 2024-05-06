import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

type TListModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any[];
  onSelectRow: (row: any) => void;
};

const ListModal: React.FC<TListModalProps> = ({
  isOpen,
  setIsOpen,
  data,
  onSelectRow,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const filteredItems = data.filter(
    (item) =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectRow = (row) => {
    setSelectedRow(row); // Set the selected row
  };

  const handleOK = () => {
    if (selectedRow) {
      // Pass selected row data to parent component
      onSelectRow(selectedRow);
    }
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <>
      {isOpen && (
        <div className="flex z-50 items-center justify-center fixed inset-0 w-full">
          <div className="bg-white w-1/4 max-h-80 p-2 rounded-lg shadow-2xl border">
            <div className="flex justify-between gap-2">
              <input
                type="text"
                placeholder="Search..."
                className="px-2 py-1 mb-2 border-2 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <RxCross2
                size={20}
                onClick={() => {
                  setIsOpen(false);
                  setSearchTerm("");
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
                  {filteredItems.map((item) => (
                    <tr
                      key={item.code}
                      className={`${
                        selectedRow === item ? "bg-gray-100" : ""
                      } border cursor-pointer`}
                      onClick={() => handleSelectRow(item)}
                    >
                      <td>{item.code}</td>
                      <td>{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="bg-green-500 text-white flex justify-end mx-4 w-25 py-1 px-4 my-2 rounded-lg font-semibold"
              onClick={handleOK}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ListModal;
