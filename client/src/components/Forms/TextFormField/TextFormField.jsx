import React from 'react';
import { useField } from 'formik';
import { TextField } from '@mui/material';

export default function TextFormField({label, ...props}) {

    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : null;

    return (
        <TextField
            label={label}
            fullWidth
            margin='normal'
            helperText = {errorText}
            error = {!!errorText}
            {...field}
        />
    )
}