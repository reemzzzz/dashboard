// src/components/Otp.jsx
import React from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input'; 
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const VerificationCodeHandler = ({ value, onChange }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MuiOtpInput 
            length={6} 
            value={value} 
            onChange={onChange} 
            // Add styling for better visibility against your dark background
            sx={{
                '& .MuiOtpInput-TextField': {
                    '& input': {
                        color: colors.grey[100], 
                    },
                    '& fieldset': {
                        borderColor: colors.blueAccent[400] + ' !important',
                    },
                },
            }}
        />
    );
};

export default VerificationCodeHandler;