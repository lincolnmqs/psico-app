// Cores principais do sistema
export const COLORS = {
  // Verde - Cor principal
  PRIMARY: "#4CAF50",
  PRIMARY_DARK: "#2E7D32",
  PRIMARY_DARKER: "#1B5E20",
  PRIMARY_LIGHT: "#81C784",
  PRIMARY_LIGHTER: "#C8E6C9",

  // Backgrounds com verde
  PRIMARY_BACKGROUND: "#E8F5E8",
  PRIMARY_BACKGROUND_ALPHA: "rgba(76, 175, 80, 0.2)",

  // Cores de status
  SUCCESS: "#4CAF50",
  SUCCESS_BACKGROUND: "#E8F5E8",
  WARNING: "#FF9800",
  WARNING_BACKGROUND: "#FFF3E0",
  ERROR: "#F44336",
  ERROR_BACKGROUND: "#FFEBEE",
  INFO: "#2196F3",
  INFO_BACKGROUND: "#E3F2FD",

  // Cores neutras
  WHITE: "#ffffff",
  LIGHT_GRAY: "#f5f5f5",
  MEDIUM_GRAY: "#e0e0e0",
  DARK_GRAY: "#424242",

  // Cores para modo escuro
  DARK_BACKGROUND: "#121212",
  DARK_PAPER: "#1e1e1e",

  // Transparências
  WHITE_ALPHA_10: "rgba(255,255,255,0.1)",
  WHITE_ALPHA_20: "rgba(255,255,255,0.2)",
  BLACK_ALPHA_10: "rgba(0,0,0,0.1)",
} as const

// Gradientes
export const GRADIENTS = {
  PRIMARY_LIGHT: "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)",
  PRIMARY_DARK: "linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)",
} as const

// Cores por contexto de uso
export const THEME_COLORS = {
  SIDEBAR_HEADER: COLORS.PRIMARY,
  BUTTON_PRIMARY: COLORS.PRIMARY,
  BUTTON_PRIMARY_HOVER: COLORS.PRIMARY_DARK,
  SELECTED_ITEM: COLORS.PRIMARY_BACKGROUND,
  SELECTED_ITEM_TEXT: COLORS.PRIMARY_DARK,
  LINK_COLOR: COLORS.PRIMARY,
  ICON_PRIMARY: COLORS.PRIMARY,
} as const
