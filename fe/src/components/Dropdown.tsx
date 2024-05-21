import React, { useState, useEffect, useRef } from "react";

export interface ItemProps {
  id: string;
  title: string;
}
export interface DropdownProps {
  items: ItemProps[];
  placeholder?: string;
  inputStyles?: string;
  dropdownStyles?: string;
  onSelect: (item: ItemProps) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  placeholder = "Search...",
  inputStyles = "",
  dropdownStyles = "",
  onSelect,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredItems = items?.filter((item) =>
    item.title.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSelect = (item: ItemProps) => {
    setSelectedItem(item);
    setShowDropdown(false);
    onSelect(item);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <input
        type="text"
        className={`px-4 py-2 border rounded-md ${inputStyles}`}
        placeholder={placeholder}
        value={selectedItem?.title || filter}
        onFocus={() => setShowDropdown(true)}
        onChange={(e) => {
          setFilter(e.target.value);
          setSelectedItem(null);
        }}
      />
      {showDropdown && (
        <div
          className={`absolute left-0 mt-2 max-h-48 w-full overflow-auto bg-white border rounded-md shadow-lg z-10 ${dropdownStyles}`}
        >
          {filteredItems?.length > 0 ? (
            filteredItems?.map((item) => (
              <a
                key={item.id}
                href="#"
                className="block px-4 py-2 hover:bg-gray-200"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(item);
                }}
              >
                {item.title}
              </a>
            ))
          ) : (
            <div className="px-4 py-2">No items found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
