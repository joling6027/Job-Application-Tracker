import { Box } from "@mui/material";
import moment from 'moment/moment';

const Footer = () => {
  return (
    <footer>
    <Box>
        Copyright {moment().format('YYYY')} Joling Weng
    </Box>
    </footer>
   );
}
 
export default Footer;