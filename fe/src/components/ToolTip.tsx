export default function ToolTip() {
  return (
    <div
      id="tooltip-default"
      role="tooltip"
      className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-red-500 rounded-lg shadow-sm"
    >
      Tooltip content
      <div className="tooltip-arrow" data-popper-arrow></div>
    </div>
  );
}
