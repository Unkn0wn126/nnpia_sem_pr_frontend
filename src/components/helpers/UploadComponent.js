import React, { useState } from "react";
import { Avatar, Tooltip, Typography, IconButton, Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDropzone } from 'react-dropzone';


const UploadComponent = ({ field, form, ...other }) => {
    const currentError = form.errors[field.name];
    const [imageURL, setImageURL] = useState([]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/*",
        onDrop: acceptedFiles => {
            const newImageUrl = [];
            newImageUrl.push(URL.createObjectURL(acceptedFiles[0]));
            setImageURL(newImageUrl);
            form.setFieldValue("profilePicture", btoa(newImageUrl));
        }
    });

    return (
        <Stack alignItems="center">
            {field.value && (
                <Tooltip title="Remove image">
                    <IconButton onClick={() => {
                        form.setFieldValue("profilePicture", null);
                        setImageURL([]);
                    }}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            )}
            <Tooltip title="Click or drag to upload image">
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <Avatar className="content-center form-group-spaced" src={imageURL[0]} sx={{ width: 100, height: 100 }} />
                    <Typography variant="body1" sx={{ textAlign: "center" }}>Upload image</Typography>

                </div>
            </Tooltip>
        </Stack>
    )
}

export default UploadComponent;