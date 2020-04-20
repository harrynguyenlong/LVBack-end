import { createMuiTheme } from '@material-ui/core/styles';

const colorGreen = '#24A810';
const colorBlack = '#323a45';
const colorWhite = '#ffffff';
const colorGreyDark = '#74787d';
const colorGreyDark1 = '#888888';
const colorGreyLight = '#dbdbdb';
const colorDarkBg = '#2b2b35';
const colorLightBg = '#f8f8f8';
const colorRed = '#ff3232';

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
            colorGreyDark1,
        },
        primary: {
            main: colorGreen,
        },
        secondary: {
            main: '#FF3346',
        },
    },
    layouts: {
        container: {
            maxWidth: '975px',
            margin: '0 auto',
            height: '100%',
            padding: '0 16px',
        },
        sectionPadding: {
            padding: '56px 0',
        },
    },
    shared: {
        btn: {
            padding: '6px 16px',
            fontSize: '14px',
            fontWeight: 500,
            textTransform: 'capitalize',
            letterSpacing: '1px',
            cursor: 'pointer',
            outline: 'none',
            background: colorGreen,
            color: colorWhite,
            border: `1px solid ${colorGreen}`,
            transition: 'all 0.3s ease',
            borderRadius: '5px',
        },
        btnHover: {
            background: 'transparent',
            color: colorGreen,
        },
        btnActive: {
            transform: 'translateY(2px)',
        },
        errorInfo: {
            color: colorRed,
            fontSize: '12px',
            marginBottom: '10px',
        },
    },
});

export default theme;
