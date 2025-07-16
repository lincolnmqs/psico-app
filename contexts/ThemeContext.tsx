"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

type ThemeMode = "light" | "dark"

interface ThemeContextType {
  mode: ThemeMode
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeContextProvider")
  }
  return context
}

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>("light")

  useEffect(() => {
    // Carregar tema salvo do localStorage
    const savedTheme = localStorage.getItem("theme") as ThemeMode
    if (savedTheme) {
      setMode(savedTheme)
    } else {
      // Detectar preferência do sistema
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setMode(prefersDark ? "dark" : "light")
    }
  }, [])

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light"
    setMode(newMode)
    localStorage.setItem("theme", newMode)
  }

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: "#4CAF50",
      },
      secondary: {
        main: "#2E7D32",
      },
      background: {
        default: mode === "light" ? "#f5f5f5" : "#121212",
        paper: mode === "light" ? "#ffffff" : "#1e1e1e",
      },
    },
    typography: {
      fontFamily: "Inter, sans-serif",
    },
  })

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
