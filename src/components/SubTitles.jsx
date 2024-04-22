import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const SubTitles = ({ titleCategory, subtitleCategory, subCategory }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="10px">
      <Typography
        variant="h3"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{
          m: "0 0 5px 0",
          whiteSpace: "nowrap",
          fontSize: "2.25rem",
        }}
      >
        {titleCategory}
      </Typography>
      <Typography
        variant="h5"
        color={colors.greenAccent[400]}
        sx={{
          m: "0 0 5px 0",
          whiteSpace: "nowrap",
          fontSize: "1.25rem",
        }}
      >
        {subtitleCategory}
      </Typography>
      <Typography
        variant="h5"
        color={colors.redAccent[200]}
        sx={{
          m: "0 0 5px 0",
          whiteSpace: "nowrap",
          fontSize: "1.25rem",
          fontStyle: "italic",
        }}
      >
        {subCategory}
      </Typography>
    </Box>
  );
};

export default SubTitles;
