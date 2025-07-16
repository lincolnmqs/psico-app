"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material"
import { CheckCircle, Schedule, Cancel, Pending, Send, Phone, Email, Sms, Refresh } from "@mui/icons-material"

interface Appointment {
  id: number
  patientName: string
  patientPhone: string
  patientEmail: string
  date: string
  time: string
  service: string
  status: "Confirmado" | "Pendente" | "Cancelado" | "Reagendado"
  confirmationMethod: "Email" | "SMS" | "WhatsApp" | "Telefone"
  notes: string
}

const mockAppointments: Appointment[] = [
  {
    id: 1,
    patientName: "Maria Silva",
    patientPhone: "(11) 99999-1111",
    patientEmail: "maria@email.com",
    date: "2024-01-20",
    time: "14:00",
    service: "Consulta Individual",
    status: "Confirmado",
    confirmationMethod: "WhatsApp",
    notes: "Paciente confirmou por WhatsApp",
  },
  {
    id: 2,
    patientName: "João Santos",
    patientPhone: "(11) 99999-2222",
    patientEmail: "joao@email.com",
    date: "2024-01-20",
    time: "15:30",
    service: "Terapia de Casal",
    status: "Pendente",
    confirmationMethod: "Email",
    notes: "Aguardando confirmação",
  },
  {
    id: 3,
    patientName: "Ana Costa",
    patientPhone: "(11) 99999-3333",
    patientEmail: "ana@email.com",
    date: "2024-01-21",
    time: "09:00",
    service: "Consulta Individual",
    status: "Reagendado",
    confirmationMethod: "Telefone",
    notes: "Reagendado para próxima semana",
  },
]

export default function ConfirmacaoPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [confirmationDialog, setConfirmationDialog] = useState(false)

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "Confirmado":
        return "success"
      case "Pendente":
        return "warning"
      case "Cancelado":
        return "error"
      case "Reagendado":
        return "info"
      default:
        return "default"
    }
  }

  const getStatusIcon = (status: Appointment["status"]) => {
    switch (status) {
      case "Confirmado":
        return <CheckCircle />
      case "Pendente":
        return <Pending />
      case "Cancelado":
        return <Cancel />
      case "Reagendado":
        return <Refresh />
      default:
        return <Schedule />
    }
  }

  const handleStatusChange = (id: number, newStatus: Appointment["status"]) => {
    setAppointments(appointments.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt)))
  }

  const handleSendConfirmation = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setConfirmationDialog(true)
  }

  const sendConfirmationMessage = () => {
    if (selectedAppointment) {
      // Aqui seria implementada a lógica real de envio
      console.log(`Enviando confirmação para ${selectedAppointment.patientName}`)
      setConfirmationDialog(false)
      setSelectedAppointment(null)
    }
  }

  // Estatísticas
  const totalAppointments = appointments.length
  const confirmedCount = appointments.filter((apt) => apt.status === "Confirmado").length
  const pendingCount = appointments.filter((apt) => apt.status === "Pendente").length
  const canceledCount = appointments.filter((apt) => apt.status === "Cancelado").length

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Confirmação de Agendamentos
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <CheckCircle sx={{ fontSize: 40, color: "#4CAF50", mb: 1 }} />
              <Typography variant="h4" color="primary">
                {confirmedCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Confirmados
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Pending sx={{ fontSize: 40, color: "#FF9800", mb: 1 }} />
              <Typography variant="h4" color="warning.main">
                {pendingCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pendentes
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Cancel sx={{ fontSize: 40, color: "#F44336", mb: 1 }} />
              <Typography variant="h4" color="error.main">
                {canceledCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cancelados
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Schedule sx={{ fontSize: 40, color: "#2196F3", mb: 1 }} />
              <Typography variant="h4" color="primary">
                {totalAppointments}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pending Confirmations Alert */}
      {pendingCount > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Você tem {pendingCount} agendamento(s) pendente(s) de confirmação. Clique em "Enviar Confirmação" para
          notificar os pacientes.
        </Alert>
      )}

      {/* Appointments Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Paciente</TableCell>
                <TableCell>Data/Hora</TableCell>
                <TableCell>Serviço</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Método</TableCell>
                <TableCell>Contato</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        {appointment.patientName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {appointment.notes}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">{new Date(appointment.date).toLocaleDateString("pt-BR")}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {appointment.time}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{appointment.service}</TableCell>
                  <TableCell>
                    <Chip
                      icon={getStatusIcon(appointment.status)}
                      label={appointment.status}
                      color={getStatusColor(appointment.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{appointment.confirmationMethod}</TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2">{appointment.patientPhone}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {appointment.patientEmail}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      {appointment.status === "Pendente" && (
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() => handleSendConfirmation(appointment)}
                          startIcon={<Send />}
                        >
                          Confirmar
                        </Button>
                      )}
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleStatusChange(appointment.id, "Confirmado")}
                        disabled={appointment.status === "Confirmado"}
                      >
                        <CheckCircle />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleStatusChange(appointment.id, "Cancelado")}
                      >
                        <Cancel />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Send Confirmation Dialog */}
      <Dialog open={confirmationDialog} onClose={() => setConfirmationDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Enviar Confirmação</DialogTitle>
        <DialogContent>
          {selectedAppointment && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedAppointment.patientName}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {selectedAppointment.service} - {new Date(selectedAppointment.date).toLocaleDateString("pt-BR")} às{" "}
                {selectedAppointment.time}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2" gutterBottom>
                Escolha o método de confirmação:
              </Typography>

              <List>
                <ListItem button>
                  <ListItemIcon>
                    <Email color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Email" secondary={selectedAppointment.patientEmail} />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <Sms color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="SMS" secondary={selectedAppointment.patientPhone} />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <Phone color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="WhatsApp" secondary={selectedAppointment.patientPhone} />
                </ListItem>
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationDialog(false)}>Cancelar</Button>
          <Button onClick={sendConfirmationMessage} variant="contained" sx={{ backgroundColor: "#4CAF50" }}>
            Enviar Confirmação
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
