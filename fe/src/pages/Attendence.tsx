import { useState } from "react";
import Report from "../components/modal/Report";

const Attendence = () => {
  const [openReport, setOpenReport] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setOpenReport(true)}>Open</button>
      {openReport && (
        <Report openReport={openReport} setOpenReport={setOpenReport} />
      )}
    </>
  );
};

export default Attendence;
