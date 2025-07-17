"use client"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  useTheme as useMuiTheme,
} from "@mui/material"
import {
  Psychology,
  Schedule,
  Payment,
  Assignment,
  Phone,
  Email,
  LocationOn,
  CheckCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material"
import Link from "next/link"
import { useTheme } from "@/contexts/ThemeContext"
import { COLORS, GRADIENTS } from "@/constants/colors"

export default function HomePage() {
  const { mode, toggleTheme } = useTheme()
  const muiTheme = useMuiTheme()

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: COLORS.PRIMARY_DARK }}>
        <Toolbar>
          <Psychology sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PsicoSystem
          </Typography>
          <Button color="inherit" component={Link} href="/">
            Início
          </Button>
          <Button color="inherit" component={Link} href="#servicos">
            Serviços
          </Button>
          <Button color="inherit" component={Link} href="#contato">
            Contato
          </Button>
          <IconButton color="inherit" onClick={toggleTheme} sx={{ ml: 1 }}>
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <Button variant="outlined" color="inherit" component={Link} href="/login" sx={{ ml: 2 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: mode === "dark" ? GRADIENTS.PRIMARY_DARK : GRADIENTS.PRIMARY_LIGHT,
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Sistema Completo para Psicólogos
          </Typography>
          <Typography variant="h5" component="p" sx={{ mb: 4, opacity: 0.9 }}>
            Gerencie seus pacientes, agendamentos e documentos de forma profissional e segura
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            href="/login"
            sx={{
              backgroundColor: "white",
              color: "#3A5BA0",
              px: 4,
              py: 1.5,
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            Começar Agora
          </Button>
        </Container>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 8 }} id="servicos">
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          Funcionalidades
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Tudo que você precisa para gerenciar sua prática clínica
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
              <CardContent>
                <Assignment sx={{ fontSize: 48, color: COLORS.PRIMARY, mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  Prontuário Digital
                </Typography>
                <Typography color="text.secondary">
                  Mantenha registros detalhados e seguros de todos os seus pacientes
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
              <CardContent>
                <Payment sx={{ fontSize: 48, color: COLORS.PRIMARY, mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  Controle Financeiro
                </Typography>
                <Typography color="text.secondary">
                  Gerencie pagamentos e mantenha controle financeiro completo
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
              <CardContent>
                <Schedule sx={{ fontSize: 48, color: COLORS.PRIMARY, mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  Agendamento Online
                </Typography>
                <Typography color="text.secondary">
                  Sistema completo de agendamento com confirmações automáticas
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
              <CardContent>
                <CheckCircle sx={{ fontSize: 48, color: COLORS.PRIMARY, mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  Contratos Digitais
                </Typography>
                <Typography color="text.secondary">
                  Gerencie contratos de sessão de forma digital e organizada
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
              <CardContent>
                <Psychology sx={{ fontSize: 48, color: COLORS.PRIMARY, mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  Devolutivas
                </Typography>
                <Typography color="text.secondary">
                  Crie e gerencie devolutivas profissionais para seus pacientes
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: "100%", textAlign: "center", p: 2 }}>
              <CardContent>
                <Assignment sx={{ fontSize: 48, color: COLORS.PRIMARY, mb: 2 }} />
                <Typography variant="h5" component="h3" gutterBottom>
                  Relatórios
                </Typography>
                <Typography color="text.secondary">Gere relatórios detalhados sobre sua prática clínica</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Contact Section */}
      <Box sx={{ backgroundColor: muiTheme.palette.mode === "dark" ? "#1e1e1e" : "#f5f5f5", py: 8 }} id="contato">
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Entre em Contato
          </Typography>
          <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
            Estamos aqui para ajudar você a modernizar sua prática clínica
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: "center", height: "100%" }}>
                <Phone sx={{ fontSize: 48, color: COLORS.PRIMARY, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Telefone
                </Typography>
                <Typography color="text.secondary">(11) 9999-9999</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: "center", height: "100%" }}>
                <Email sx={{ fontSize: 48, color: COLORS.PRIMARY, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Email
                </Typography>
                <Typography color="text.secondary">contato@psicosystem.com.br</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: "center", height: "100%" }}>
                <LocationOn sx={{ fontSize: 48, color: COLORS.PRIMARY, mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Endereço
                </Typography>
                <Typography color="text.secondary">São Paulo, SP</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ backgroundColor: COLORS.PRIMARY_DARK, color: "white", py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Psychology sx={{ mr: 1 }} />
                <Typography variant="h6">PsicoSystem</Typography>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Sistema completo para gestão de consultórios de psicologia. Profissional, seguro e fácil de usar.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Links Úteis
              </Typography>
              <List dense>
                <ListItem disablePadding>
                  <ListItemText primary="Política de Privacidade" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Termos de Uso" />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary="Suporte Técnico" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3, backgroundColor: "rgba(255,255,255,0.2)" }} />
          <Typography variant="body2" textAlign="center" sx={{ opacity: 0.8 }}>
            © 2024 PsicoSystem. Todos os direitos reservados.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}
