"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  MenuItem,
  DialogActions, // Import DialogActions
} from "@mui/material"
import { Add, Edit, Delete, Visibility, Download, Send, Psychology, Person } from "@mui/icons-material"

interface Devolutiva {
  id: number
  patientName: string
  title: string
  type: "Avaliação Inicial" | "Devolutiva Parcial" | "Devolutiva Final" | "Relatório de Progresso"
  createdDate: string
  status: "Rascunho" | "Finalizada" | "Enviada"
  observations: string
  recommendations: string[]
  nextSteps: string[]
}

const mockDevolutivas: Devolutiva[] = [
  {
    id: 1,
    patientName: "Maria Silva",
    title: "Avaliação Inicial - Ansiedade",
    type: "Avaliação Inicial",
    createdDate: "2024-01-15",
    status: "Finalizada",
    observations:
      "Paciente apresenta sintomas de ansiedade generalizada. Histórico familiar de transtornos de humor. Boa capacidade de insight.",
    recommendations: ["Técnicas de respiração e relaxamento", "Reestruturação cognitiva", "Exercícios de mindfulness"],
    nextSteps: [
      "Sessões semanais por 3 meses",
      "Avaliação de progresso mensal",
      "Possível encaminhamento para psiquiatra",
    ],
  },
  {
    id: 2,
    patientName: "João Santos",
    title: "Devolutiva de Terapia de Casal",
    type: "Devolutiva Parcial",
    createdDate: "2024-01-10",
    status: "Rascunho",
    observations:
      "Casal demonstra dificuldades de comunicação. Padrões de conflito estabelecidos. Motivação para mudança presente.",
    recommendations: ["Técnicas de comunicação assertiva", "Exercícios de escuta ativa", "Estabelecimento de acordos"],
    nextSteps: ["Sessões quinzenais", "Tarefas para casa", "Reavaliação em 2 meses"],
  },
]

export default function DevolutivaPage() {
  const [devolutivas, setDevolutivas] = useState<Devolutiva[]>(mockDevolutivas)
  const [openDialog, setOpenDialog] = useState(false)
  const [viewDialog, setViewDialog] = useState(false)
  const [selectedDevolutiva, setSelectedDevolutiva] = useState<Devolutiva | null>(null)
  const [formData, setFormData] = useState({
    patientName: "",
    title: "",
    type: "Avaliação Inicial" as Devolutiva["type"],
    observations: "",
    recommendations: [""],
    nextSteps: [""],
  })

  const handleOpenDialog = (devolutiva?: Devolutiva) => {
    if (devolutiva) {
      setSelectedDevolutiva(devolutiva)
      setFormData({
        patientName: devolutiva.patientName,
        title: devolutiva.title,
        type: devolutiva.type,
        observations: devolutiva.observations,
        recommendations: devolutiva.recommendations,
        nextSteps: devolutiva.nextSteps,
      })
    } else {
      setSelectedDevolutiva(null)
      setFormData({
        patientName: "",
        title: "",
        type: "Avaliação Inicial",
        observations: "",
        recommendations: [""],
        nextSteps: [""],
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedDevolutiva(null)
  }

  const handleViewDevolutiva = (devolutiva: Devolutiva) => {
    setSelectedDevolutiva(devolutiva)
    setViewDialog(true)
  }

  const handleSave = () => {
    if (selectedDevolutiva) {
      setDevolutivas(
        devolutivas.map((d) =>
          d.id === selectedDevolutiva.id
            ? {
                ...d,
                patientName: formData.patientName,
                title: formData.title,
                type: formData.type,
                observations: formData.observations,
                recommendations: formData.recommendations.filter((r) => r.trim() !== ""),
                nextSteps: formData.nextSteps.filter((s) => s.trim() !== ""),
              }
            : d,
        ),
      )
    } else {
      const newDevolutiva: Devolutiva = {
        id: Math.max(...devolutivas.map((d) => d.id)) + 1,
        patientName: formData.patientName,
        title: formData.title,
        type: formData.type,
        createdDate: new Date().toISOString().split("T")[0],
        status: "Rascunho",
        observations: formData.observations,
        recommendations: formData.recommendations.filter((r) => r.trim() !== ""),
        nextSteps: formData.nextSteps.filter((s) => s.trim() !== ""),
      }
      setDevolutivas([...devolutivas, newDevolutiva])
    }
    handleCloseDialog()
  }

  const handleDelete = (id: number) => {
    setDevolutivas(devolutivas.filter((d) => d.id !== id))
  }

  const handleStatusChange = (id: number, newStatus: Devolutiva["status"]) => {
    setDevolutivas(devolutivas.map((d) => (d.id === id ? { ...d, status: newStatus } : d)))
  }

  const addRecommendation = () => {
    setFormData({
      ...formData,
      recommendations: [...formData.recommendations, ""],
    })
  }

  const removeRecommendation = (index: number) => {
    setFormData({
      ...formData,
      recommendations: formData.recommendations.filter((_, i) => i !== index),
    })
  }

  const updateRecommendation = (index: number, value: string) => {
    const newRecommendations = [...formData.recommendations]
    newRecommendations[index] = value
    setFormData({
      ...formData,
      recommendations: newRecommendations,
    })
  }

  const addNextStep = () => {
    setFormData({
      ...formData,
      nextSteps: [...formData.nextSteps, ""],
    })
  }

  const removeNextStep = (index: number) => {
    setFormData({
      ...formData,
      nextSteps: formData.nextSteps.filter((_, i) => i !== index),
    })
  }

  const updateNextStep = (index: number, value: string) => {
    const newNextSteps = [...formData.nextSteps]
    newNextSteps[index] = value
    setFormData({
      ...formData,
      nextSteps: newNextSteps,
    })
  }

  const getStatusColor = (status: Devolutiva["status"]) => {
    switch (status) {
      case "Finalizada":
        return "success"
      case "Enviada":
        return "primary"
      case "Rascunho":
        return "warning"
      default:
        return "default"
    }
  }

  const getTypeColor = (type: Devolutiva["type"]) => {
    switch (type) {
      case "Avaliação Inicial":
        return "primary"
      case "Devolutiva Parcial":
        return "info"
      case "Devolutiva Final":
        return "success"
      case "Relatório de Progresso":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Devolutivas
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ backgroundColor: "#4CAF50" }}
        >
          Nova Devolutiva
        </Button>
      </Box>

      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Psychology sx={{ fontSize: 40, color: "#4CAF50", mb: 1 }} />
              <Typography variant="h4" color="primary">
                {devolutivas.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total de Devolutivas
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="success.main">
                {devolutivas.filter((d) => d.status === "Finalizada").length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Finalizadas
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="warning.main">
                {devolutivas.filter((d) => d.status === "Rascunho").length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rascunhos
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="primary">
                {devolutivas.filter((d) => d.status === "Enviada").length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enviadas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Devolutivas Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Paciente</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {devolutivas.map((devolutiva) => (
                <TableRow key={devolutiva.id} hover>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Person sx={{ mr: 1, color: "text.secondary" }} />
                      {devolutiva.patientName}
                    </Box>
                  </TableCell>
                  <TableCell>{devolutiva.title}</TableCell>
                  <TableCell>
                    <Chip
                      label={devolutiva.type}
                      color={getTypeColor(devolutiva.type)}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{new Date(devolutiva.createdDate).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>
                    <Chip label={devolutiva.status} color={getStatusColor(devolutiva.status)} size="small" />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="primary" onClick={() => handleViewDevolutiva(devolutiva)}>
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" color="primary" onClick={() => handleOpenDialog(devolutiva)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <Download />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <Send />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(devolutiva.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Create/Edit Devolutiva Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogTitle>{selectedDevolutiva ? "Editar Devolutiva" : "Nova Devolutiva"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nome do Paciente"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Tipo de Devolutiva"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Devolutiva["type"] })}
              >
                <MenuItem value="Avaliação Inicial">Avaliação Inicial</MenuItem>
                <MenuItem value="Devolutiva Parcial">Devolutiva Parcial</MenuItem>
                <MenuItem value="Devolutiva Final">Devolutiva Final</MenuItem>
                <MenuItem value="Relatório de Progresso">Relatório de Progresso</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Título da Devolutiva"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Observações e Análise"
                multiline
                rows={6}
                value={formData.observations}
                onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                placeholder="Descreva suas observações, análise do caso, diagnóstico, etc..."
                required
              />
            </Grid>

            {/* Recommendations */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography variant="subtitle2">Recomendações:</Typography>
                <Button size="small" onClick={addRecommendation}>
                  Adicionar Recomendação
                </Button>
              </Box>
              {formData.recommendations.map((recommendation, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    value={recommendation}
                    onChange={(e) => updateRecommendation(index, e.target.value)}
                    placeholder="Digite uma recomendação..."
                    sx={{ mr: 1 }}
                  />
                  <IconButton
                    color="error"
                    onClick={() => removeRecommendation(index)}
                    disabled={formData.recommendations.length === 1}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ))}
            </Grid>

            {/* Next Steps */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography variant="subtitle2">Próximos Passos:</Typography>
                <Button size="small" onClick={addNextStep}>
                  Adicionar Próximo Passo
                </Button>
              </Box>
              {formData.nextSteps.map((step, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    value={step}
                    onChange={(e) => updateNextStep(index, e.target.value)}
                    placeholder="Digite um próximo passo..."
                    sx={{ mr: 1 }}
                  />
                  <IconButton
                    color="error"
                    onClick={() => removeNextStep(index)}
                    disabled={formData.nextSteps.length === 1}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ))}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            onClick={() => {
              handleSave()
              if (selectedDevolutiva) {
                handleStatusChange(selectedDevolutiva.id, "Rascunho")
              }
            }}
            variant="outlined"
          >
            Salvar como Rascunho
          </Button>
          <Button
            onClick={() => {
              handleSave()
              if (selectedDevolutiva) {
                handleStatusChange(selectedDevolutiva.id, "Finalizada")
              }
            }}
            variant="contained"
            sx={{ backgroundColor: "#4CAF50" }}
          >
            {selectedDevolutiva ? "Finalizar" : "Criar e Finalizar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Devolutiva Dialog */}
      <Dialog open={viewDialog} onClose={() => setViewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Visualizar Devolutiva</DialogTitle>
        <DialogContent>
          {selectedDevolutiva && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedDevolutiva.title}
              </Typography>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Paciente:
                  </Typography>
                  <Typography variant="body1">{selectedDevolutiva.patientName}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Data de Criação:
                  </Typography>
                  <Typography variant="body1">
                    {new Date(selectedDevolutiva.createdDate).toLocaleDateString("pt-BR")}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Tipo:
                  </Typography>
                  <Chip
                    label={selectedDevolutiva.type}
                    color={getTypeColor(selectedDevolutiva.type)}
                    size="small"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Status:
                  </Typography>
                  <Chip
                    label={selectedDevolutiva.status}
                    color={getStatusColor(selectedDevolutiva.status)}
                    size="small"
                  />
                </Grid>
              </Grid>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Observações e Análise:
                </Typography>
                <Paper sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
                  <Typography variant="body2" style={{ whiteSpace: "pre-wrap" }}>
                    {selectedDevolutiva.observations}
                  </Typography>
                </Paper>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Recomendações:
                </Typography>
                <Paper sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
                  {selectedDevolutiva.recommendations.map((recommendation, index) => (
                    <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                      • {recommendation}
                    </Typography>
                  ))}
                </Paper>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Próximos Passos:
                </Typography>
                <Paper sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
                  {selectedDevolutiva.nextSteps.map((step, index) => (
                    <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                      {index + 1}. {step}
                    </Typography>
                  ))}
                </Paper>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialog(false)}>Fechar</Button>
          <Button
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => {
              setViewDialog(false)
              if (selectedDevolutiva) {
                handleOpenDialog(selectedDevolutiva)
              }
            }}
          >
            Editar
          </Button>
          <Button variant="contained" startIcon={<Download />}>
            Baixar PDF
          </Button>
          <Button variant="contained" startIcon={<Send />} sx={{ backgroundColor: "#4CAF50" }}>
            Enviar por Email
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
