type TProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};
export default function Button({
  children,
  className,
  onClick,
  type,
  disabled,
}: TProps) {
  return (
    <>
      <button
        disabled={disabled}
        type={type}
        className={className}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}
