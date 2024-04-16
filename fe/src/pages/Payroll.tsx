import React, { useState } from "react";
import { provincesData } from "../constants";

// const provincesData: TProvince[] = [
//   {
//     name: 'Province 1',
//     districts: [
//       {
//         name: 'Bhojpur',
//         municipalities: ['Bhojpur Municipality', 'Shadananda Municipality', 'Tyamke Maiyun Municipality', /* Add more municipalities */],
//       },
//       // Add more districts for Province 1
//     ],
//   },
//   // Add more provinces
// ];

const AddressForm: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>("");

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict("");
    setSelectedMunicipality("");
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setSelectedMunicipality("");
  };

  const handleMunicipalityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedMunicipality(e.target.value);
  };

  return (
    <div className="flex items-center gap-8 p-4">
      <label htmlFor="province">Province:</label>
      <select
        id="province"
        value={selectedProvince}
        onChange={handleProvinceChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 mb-5 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option value="">Select Province</option>
        {provincesData.map((province) => (
          <option key={province.name} value={province.name}>
            {province.name}
          </option>
        ))}
      </select>

      <label htmlFor="district">District:</label>
      <select
        id="district"
        value={selectedDistrict}
        onChange={handleDistrictChange}
        disabled={!selectedProvince}
        className="bg-gray-50 border border-gray-300 text-gray-900 mb-5 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option value="">Select District</option>
        {selectedProvince &&
          provincesData
            .find((province) => province.name === selectedProvince)
            ?.districts.map((district) => (
              <option key={district.name} value={district.name}>
                {district.name}
              </option>
            ))}
      </select>

      <label htmlFor="municipality">Municipality/VDC:</label>
      <select
        id="municipality"
        value={selectedMunicipality}
        onChange={handleMunicipalityChange}
        disabled={!selectedDistrict}
        className="bg-gray-50 border border-gray-300 text-gray-900 mb-5 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option value="">Select Municipality/VDC</option>
        {selectedDistrict &&
          provincesData
            .find((province) => province.name === selectedProvince)
            ?.districts.find((district) => district.name === selectedDistrict)
            ?.municipalities.map((municipality) => (
              <option key={municipality} value={municipality}>
                {municipality}
              </option>
            ))}
      </select>
    </div>
  );
};

export default AddressForm;
