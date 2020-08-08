const Palette = {
  // Palette
  redLight: '#eb0000',
  redDark: '#a50000',
  white: '#ffffff',
  black: '#000000',
  transparent: '#00000000',
  grayExtralight: '#e9e9e9',
  gray: '#8c8c8c',
  grayDark: '#505050',
  lightGreyText: '#d5dbeb',
  deepOceanColor: '#31425d', // TODO: delete this (blueWood - the same)
  lightGreyPaper: '#eaedf4',

  // new Palette
  bluePacific: '#009fc7',
  bgLightGray: '#f4f5f8',
  middleLigthGray: '#e9eaed',
  grayLight: '#cccccc',
  blueWood: '#31425d',
  redCvs: '#cc0000',

  // neomorph components colors
  neomorphShadow: '#abb0bc',
  neomorphLight: '#ffffff',
  neomorphBackground: '#f0f1f5',
};

// EXPERIMENT COLORS HANDLING
const UIColors = {
  wheel: {
    inactiveSection: '#95a6bf',
    activeSection: '#dce1ef',
    sectionTitle: '#95a6bf',
    background: Palette.bgLightGray,
  },
  entry: {
    red: '',
    yellow: '',
    green: '',
  },
  widget: {
    background: Palette.lightGreyPaper,
    title: Palette.blueWood,
    value: Palette.blueWood,
  },
  input: {
    placeholder: '#c4cada',
  },
};

const ColorHierarchy = {
  mainBg: Palette.bgLightGray,
  statusBar: Palette.middleLigthGray,
  accent1: Palette.bluePacific, // TODO: rename to accentPrimary
  error: Palette.redCvs,
};

const Colors = { ...Palette, ...ColorHierarchy, ...UIColors };

export default Colors;
