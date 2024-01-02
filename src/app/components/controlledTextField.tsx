import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { InputHTMLAttributes } from "react";
interface inputProps extends InputHTMLAttributes<HTMLInputElement> {
  control: any;
  type: React.HTMLInputTypeAttribute;
  label: string;
  name: string;
}
export const FormInputText: React.FC<inputProps> = ({
  name,
  control,
  type,
  label,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          //@ts-ignore
          size="small"
          type={type}
          error={!!error}
          onChange={onChange}
          value={value}
          label={label}
          variant="standard"
          {...props}
        />
      )}
    />
  );
};
