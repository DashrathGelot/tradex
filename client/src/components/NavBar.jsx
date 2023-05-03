import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

export default function NavBar({user, logout}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <QueryStatsIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TradeX
          </Typography>
          { user && 
            <>
              <Typography variant="h6" component="div" style={{paddingRight: 10}}>
                {user}
              </Typography>
              <Button onClick={logout} color="primary" variant="contained">Log Out</Button>
            </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}