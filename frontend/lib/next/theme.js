import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';


const darkBlueGrey = '#2b3d51';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  textShadow: {
    default: '0px 0px 5px rgba(0, 0, 0, 0.9)',
  },
  palette: {
    white: 'white',
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
      darkest: darkBlueGrey,
    },
    appBar: {
      main: darkBlueGrey,
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
});

export default theme;
