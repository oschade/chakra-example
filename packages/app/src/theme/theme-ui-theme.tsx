const colors = {
  text: '#1F1F23',
  background: '#fff',
  primary: '#639',
  secondary: '#ff6347',
  modes: {
    dark: {
      // main text color
      text: '#fff',
      textAlt: '',

      // main brand color
      primary: '#435BED',
      // A secondary brand color for alternative styling
      secondary: '',

      // A contrast color for emphasizing UI
      accent: '',
      accentAlt: '',

      // main background color
      background: '#303036',
      backgroundAlt: '#303036',
      // background color for ui elements like navbar
      surface: '#1F1F23',
      surfaceAlt: '#1F1F23',
      // A background color for highlighting text
      // e.g. nav-bar-item background
      highlight: '',
      highlightAlt: '',
      // A faint color for backgrounds, borders, and accents that do not require high contrast with the background color
      // e.g. code background
      muted: '',
      mutedAlt: '',

      // feedback colors
      success: '',
      successAlt: '',
      warning: '',
      warningAlt: '',
      error: '',
      errorAlt: '',
      information: '',
      informationAlt: '',
    },
  },
}

const heading = {
  color: 'text',
  fontFamily: 'heading',
  lineHeight: 'heading',
  fontWeight: 'heading',
}

export default {
  colors,
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  radii: [0, 2, 4],
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Inter", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    h1: {
      ...heading,
      fontSize: 5,
    },
    h2: {
      ...heading,
      fontSize: 4,
    },
    h3: {
      ...heading,
      fontSize: 3,
    },
    h4: {
      ...heading,
      fontSize: 2,
    },
    h5: {
      ...heading,
      fontSize: 1,
    },
    h6: {
      ...heading,
      fontSize: 0,
    },
    p: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
    a: {
      color: 'primary',
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    img: {
      maxWidth: '100%',
    },
  },
}
