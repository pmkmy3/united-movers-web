import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import { useLoading } from '../../context/loadingContext'; // Adjust the import path as necessary

const GlobalLoadingSpinner = () => {
    const { loading } = useLoading();

    if (!loading) return null;

    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
            }}
        >
            <CircularProgress />
        </Box>
    );
};

export default GlobalLoadingSpinner;