import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1c1c1c', padding: 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RAPIDHUNT
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Stanford University, Stanford.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ marginRight: 2 }}>
            Questions: 24 Answered: 20 Mark for Review: 07 Skipped: 06
          </Typography>
          <Button variant="contained" color="error" sx={{ marginRight: 2 }}>
            Finish
          </Button>
          <Typography variant="body2">30:45</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header