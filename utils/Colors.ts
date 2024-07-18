export interface ColorsType {
    light: {
      primary: string;
      text: string;
      button: string;
      background: string;
      border: string;
      secondaryText: string;
    };
    dark: {
      primary: string;
      text: string;
      button: string;
      background: string;
      border: string;
      secondaryText: string;
    };
  }
  
  const Colors: ColorsType = {
    light: {
      primary: '#FFFFFF',
      text: '#000000',
      button: '#ADD8E6',
      background: '#F5F5F5',
      border: '#E0E0E0',
      secondaryText: '#757575',
    },
    dark: {
      primary: '#000000',
      text: '#FFFFFF',
      button: '#ADD8E6',
      background: '#1E1E1E',
      border: '#3C3C3C',
      secondaryText: '#B0B0B0',
    },
  };
  
  export default Colors;
  