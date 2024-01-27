import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  Divider,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import SearchIcon from "@mui/icons-material/Search";
import { logOut } from "../../features/api/apiSlice";
import { Search, SearchIconWrapper, StyledInputBase } from "./styles";
import { Logout, PersonAdd } from "@mui/icons-material";
import { getPostsBySearch } from "../../features/api/dealSlice";

const Navbar = () => {
  const pages = ["Home", "Deals", "Gutscheine"];

  const { user } = useSelector((state) => state.user);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const trigger = useScrollTrigger();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = async (e) => {
    e.preventDefault();
    await handleClose();
    try {
      const resp = await dispatch(logOut());
      navigate("/");

      return resp;
    } catch (error) {
      console.log(error);
    }
  };

  const searchPost = async () => {
    if (search.trim()) {
      await dispatch(getPostsBySearch({ searchQuery: search }));
      navigate(`search?searchQuery=${search || "none"}`);
    } else {
      navigate("/");
    }
  };
  const handleKeyPress = (e) => {
    if (search === "" && e.key === 46) {
      navigate(`search?searchQuery=${"none"}`);
    }
    searchPost();

    if (e.keyCode === 13) {
      searchPost();
    } // searchDeal
  };

  return (
    <>
      <Toolbar id="back-to-top-anchor" />
      <Slide appear={true} direction="down" in={!trigger}>
        <AppBar position="fixed">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <HolidayVillageIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              />
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
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                }}
              >
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
                  onKeyDown={handleKeyPress}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar
                        sx={{ width: 32, height: 32 }}
                        alt="profile"
                        src={user && user.profileBild}
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "10px" }}
                    id="account-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                      desktopPaper: {
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                          mt: 1.5,
                          "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                          },
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem
                      component={Link}
                      to="/Profile"
                      onClick={handleClose}
                    >
                      <Avatar /> Profile
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/create"
                      onClick={handleClose}
                    >
                      <ListItemIcon>
                        <PersonAdd fontSize="small" />
                      </ListItemIcon>
                      Add new Deal
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={(e) => handleSignOut(e)}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                    {/* {settings.map((setting) => (
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
                    ))} */}
                  </Menu>
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </Slide>
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
