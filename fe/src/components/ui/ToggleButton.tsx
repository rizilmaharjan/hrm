import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setIsEdit } from "../../redux/edit/editSlice";
const ToggleButton = () => {
  const dispatch = useAppDispatch();
  // State to manage the toggle state
  //   const [isToggled, setIsToggled] = useState(false);
  const { isEdit } = useAppSelector((state) => state.edit);

  // Function to handle toggle
  const handleToggle = () => {
    // setIsToggled(!isToggled);
    dispatch(setIsEdit(!isEdit));
  };

  return (
    <div className="flex items-center">
      {/* Toggle button */}
      <button
        className={`relative rounded-full w-12 h-6 transition-colors duration-200 focus:outline-none ${
          isEdit ? "bg-blue-500" : "bg-gray-400"
        }`}
        onClick={handleToggle}
      >
        {/* Toggle indicator */}
        <span
          className={`absolute left-0 bottom-0 inline-block w-6 h-6 transition-transform duration-200 transform rounded-full bg-white ${
            isEdit ? "translate-x-full" : "translate-x-0"
          }`}
        />
      </button>
      {/* Toggle label */}
      <span className="ml-2">{isEdit ? "ON" : "OFF"}</span>
    </div>
  );
};

export default ToggleButton;
