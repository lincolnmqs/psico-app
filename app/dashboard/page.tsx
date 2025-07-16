"use client"
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  LinearProgress,
} from "@mui/material"
import { People, Schedule, Payment, Assignment, TrendingUp, AccessTime, Warning } from "@mui/icons-material"
import { COLORS } from "@/constants/colors"

const statsCards = [
  {
    title: "Pacientes Ativos",
    value: "24",
    icon: <People />,
    color: COLORS.PRIMARY,
    change: "+12%",
  },
  {
    title: "Sessões Este Mês",
    value: "89",
    icon: <Schedule />,
    color: "#2196F3",
    change: "+8%",
  },
  {
    title: "Receita Mensal",
    value: "R$ 12.450",
    icon: <Payment />,
    color: "#FF9800",
    change: "+15%",
  },
  {
    title: "Prontuários",
    value: "156",
    icon: <Assignment />,
    color: "#9C27B0",
    change: "+5%",
  },
]

const recentActivities = [
  {
    text: "Nova sessão agendada com Maria Silva",
    time: "2 horas atrás",
    icon: <Schedule />,
    status: "success",
  },
  {
    text: "Pagamento recebido de João Santos",
    time: "4 horas atrás",
    icon: <Payment />,
    status: "success",
  },
  {
    text: "Prontuário atualizado - Ana Costa",
    time: "1 dia atrás",
    icon: <Assignment />,
    status: "info",
  },
  {
    text: "Sessão cancelada - Pedro Lima",
    time: "2 dias atrás",
    icon: <Warning />,
    status: "warning",
  },
]

const upcomingAppointments = [
  {
    patient: "Maria Silva",
    time: "14:00",
    date: "Hoje",
    type: "Consulta Individual",
  },
  {
    patient: "João Santos",
    time: "15:30",
    date: "Hoje",
    type: "Terapia de Casal",
  },
  {
    patient: "Ana Costa",
    time: "09:00",
    date: "Amanhã",
    type: "Consulta Individual",
  },
  {
    patient: "Pedro Lima",
    time: "10:30",
    date: "Amanhã",
    type: "Avaliação Psicológica",
  },
]

export default function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 1,
                      backgroundColor: `${card.color}20`,
                      color: card.color,
                      mr: 2,
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {card.title}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {card.value}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TrendingUp sx={{ fontSize: 16, color: COLORS.SUCCESS, mr: 0.5 }} />
                  <Typography variant="body2" color="#4CAF50">
                    {card.change}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                    vs mês anterior
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: "400px" }}>
            <Typography variant="h6" gutterBottom>
              Atividades Recentes
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: "50%",
                        backgroundColor:
                          activity.status === "success"
                            ? "#E8F5E8"
                            : activity.status === "warning"
                              ? "#FFF3E0"
                              : "#E3F2FD",
                        color:
                          activity.status === "success"
                            ? "#4CAF50"
                            : activity.status === "warning"
                              ? "#FF9800"
                              : "#2196F3",
                      }}
                    >
                      {activity.icon}
                    </Box>
                  </ListItemIcon>
                  <ListItemText primary={activity.text} secondary={activity.time} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Upcoming Appointments */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: "400px" }}>
            <Typography variant="h6" gutterBottom>
              Próximos Agendamentos
            </Typography>
            <List>
              {upcomingAppointments.map((appointment, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <AccessTime color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body1">{appointment.patient}</Typography>
                        <Chip
                          label={appointment.date}
                          size="small"
                          color={appointment.date === "Hoje" ? "primary" : "default"}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {appointment.time} - {appointment.type}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Progress Overview */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Visão Geral do Mês
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">Meta de Sessões</Typography>
                    <Typography variant="body2">89/100</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={89} sx={{ height: 8, borderRadius: 4 }} />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">Meta de Receita</Typography>
                    <Typography variant="body2">R$ 12.450/R$ 15.000</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={83} sx={{ height: 8, borderRadius: 4 }} />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="body2">Prontuários Atualizados</Typography>
                    <Typography variant="body2">156/180</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={87} sx={{ height: 8, borderRadius: 4 }} />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
