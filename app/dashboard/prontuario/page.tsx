"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  InputAdornment,
  Card,
  CardContent,
} from "@mui/material"
import { Add, Search, Edit, Visibility, Delete, Person } from "@mui/icons-material"

interface Patient {
  id: number
  name: string
  age: number
  phone: string
  email: string
  lastSession: string
  status: "Ativo" | "Inativo"
  sessions: number
}

const mockPatients: Patient[] = [
  {
    id: 1,
    name: "Maria Silva",
    age: 32,
    phone: "(11) 99999-1111",
    email: "maria@email.com",
    lastSession: "2024-01-15",
    status: "Ativo",
    sessions: 12,
  },
  {
    id: 2,
    name: "João Santos",
    age: 28,
    phone: "(11) 99999-2222",
    email: "joao@email.com",
    lastSession: "2024-01-10",
    status: "Ativo",
    sessions: 8,
  },
  {
    id: 3,
    name: "Ana Costa",
    age: 45,
    phone: "(11) 99999-3333",
    email: "ana@email.com",
    lastSession: "2023-12-20",
    status: "Inativo",
    sessions: 15,
  },
]

export default function ProntuarioPage() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients)
  const [searchTerm, setSearchTerm] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    observations: "",
  })

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleOpenDialog = (patient?: Patient) => {
    if (patient) {
      setSelectedPatient(patient)
      setFormData({
        name: patient.name,
        age: patient.age.toString(),
        phone: patient.phone,
        email: patient.email,
        observations: "",
      })
    } else {
      setSelectedPatient(null)
      setFormData({
        name: "",
        age: "",
        phone: "",
        email: "",
        observations: "",
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedPatient(null)
  }

  const handleSave = () => {
    if (selectedPatient) {
      // Editar paciente existente
      setPatients(
        patients.map((p) =>
          p.id === selectedPatient.id
            ? {
                ...p,
                name: formData.name,
                age: Number.parseInt(formData.age),
                phone: formData.phone,
                email: formData.email,
              }
            : p,
        ),
      )
    } else {
      // Adicionar novo paciente
      const newPatient: Patient = {
        id: Math.max(...patients.map((p) => p.id)) + 1,
        name: formData.name,
        age: Number.parseInt(formData.age),
        phone: formData.phone,
        email: formData.email,
        lastSession: new Date().toISOString().split("T")[0],
        status: "Ativo",
        sessions: 0,
      }
      setPatients([...patients, newPatient])
    }
    handleCloseDialog()
  }

  const handleDelete = (id: number) => {
    setPatients(patients.filter((p) => p.id !== id))
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Prontuário de Pacientes
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ backgroundColor: "#4CAF50" }}
        >
          Novo Paciente
        </Button>
      </Box>

      {/* Search and Stats */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            placeholder="Buscar pacientes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="primary">
                {patients.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total de Pacientes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Patients Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Idade</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Última Sessão</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Sessões</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id} hover>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Person sx={{ mr: 1, color: "text.secondary" }} />
                      {patient.name}
                    </Box>
                  </TableCell>
                  <TableCell>{patient.age} anos</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{new Date(patient.lastSession).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>
                    <Chip
                      label={patient.status}
                      color={patient.status === "Ativo" ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{patient.sessions}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="primary">
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" color="primary" onClick={() => handleOpenDialog(patient)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(patient.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Patient Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{selectedPatient ? "Editar Paciente" : "Novo Paciente"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nome Completo"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Idade"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Telefone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Observações Iniciais"
                multiline
                rows={4}
                value={formData.observations}
                onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                placeholder="Informações relevantes sobre o paciente..."
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: "#4CAF50" }}>
            {selectedPatient ? "Salvar" : "Adicionar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
