import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../../api";

const ProfileSummary = () => {
  const { id } = useParams<{ id: string }>();

  const { data: empOverview, refetch } = useFetchData(`/v1/employee/${id}`);
  const emp = empOverview?.data;
  const employee = emp?.[0];

  useEffect(() => {
    refetch();
  }, [refetch]);
  if (!employee) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="w-full max-w-lg">
        <div className="p-0">
          <div className="grid px-4 py-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10">
                <img
                  alt="Avatar"
                  className="rounded-full border"
                  height="40"
                  src="https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width="40"
                />
              </div>
              <div className="grid gap-1.5">
                <h2 className="text-base font-bold">
                  {employee.first_name} {employee.middle_name}{" "}
                  {employee.sur_name}
                </h2>
                <p className="text-sm text-gray-500">{employee.email}</p>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-x-2 gap-y-2 text-sm leading-2">
              <div className="font-medium">Joined</div>
              <div>Feb 15, 2018</div>
              <div className="font-medium">Designation</div>
              <div>Senior Product Manager</div>
              <div className="font-medium">Department</div>
              <div>Product Management</div>
              <div className="font-medium">Phone</div>
              <div>{employee.mobile}</div>
            </dl>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileSummary;
