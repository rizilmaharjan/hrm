import {
  FieldValues,
  UseFormRegister,
  FieldErrors,
  Path,
} from "react-hook-form";

type InputProps<T extends FieldValues> = {
  fieldName: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  placeHolder?: string;
  className?: string;
  setValueAs?: (v: string) => string | number;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  maxLength?: number;
};
export default function Input<T extends FieldValues>({
  fieldName,
  register,
  errors,
  placeHolder,
  className,
  setValueAs,
  type,
  onChange,
  checked,
  maxLength,
}: InputProps<T>) {
  return (
    <>
      <input
        type={type}
        placeholder={placeHolder}
        maxLength={maxLength}
        className={` ${
          errors[fieldName]
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : ""
        } ${className}`}
        {...register(fieldName as Path<T>, {
          setValueAs: setValueAs,
        })}
        onChange={onChange}
        checked={checked}
      />
      {errors[fieldName]?.message && (
        <p className="text-red-500 text-sm">{`${errors[fieldName]?.message}`}</p>
      )}
    </>
  );
}
