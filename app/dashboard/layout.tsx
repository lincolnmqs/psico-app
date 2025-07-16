"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  useTheme as useMuiTheme,
  useMediaQuery,
} from "@mui/material"
import {
  Menu as MenuIcon,
  Dashboard,
  Assignment,
  Payment,
  Schedule,
  CheckCircle,
  Description,
  Psychology,
  AccountCircle,
  Logout,
  Settings,
  Brightness4,
  Brightness7,
} from "@mui/icons-material"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useTheme } from "@/contexts/ThemeContext"
import { COLORS } from "@/constants/colors"

const drawerWidth = 280

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, href: "/dashboard" },
  { text: "Prontuário", icon: <Assignment />, href: "/dashboard/prontuario" },
  { text: "Ficha de Pagamento", icon: <Payment />, href: "/dashboard/pagamento" },
  { text: "Link Agendamento", icon: <Schedule />, href: "/dashboard/agendamento" },
  { text: "Confirmação", icon: <CheckCircle />, href: "/dashboard/confirmacao" },
  { text: "Contrato da Sessão", icon: <Description />, href: "/dashboard/contrato" },
  { text: "Devolutiva", icon: <Psychology />, href: "/dashboard/devolutiva" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const muiTheme = useMuiTheme()
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"))
  const { mode, toggleTheme } = useTheme()

  useEffect(() => {
    // Verificar se está logado
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
    }
  }, [router])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userEmail")
    router.push("/login")
  }

  const drawer = (
    <Box>
      <Box sx={{ p: 2, textAlign: "center", backgroundColor: COLORS.PRIMARY, color: "white" }}>
        <Psychology sx={{ fontSize: 32, mb: 1 }} />
        <Typography variant="h6" noWrap component="div">
          PsicoSystem
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Sistema para Psicólogos
        </Typography>
      </Box>
      <Divider />
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              href={item.href}
              selected={pathname === item.href}
              sx={{
                borderRadius: 1,
                "&.Mui-selected": {
                  backgroundColor: mode === "dark" ? COLORS.PRIMARY_BACKGROUND_ALPHA : COLORS.PRIMARY_BACKGROUND,
                  color: COLORS.PRIMARY_DARK,
                  "& .MuiListItemIcon-root": {
                    color: COLORS.PRIMARY_DARK,
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: muiTheme.palette.background.paper,
          color: muiTheme.palette.text.primary,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {menuItems.find((item) => item.href === pathname)?.text || "Dashboard"}
          </Typography>

          {/* Theme Toggle */}
          <IconButton color="inherit" onClick={toggleTheme} sx={{ mr: 1 }}>
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32, backgroundColor: COLORS.PRIMARY }}>
              <AccountCircle />
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleProfileMenuClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Configurações
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Sair
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: "64px",
          backgroundColor: muiTheme.palette.background.default,
          minHeight: "calc(100vh - 64px)",
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
