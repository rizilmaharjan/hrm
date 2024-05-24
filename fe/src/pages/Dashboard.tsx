import Calendar from "../components/Calendar";
import DynamicSidebar from "../components/DynamicSidebar";
import EmployeeSidebar from "../components/EmployeeSidebar";
import Notice from "../components/Notice";
import coverPage from "/hr.jpg";
export default function Dashboard() {
  return (
    <>
      {/* <DynamicSidebar /> */}
      {/* <EmployeeSidebar /> */}
      <div className="flex flex-col">
        <header className="w-fit mx-auto mt-10 leading-10 ">
          <h1 className="text-2xl font-semibold">
            B.P. Koirala Institute Of Health Science
          </h1>
          <p className="text-lg text-center">Ghopa, Dharan</p>
        </header>
        {/* <div className="w-6/12 mx-auto mt-10">
          <img className="block" src={coverPage} alt="" />
        </div> */}
        <div className="flex justify-between">
          <div className="h-full w-4/6">
            <Calendar />
          </div>
          <div className="h-full w-2/6 mr-4">
            <Notice />
          </div>
        </div>
      </div>
    </>
  );
}
