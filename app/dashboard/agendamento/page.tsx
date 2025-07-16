"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material"
import { Link as LinkIcon, ContentCopy, Edit, Delete, AccessTime, Person } from "@mui/icons-material"

interface ScheduleLink {
  id: number
  title: string
  duration: number
  price: number
  isActive: boolean
  link: string
  description: string
  availableTimes: string[]
}

const mockScheduleLinks: ScheduleLink[] = [
  {
    id: 1,
    title: "Consulta Individual",
    duration: 50,
    price: 150,
    isActive: true,
    link: "https://psicosystem.com/agendar/consulta-individual",
    description: "Sessão individual de psicoterapia",
    availableTimes: ["09:00", "10:00", "14:00", "15:00", "16:00"],
  },
  {
    id: 2,
    title: "Terapia de Casal",
    duration: 60,
    price: 200,
    isActive: true,
    link: "https://psicosystem.com/agendar/terapia-casal",
    description: "Sessão de terapia para casais",
    availableTimes: ["10:00", "14:00", "15:00"],
  },
  {
    id: 3,
    title: "Avaliação Psicológica",
    duration: 90,
    price: 250,
    isActive: false,
    link: "https://psicosystem.com/agendar/avaliacao",
    description: "Avaliação psicológica completa",
    availableTimes: ["09:00", "14:00"],
  },
]

export default function AgendamentoPage() {
  const [scheduleLinks, setScheduleLinks] = useState<ScheduleLink[]>(mockScheduleLinks)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedLink, setSelectedLink] = useState<ScheduleLink | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    price: "",
    description: "",
    availableTimes: [""],
  })

  const handleOpenDialog = (link?: ScheduleLink) => {
    if (link) {
      setSelectedLink(link)
      setFormData({
        title: link.title,
        duration: link.duration.toString(),
        price: link.price.toString(),
        description: link.description,
        availableTimes: link.availableTimes,
      })
    } else {
      setSelectedLink(null)
      setFormData({
        title: "",
        duration: "",
        price: "",
        description: "",
        availableTimes: [""],
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedLink(null)
  }

  const handleSave = () => {
    const newLink = `https://psicosystem.com/agendar/${formData.title.toLowerCase().replace(/\s+/g, "-")}`

    if (selectedLink) {
      setScheduleLinks(
        scheduleLinks.map((link) =>
          link.id === selectedLink.id
            ? {
                ...link,
                title: formData.title,
                duration: Number.parseInt(formData.duration),
                price: Number.parseFloat(formData.price),
                description: formData.description,
                availableTimes: formData.availableTimes.filter((time) => time.trim() !== ""),
                link: newLink,
              }
            : link,
        ),
      )
    } else {
      const newScheduleLink: ScheduleLink = {
        id: Math.max(...scheduleLinks.map((l) => l.id)) + 1,
        title: formData.title,
        duration: Number.parseInt(formData.duration),
        price: Number.parseFloat(formData.price),
        description: formData.description,
        availableTimes: formData.availableTimes.filter((time) => time.trim() !== ""),
        isActive: true,
        link: newLink,
      }
      setScheduleLinks([...scheduleLinks, newScheduleLink])
    }
    handleCloseDialog()
  }

  const handleToggleActive = (id: number) => {
    setScheduleLinks(scheduleLinks.map((link) => (link.id === id ? { ...link, isActive: !link.isActive } : link)))
  }

  const handleDelete = (id: number) => {
    setScheduleLinks(scheduleLinks.filter((link) => link.id !== id))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const addTimeSlot = () => {
    setFormData({
      ...formData,
      availableTimes: [...formData.availableTimes, ""],
    })
  }

  const removeTimeSlot = (index: number) => {
    setFormData({
      ...formData,
      availableTimes: formData.availableTimes.filter((_, i) => i !== index),
    })
  }

  const updateTimeSlot = (index: number, value: string) => {
    const newTimes = [...formData.availableTimes]
    newTimes[index] = value
    setFormData({
      ...formData,
      availableTimes: newTimes,
    })
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Links de Agendamento
        </Typography>
        <Button
          variant="contained"
          startIcon={<LinkIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ backgroundColor: "#4CAF50" }}
        >
          Criar Link
        </Button>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          Crie links personalizados para que seus pacientes possam agendar consultas online. Cada link pode ter
          configurações específicas de horário, duração e preço.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {scheduleLinks.map((link) => (
          <Grid item xs={12} md={6} lg={4} key={link.id}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Typography variant="h6" component="h3">
                    {link.title}
                  </Typography>
                  <Chip
                    label={link.isActive ? "Ativo" : "Inativo"}
                    color={link.isActive ? "success" : "default"}
                    size="small"
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {link.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <AccessTime sx={{ fontSize: 16, mr: 1, color: "text.secondary" }} />
                    <Typography variant="body2">{link.duration} minutos</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Person sx={{ fontSize: 16, mr: 1, color: "text.secondary" }} />
                    <Typography variant="body2">R$ {link.price.toLocaleString("pt-BR")}</Typography>
                  </Box>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Horários disponíveis:
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                  {link.availableTimes.map((time, index) => (
                    <Chip key={index} label={time} size="small" variant="outlined" />
                  ))}
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Link de agendamento:
                  </Typography>
                  <Box
                    sx={{
                      p: 1,
                      backgroundColor: "#f5f5f5",
                      borderRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        flex: 1,
                        mr: 1,
                      }}
                    >
                      {link.link}
                    </Typography>
                    <IconButton size="small" onClick={() => copyToClipboard(link.link)} title="Copiar link">
                      <ContentCopy fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <FormControlLabel
                    control={
                      <Switch checked={link.isActive} onChange={() => handleToggleActive(link.id)} color="success" />
                    }
                    label="Ativo"
                  />
                  <Box>
                    <IconButton size="small" color="primary" onClick={() => handleOpenDialog(link)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(link.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Create/Edit Link Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{selectedLink ? "Editar Link de Agendamento" : "Criar Link de Agendamento"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Título do Serviço"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Duração (minutos)"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Preço"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>R$</Typography>,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button variant="outlined" onClick={addTimeSlot} sx={{ height: "56px", width: "100%" }}>
                Adicionar Horário
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descrição"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva o tipo de sessão..."
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Horários Disponíveis:
              </Typography>
              {formData.availableTimes.map((time, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <TextField
                    type="time"
                    value={time}
                    onChange={(e) => updateTimeSlot(index, e.target.value)}
                    sx={{ mr: 1 }}
                    InputLabelProps={{ shrink: true }}
                  />
                  <IconButton
                    color="error"
                    onClick={() => removeTimeSlot(index)}
                    disabled={formData.availableTimes.length === 1}
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
          <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: "#4CAF50" }}>
            {selectedLink ? "Salvar" : "Criar Link"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
