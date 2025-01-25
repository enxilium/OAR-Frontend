'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Myriad Pro, sans-serif',
    },
    palette: {
        primary: {
            main: '#ffffff', // Primary color
        },
        secondary: {
            main: '#8b8e9c', // Secondary color
        },
        background: {
            default: '#040211', // Background color
        },
        text: {
            primary: '#8b8e9c', // Text color
            secondary: '#8b8e9c',
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInput-underline:before': {
                        borderBottomColor: 'grey', // Default underline color
                    },
                    '& .MuiInput-underline:hover:before': {
                        borderBottomColor: '#8b8e9c', // Underline color on hover
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: '#3874e1', // Underline color when focused
                    },
                    '& .MuiInputBase-input': {
                        color: '#8b8e9c', // Default text color
                    },
                    '& .MuiInputBase-input::placeholder': {
                        color: '#8b8e9c', // Placeholder text color
                    },
                    '& .MuiInputBase-input:focus': {
                        color: '#3874e1', // User input color when focused
                    },
                    // Placeholder text when focused
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#3874e1',
                    },
                },
            },
        },

        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff', // Button background color
                    '&:hover': {
                        backgroundColor: '#3874e1', // Button background color on hover
                        color: '#ffffff', // Button text color on hover
                    },
                },
            },
        },

        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    borderRadius: '0.5rem', // Border radius
                    backgroundColor: '#23293b', // Default background color
                },
            },
        },

        MuiToggleButton: {
            styleOverrides: {
                root: {
                    color: '#8b8e9c', // Default text color
                    '&.Mui-selected': {
                        color: '#ffffff', // Selected text color
                    },
                },
            },
        }
    },
});

export default theme;