import { createMuiTheme } from '@material-ui/core/styles';

const colorGreen = '#24A810';
const colorBlack = '#323a45';
const colorWhite = '#ffffff';
const colorGreyDark = '#74787d';
const colorGreyDark1 = '#888888';
const colorGreyLight = '#dbdbdb';
const colorDarkBg = '#2b2b35';
const colorLightBg = '#f8f8f8';

const theme = createMuiTheme({
    palette: {
        common: {
            colorGreen,
            colorBlack,
            colorWhite,
            colorGreyDark,
            colorGreyLight,
            colorDarkBg,
            colorLightBg,
            colorGreyDark1
        },
        primary: {
            main: colorGreen
        },
        secondary: {
            main: '#FF3346'
        }
    },
    layouts: {
        container: {
            maxWidth: '1140px',
            margin: '0 auto',
            height: '100%',
            padding: '0 16px'
        },
        sectionPadding: {
            padding: '56px 0'
        }
    }
});

export default theme;
