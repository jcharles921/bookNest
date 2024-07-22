export interface ColorsType {
  light: {
    primary: string;
    text: string;
    icon: string;
    button: string;
    background: string;
    border: string;
    secondaryText: string;
    authBackground: string;
    active: string;
    buttonText:string;
  };
  dark: {
    primary: string;
    text: string;
    icon: string;
    button: string;
    background: string;
    border: string;
    secondaryText: string;
    authBackground: string;
    active: string;
    buttonText:string;
  };
}

const Colors: ColorsType = {
  light: {
    primary: "#FFFFFF",
    text: "#000000",
    icon: "#000000",
    button: "#ADD8E6",
    background: "#F5F5F5",
    border: "#E0E0E0",
    secondaryText: "#757575",
    active: "#000000",
    authBackground: "#E4F1F8",
    buttonText:"#000000"
  },
  dark: {
    primary: "#000000",
    icon: "#ffffff",
    text: "#FFFFFF",
    button: "#ADD8E6",
    background: "#1E1E1E",
    border: "#3C3C3C",
    secondaryText: "#B0B0B0",
    authBackground: "#1E1E1E",
    active: "#ADD8E6",
    buttonText:"#ffffff"
  },
};

export default Colors;
