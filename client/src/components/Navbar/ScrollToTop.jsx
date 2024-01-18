import { Box, Fab, Fade, useScrollTrigger } from "@mui/material";
import KeyboardArrowUpOutlined from "@mui/icons-material/KeyboardArrowUpOutlined";

const ScrollToTop = () => {
  const trigger = useScrollTrigger();

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpOutlined />
        </Fab>
      </Box>
    </Fade>
  );
};

export default ScrollToTop;
