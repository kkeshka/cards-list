import { SxProps, TextField, styled } from "@mui/material";
import { ChangeEvent, HTMLInputTypeAttribute } from "react";

const Wrapper = styled(TextField)`
`

interface ITextField {
  value?: number | string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  sx?: SxProps;
  error?: boolean,
  helperText?: string;
  dataTestId?: string;
}

function StyledTextField({
  value,
  onChange,
  type = 'text',
  placeholder,
  sx,
  error = false,
  helperText,
  dataTestId,
}: ITextField) {
  return (
    <Wrapper
      value={value}
      InputProps={{
        inputProps: {
          placeholder,
          'data-test-id': dataTestId,
        },
      }}
      type={type}
      sx={sx}
      error={error}
      helperText={error && helperText}
      onChange={onChange}
    />
  )
}

export default StyledTextField;