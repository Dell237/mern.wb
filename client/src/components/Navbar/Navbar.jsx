import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  Box,
  Container,
  Button,
  Tooltip,
  MenuItem,
  Avatar,
  Slide,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import SearchIcon from "@mui/icons-material/Search";
import { logOut } from "../../features/api/apiSlice";
import { Offset, Search, SearchIconWrapper, StyledInputBase } from "./styles";

const Navbar = () => {
  const pages = ["Home", "Deals", "Gutscheine"];

  const settings = [
    { id: 1, titel: "neu Deal", link: "/create" },
    { id: 2, titel: "Profile", link: "/Profile" },
    { id: 3, titel: "abmelden", link: "/" },
  ];

  const { user } = useSelector((state) => state.user);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const dispatch = useDispatch();
  const trigger = useScrollTrigger();

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
  const handleSignOut = async (e) => {
    e.preventDefault();
    await dispatch(logOut());
  };

  return (
    <>
      <Toolbar id="back-to-top-anchor" />
      <Slide appear={true} direction="down" in={!trigger}>
        <AppBar position="fixed" id="back-to-top-anchor">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Deals
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 0,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Deals
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              <Search sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  sx={{ p: 0, pr: 2 }}
                />
              </Search>
              {!user && (
                <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "flex" } }}>
                  <Button
                    component={Link}
                    to="/Sign-In"
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    login
                  </Button>
                </Box>
              )}
              {user && (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0, pr: 2 }}
                    >
                      <Avatar alt="profile" src={user && user.profileBild} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                        <Typography
                          component={Link}
                          to={setting.link}
                          textAlign="center"
                          onClick={(e) =>
                            setting.titel === "abmelden"
                              ? handleSignOut(e)
                              : null
                          }
                        >
                          {setting.titel}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </Slide>
      <Offset />
    </>
  );

  // return (
  //   <div className="bg-slate-200">
  //     <div className="flex justify-between items-center max-w-5xl mx-auto p-4">
  //       <Link to="/">
  //         <h1 className="font-bold ">Deals</h1>
  //       </Link>
  //       <ul className="flex gap-3 ">
  //         <Link to="/">
  //           <li>Home</li>
  //         </Link>

  //         {user ? (
  //           <>
  //             <Link to="/create">
  //               <li>neu Deal</li>
  //             </Link>
  //             <Link to="/About">
  //               <li>About</li>
  //             </Link>
  //             <Link to="/Profile">
  //               <img
  //                 src={user.profileBild}
  //                 alt="profile"
  //                 className="h-7 w-7 rounded-full object-cover"
  //               />
  //             </Link>
  //           </>
  //         ) : (
  //           <Link to="/Sign-In">
  //             <li>Sign In</li>
  //           </Link>
  //         )}
  //       </ul>
  //     </div>
  //   </div>
  // );
};

export default Navbar;
