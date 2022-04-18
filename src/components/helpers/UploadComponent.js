import React, { useState } from "react";
import { Avatar, Tooltip, Typography, IconButton, Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDropzone } from 'react-dropzone';


const UploadComponent = ({ field, form, ...other }) => {
    const currentError = form.errors[field.name];
    const [imageURL, setImageURL] = useState([]);
    const reader = new FileReader();
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/*",
        onDrop: acceptedFiles => {
            const newImageUrl = [];
            reader.readAsDataURL(acceptedFiles[0]);
            reader.onload = e => {
                form.setFieldValue("profilePicture", reader.result);
                newImageUrl.push(reader.result);
            }
            setImageURL(newImageUrl);

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
                    <Avatar className="content-center form-group-spaced" src={field.value} sx={{ width: 100, height: 100 }} />
                    <Typography variant="body1" sx={{ textAlign: "center" }}>Upload image</Typography>

                </div>
            </Tooltip>
        </Stack>
    )
}

export default UploadComponent;