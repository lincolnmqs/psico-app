// Cores principais do sistema
export const COLORS = {
  // Azul suave - Cor principal
  PRIMARY: "#5C8DFF",           // Azul psicologia
  PRIMARY_DARK: "#3A5BA0",      // Azul mais escuro
  PRIMARY_DARKER: "#22335C",    // Azul ainda mais escuro
  PRIMARY_LIGHT: "#A7C7FF",     // Azul claro
  PRIMARY_LIGHTER: "#E3ECFF",   // Azul bem suave

  // Backgrounds com azul
  PRIMARY_BACKGROUND: "#F5F8FF",
  PRIMARY_BACKGROUND_ALPHA: "rgba(92, 141, 255, 0.15)",

  // Cores de status (tons suaves)
  SUCCESS: "#6FCF97",                // Verde suave
  SUCCESS_BACKGROUND: "#E6F9F0",
  WARNING: "#FFB366",                // Laranja suave
  WARNING_BACKGROUND: "#FFF6E5",
  ERROR: "#FF6B6B",                  // Vermelho suave
  ERROR_BACKGROUND: "#FFECEC",
  INFO: "#56CCF2",                   // Azul claro
  INFO_BACKGROUND: "#E6F7FB",

  // Cores neutras
  WHITE: "#ffffff",
  LIGHT_GRAY: "#F7F7FA",
  MEDIUM_GRAY: "#E0E3EA",
  DARK_GRAY: "#4A4A4A",

  // Cores para modo escuro
  DARK_BACKGROUND: "#181C25",
  DARK_PAPER: "#23283A",

  // Transparências
  WHITE_ALPHA_10: "rgba(255,255,255,0.1)",
  WHITE_ALPHA_20: "rgba(255,255,255,0.2)",
  BLACK_ALPHA_10: "rgba(0,0,0,0.1)",
} as const

// Gradientes
export const GRADIENTS = {
  PRIMARY_LIGHT: "linear-gradient(135deg, #5C8DFF 0%, #A7C7FF 100%)",
  PRIMARY_DARK: "linear-gradient(135deg, #3A5BA0 0%, #22335C 100%)",
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
