import React from "react";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Button from '@mui/material/Button';


export default function LoadingButton({type, loading, onClick, children}) {
    return (
        <Box sx={{ position: 'relative' }}>
            <Button
                type={type}
                variant="contained"
                disabled={loading}
                onClick={onClick}
                style={{
                    width: '100%',
                }}
                size="large"
            >
                {children}
            </Button>
            {loading && ( <CircularProgress
                size={24}
                sx={{
                    color: green[500],
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                }}
            />
            )}
      </Box>
    );
}