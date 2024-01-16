import React, {useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import { useLocation, useNavigate } from 'react-router-dom';

import LogoImg from '../images/logo.png'

const pages = ['Home', 'Services', 'Shop', 'Book now'];
const settings = ['Profile','Dashboard', 'Logout']; //'Account'
const pageRoutes = {
    'Home': '/',
    'Services': '/services',
    'Book now': '/book-now',
    'Shop': '/purchase',
}

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Store login status
  const location = useLocation();
  const navigate = useNavigate();
  const isUser = localStorage.getItem("roles") === "user"; 

  const handleMenuClick = (setting) => {
    if (setting === "Logout") {
      handleLogout();
    } else if (setting === "Profile") {
      navigate('/profile'); 
    } else if (setting === "Dashboard" && !isUser) {
      window.open("http://localhost:3001/#/dashboard");
    } 
  };

  // check login status
  useEffect(() => {
    const username = localStorage.getItem("username");
    const uid = localStorage.getItem("uid");
    if (username && uid) {
      setLoggedInUser({ username, uid });
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);
  
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("uid");
    setIsLoggedIn(false);
  };


  return ( 
    <AppBar position="static" sx={{ backgroundColor: '#F8F7F6'}}>
      <Container maxWidth="xl">
      <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 7,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={LogoImg} alt="Logo" sx={{ display: { xs: 'none', md: 'flex' }, height: 50, mr: 2 }} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#695b49"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" 
                    component={Link} 
                    to={pageRoutes[page]}
                    sx={{ textDecoration: 'none', color: 'inherit' }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>    
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img src={LogoImg} alt="Logo" sx={{ display: { xs: 'none', md: 'flex' }, height: 50, mr: 2 }} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.filter(page => page !== 'Book now').map((page) => (
              <Button
                key={page}
                component={Link}
                to={pageRoutes[page]}
                onClick={handleCloseNavMenu}
                sx={{ my: 3, mr: 4, color: '#695b49', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

        
          {/* Book Now Button */}
          <Button
            component={Link}
            to={pageRoutes['Book now']}
            onClick={handleCloseNavMenu}
            sx={{ my: 3, mr: 2, color: 'white', backgroundColor: '#c0ab8e' }}
          >
            Book now
          </Button>

          {/* Login Button */}
          {!isLoggedIn && ( 
            <>
              <Button
                component={Link}
                to="/sign-in"
                onClick={handleCloseNavMenu}
                sx={{ my: 3, mr: 2, color: '#695b49' }}
              >
                Sign In
              </Button>

              {/* Sign Up Button */}
              <Button
                variant="outlined"
                component={Link}
                to="/sign-up"
                onClick={handleCloseNavMenu}
                sx={{ my: 3, mr: 2, color: '#695b49' }}
              >
                Sign Up
              </Button>
            </>
          )}

          {/* Avatar and Settings */}  
          {isLoggedIn && ( 
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>
                    {isLoggedIn && loggedInUser && loggedInUser.username ? loggedInUser.username[0].toUpperCase() : <PersonIcon />}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
               {settings.map((setting) => (
                 (setting !== 'Dashboard' || !isUser) && (
                  <MenuItem key={setting} onClick={() => handleMenuClick(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                )
              ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;