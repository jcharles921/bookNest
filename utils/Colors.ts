export interface ColorsType {
  light: {
    primary: string;
    text: string;
    text2: string;
    icon: string;
    button: string;
    background: string;
    background2: string;
    border: string;
    secondaryText: string;
    authBackground: string;
    active: string;
    buttonText: string;
    placeholder: string;
  };
  dark: {
    primary: string;
    text: string;
    text2: string;
    icon: string;
    button: string;
    background: string;
    background2: string;
    border: string;
    secondaryText: string;
    authBackground: string;
    active: string;
    buttonText: string;
    placeholder: string;
  };
}

const Colors: ColorsType = {
  light: {
    primary: "#FAF3F3",  // Soft pinkish-white
    text: "#4A4A4A",  // Dark slate gray
    text2: "#7D7D7D",  // Medium gray for secondary text
    icon: "#5F5F5F",  // Gray for icons
    button: "#FF6F61",  // Coral for buttons
    background: "#FBE8E8",  // Light pink for background
    background2: "#F7F7F7",  // Very light gray for secondary background
    border: "#E0E0E0",  // Light gray for borders
    secondaryText: "#9B9B9B",  // Light gray for secondary text
    authBackground: "#FBE8E8",  // Light pink for auth background
    active: "#FF7043",  // Vivid coral for active elements
    buttonText: "#FFFFFF",  // White text for buttons
    placeholder: "#C1C1C1"  // Light gray for placeholders
  },
  dark: {
    primary: "#2E2E2E",  // Charcoal gray for primary
    text: "#E5E5E5",  // Light gray for text
    text2: "#B0B0B0",  // Medium light gray for secondary text
    icon: "#C0C0C0",  // Light silver for icons
    button: "#FF6F61",  // Coral for buttons
    background: "#2C2C2C",  // Darker pinkish-gray for background
    background2: "#1A1A1A",  // Dark gray for secondary background
    border: "#3C3C3C",  // Dark gray for borders
    secondaryText: "#8A8A8A",  // Medium gray for secondary text
    authBackground: "#2C2C2C",  // Matching dark pinkish-gray for auth background
    active: "#FF7043",  // Vivid coral for active elements
    buttonText: "#2E2E2E",  // Dark gray text for buttons
    placeholder: "#7F7F7F"  // Medium gray for placeholders
  }
};

export default Colors;
