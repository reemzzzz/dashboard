import { Typography,Box,useTheme} from "@mui/material";
import {tokens} from "../theme";


const Header = ({title,subtitle}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box className=" m-3 p-3">
        <Typography className="!uppercase !text-xl md:!text-2xl !font-bold "
            color={colors.grey[100]}
        >
            {title}
        </Typography>
        <Typography className="!text-lg"
            color={colors.greenAccent[400]}
        >
            {subtitle}
        </Typography>
        </Box>
    );
};

export default Header;