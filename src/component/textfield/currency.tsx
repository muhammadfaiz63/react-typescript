import React from 'react';
import {NumericFormat} from 'react-number-format';
import {TextField} from '@mui/material';

const NumberFormatCustom = React.forwardRef<typeof NumericFormat>(function NumberFormatCustom(props: any, ref) {
  const {onChange, ...other} = props;
  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values: any) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      prefix="Rp"
    />
  );
});

interface CustomProps {
  value: number;
  onChange: (n: number) => void;
}
const CurrencyTextField: React.FC<CustomProps> = ({value, onChange}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parseFloat(event.target.value));
  };

  return (
    <TextField
      value={value}
      onChange={handleChange}
      variant="outlined"
      fullWidth
      margin="normal"
      name="numberformat"
      InputProps={{
        inputComponent: NumberFormatCustom as any,
      }}
    />
  );
};
export default CurrencyTextField;
