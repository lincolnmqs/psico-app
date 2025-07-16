"use client"

import type React from "react"
import { useState } from "react"
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link as MuiLink,
  Divider,
  IconButton,
  useTheme as useMuiTheme,
} from "@mui/material"
import { Psychology, Visibility, VisibilityOff, Brightness4, Brightness7 } from "@mui/icons-material"
import { IconButton as MuiIconButton, InputAdornment } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "@/contexts/ThemeContext"
import { COLORS, GRADIENTS } from "@/constants/colors"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { mode, toggleTheme } = useTheme()
  const muiTheme = useMuiTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simulação de login - em produção, conectar com API real
    if (email === "psicologo@email.com" && password === "123456") {
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userEmail", email)
      router.push("/dashboard")
    } else {
      setError("Email ou senha incorretos")
    }

    setLoading(false)
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: mode === "dark" ? GRADIENTS.PRIMARY_DARK : GRADIENTS.PRIMARY_LIGHT,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        position: "relative",
      }}
    >
      {/* Theme Toggle */}
      <IconButton
        onClick={toggleTheme}
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          color: "white",
          backgroundColor: "rgba(255,255,255,0.1)",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.2)",
          },
        }}
      >
        {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
      </IconButton>

      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: 2,
            textAlign: "center",
            backgroundColor: muiTheme.palette.background.paper,
          }}
        >
          {/* Logo */}
          <Box sx={{ mb: 3 }}>
            <Psychology sx={{ fontSize: 48, color: COLORS.PRIMARY, mb: 1 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              PsicoSystem
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Faça login para acessar sua conta
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              autoComplete="email"
              autoFocus
            />

            <TextField
              fullWidth
              label="Senha"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MuiIconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </MuiIconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                backgroundColor: COLORS.PRIMARY,
                "&:hover": {
                  backgroundColor: COLORS.PRIMARY_DARK,
                },
              }}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>

            <Box sx={{ mt: 2 }}>
              <MuiLink href="#" variant="body2" sx={{ color: COLORS.PRIMARY }}>
                Esqueceu sua senha?
              </MuiLink>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body2" color="text.secondary">
              Não tem uma conta?{" "}
              <MuiLink href="#" sx={{ color: COLORS.PRIMARY }}>
                Cadastre-se aqui
              </MuiLink>
            </Typography>

            {/* Demo Credentials */}
            <Box
              sx={{
                mt: 3,
                p: 2,
                backgroundColor: muiTheme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "#f5f5f5",
                borderRadius: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>Credenciais de demonstração:</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: psicologo@email.com
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Senha: 123456
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Button component={Link} href="/" variant="text" sx={{ color: COLORS.PRIMARY }}>
              ← Voltar ao início
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}
