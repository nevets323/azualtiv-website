import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';

function Navbar() {
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Azualtiv
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/models">
            Models
          </Button>
          <Button color="inherit" component={RouterLink} to="/fanart">
            Fan Art
          </Button>
          <Button color="inherit" component={RouterLink} to="/portfolio">
            Portfolio
          </Button>
          {currentUser ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;