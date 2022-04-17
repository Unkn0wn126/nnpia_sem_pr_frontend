import React, {  } from "react";
import { TextField as MUITextField } from "@mui/material"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DatePickerEditor = ({ field, form, ...other }) => {
    const currentError = form.errors[field.name];
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                clearable
                disablePast
                name={field.name}
                value={field.value}
                error={Boolean(currentError)}
                inputFormat="yyyy-MM-dd"
                onError={error => {
                    if (error !== currentError)
                        form.setFieldError(field.name, error);
                }}
                onChange={(newValue) => {
                    console.log(newValue);
                    form.setFieldValue(field.name, newValue, true);
                }}
                {...other}
                renderInput={(params) => <MUITextField {...params} />}
            />
        </LocalizationProvider>
    )
}

export default DatePickerEditor;