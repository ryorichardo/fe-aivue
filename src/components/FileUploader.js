import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import BackupOutlinedIcon from '@mui/icons-material/BackupOutlined';

function FileUploader({ file, setFile, onUploaded, otherProps }) {
    const [uploadedFile, setUploadedFile] = useState();
    const payload = new FormData();

    const onDrop = useCallback(async (file) => {
        setFile(file[0]);
    }, []);

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        onDrop
    });

    acceptedFiles.map((file) => {
        payload.append('pdf', file, file.name);
    });

    const accFile = acceptedFiles.map((file) => (
        <li key={file.name}>
            {file.name} - {file.size} bytes
        </li>
    ));

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(payload);
    };

    return (
        <section className="container">
            <Box
                sx={{
                    cursor: 'pointer'
                }}
                padding="5px"
                borderRadius="10px"
            >
                <Box
                    padding="25px"
                    borderRadius="10px"
                    border="2px dashed #0000004d"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    {...getRootProps()}
                >
                    <input {...otherProps} {...getInputProps()} />
                    <BackupOutlinedIcon sx={{ color: '#8e92bc' }} />
                    <Typography variant="caption">Drag and drop file here, or click to select file</Typography>
                </Box>
            </Box>
            {!!file && (
                <>
                    <Typography variant="h4" sx={{ marginTop: 2 }}>
                        File:
                    </Typography>
                    <ul>{accFile}</ul>
                </>
            )}
        </section>
    );
}

FileUploader.propTypes = {
    onUploader: PropTypes.func
};

export default FileUploader;
