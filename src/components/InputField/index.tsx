import { ChangeEvent, InputHTMLAttributes, forwardRef } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  placeholder?: string;
  checked?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { type, value, placeholder, checked, onChange, className, ...props },
    ref
  ) => {
    return (
      <input
        type={type}
        value={typeof value === "string" ? value : undefined}
        placeholder={placeholder}
        checked={typeof value === "boolean" ? value : checked}
        onChange={onChange}
        className={className}
        ref={ref}
        {...props}
      />
    );
  }
);
