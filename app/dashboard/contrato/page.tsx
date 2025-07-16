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
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material"
import { Add, Edit, Delete, Visibility, Download, Send, Description, Person } from "@mui/icons-material"

interface Contract {
  id: number
  patientName: string
  contractType: string
  createdDate: string
  status: "Ativo" | "Pendente" | "Assinado" | "Expirado"
  sessionType: string
  duration: string
  price: number
  terms: string[]
}

const mockContracts: Contract[] = [
  {
    id: 1,
    patientName: "Maria Silva",
    contractType: "Contrato de Psicoterapia Individual",
    createdDate: "2024-01-15",
    status: "Assinado",
    sessionType: "Consulta Individual",
    duration: "50 minutos",
    price: 150,
    terms: [
      "Sessões semanais de 50 minutos",
      "Pagamento até o dia 5 de cada mês",
      "Cancelamento com 24h de antecedência",
      "Sigilo profissional garantido",
    ],
  },
  {
    id: 2,
    patientName: "João Santos",
    contractType: "Contrato de Terapia de Casal",
    createdDate: "2024-01-10",
    status: "Pendente",
    sessionType: "Terapia de Casal",
    duration: "60 minutos",
    price: 200,
    terms: [
      "Sessões quinzenais de 60 minutos",
      "Presença obrigatória de ambos os cônjuges",
      "Pagamento antecipado",
      "Confidencialidade das informações",
    ],
  },
]

const contractTemplates = [
  {
    name: "Psicoterapia Individual",
    terms: [
      "Sessões semanais de 50 minutos",
      "Pagamento até o dia 5 de cada mês",
      "Cancelamento com 24h de antecedência",
      "Sigilo profissional garantido",
      "Faltas não justificadas serão cobradas",
    ],
  },
  {
    name: "Terapia de Casal",
    terms: [
      "Sessões quinzenais de 60 minutos",
      "Presença obrigatória de ambos os cônjuges",
      "Pagamento antecipado",
      "Confidencialidade das informações",
      "Compromisso com o processo terapêutico",
    ],
  },
  {
    name: "Avaliação Psicológica",
    terms: [
      "Processo de avaliação em 3 sessões",
      "Entrega de relatório em 15 dias",
      "Pagamento integral na primeira sessão",
      "Sigilo das informações coletadas",
      "Validade do relatório: 6 meses",
    ],
  },
]

export default function ContratoPage() {
  const [contracts, setContracts] = useState<Contract[]>(mockContracts)
  const [openDialog, setOpenDialog] = useState(false)
  const [viewDialog, setViewDialog] = useState(false)
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [formData, setFormData] = useState({
    patientName: "",
    contractType: "",
    sessionType: "",
    duration: "",
    price: "",
    terms: [""],
  })

  const handleOpenDialog = (contract?: Contract) => {
    if (contract) {
      setSelectedContract(contract)
      setFormData({
        patientName: contract.patientName,
        contractType: contract.contractType,
        sessionType: contract.sessionType,
        duration: contract.duration,
        price: contract.price.toString(),
        terms: contract.terms,
      })
    } else {
      setSelectedContract(null)
      setFormData({
        patientName: "",
        contractType: "",
        sessionType: "",
        duration: "",
        price: "",
        terms: [""],
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedContract(null)
  }

  const handleViewContract = (contract: Contract) => {
    setSelectedContract(contract)
    setViewDialog(true)
  }

  const handleSave = () => {
    if (selectedContract) {
      setContracts(
        contracts.map((c) =>
          c.id === selectedContract.id
            ? {
                ...c,
                patientName: formData.patientName,
                contractType: formData.contractType,
                sessionType: formData.sessionType,
                duration: formData.duration,
                price: Number.parseFloat(formData.price),
                terms: formData.terms.filter((term) => term.trim() !== ""),
              }
            : c,
        ),
      )
    } else {
      const newContract: Contract = {
        id: Math.max(...contracts.map((c) => c.id)) + 1,
        patientName: formData.patientName,
        contractType: formData.contractType,
        createdDate: new Date().toISOString().split("T")[0],
        status: "Pendente",
        sessionType: formData.sessionType,
        duration: formData.duration,
        price: Number.parseFloat(formData.price),
        terms: formData.terms.filter((term) => term.trim() !== ""),
      }
      setContracts([...contracts, newContract])
    }
    handleCloseDialog()
  }

  const handleDelete = (id: number) => {
    setContracts(contracts.filter((c) => c.id !== id))
  }

  const handleStatusChange = (id: number, newStatus: Contract["status"]) => {
    setContracts(contracts.map((c) => (c.id === id ? { ...c, status: newStatus } : c)))
  }

  const addTerm = () => {
    setFormData({
      ...formData,
      terms: [...formData.terms, ""],
    })
  }

  const removeTerm = (index: number) => {
    setFormData({
      ...formData,
      terms: formData.terms.filter((_, i) => i !== index),
    })
  }

  const updateTerm = (index: number, value: string) => {
    const newTerms = [...formData.terms]
    newTerms[index] = value
    setFormData({
      ...formData,
      terms: newTerms,
    })
  }

  const useTemplate = (template: (typeof contractTemplates)[0]) => {
    setFormData({
      ...formData,
      contractType: `Contrato de ${template.name}`,
      sessionType: template.name,
      terms: template.terms,
    })
  }

  const getStatusColor = (status: Contract["status"]) => {
    switch (status) {
      case "Assinado":
        return "success"
      case "Ativo":
        return "primary"
      case "Pendente":
        return "warning"
      case "Expirado":
        return "error"
      default:
        return "default"
    }
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Contratos de Sessão
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ backgroundColor: "#4CAF50" }}
        >
          Novo Contrato
        </Button>
      </Box>

      {/* Statistics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Description sx={{ fontSize: 40, color: "#4CAF50", mb: 1 }} />
              <Typography variant="h4" color="primary">
                {contracts.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total de Contratos
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="success.main">
                {contracts.filter((c) => c.status === "Assinado").length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Assinados
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="warning.main">
                {contracts.filter((c) => c.status === "Pendente").length}
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
              <Typography variant="h4" color="primary">
                {contracts.filter((c) => c.status === "Ativo").length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ativos
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Contracts Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Paciente</TableCell>
                <TableCell>Tipo de Contrato</TableCell>
                <TableCell>Data de Criação</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contracts.map((contract) => (
                <TableRow key={contract.id} hover>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Person sx={{ mr: 1, color: "text.secondary" }} />
                      {contract.patientName}
                    </Box>
                  </TableCell>
                  <TableCell>{contract.contractType}</TableCell>
                  <TableCell>{new Date(contract.createdDate).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>
                    <Chip label={contract.status} color={getStatusColor(contract.status)} size="small" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold">
                      R$ {contract.price.toLocaleString("pt-BR")}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="primary" onClick={() => handleViewContract(contract)}>
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" color="primary" onClick={() => handleOpenDialog(contract)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <Download />
                    </IconButton>
                    <IconButton size="small" color="primary">
                      <Send />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(contract.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Create/Edit Contract Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{selectedContract ? "Editar Contrato" : "Novo Contrato"}</DialogTitle>
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
                label="Tipo de Contrato"
                value={formData.contractType}
                onChange={(e) => setFormData({ ...formData, contractType: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Tipo de Sessão"
                value={formData.sessionType}
                onChange={(e) => setFormData({ ...formData, sessionType: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Duração"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="ex: 50 minutos"
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Preço por Sessão"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>R$</Typography>,
                }}
                required
              />
            </Grid>

            {/* Contract Templates */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Modelos de Contrato:
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {contractTemplates.map((template, index) => (
                  <Button key={index} variant="outlined" size="small" onClick={() => useTemplate(template)}>
                    {template.name}
                  </Button>
                ))}
              </Box>
            </Grid>

            {/* Terms */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography variant="subtitle2">Termos e Condições:</Typography>
                <Button size="small" onClick={addTerm}>
                  Adicionar Termo
                </Button>
              </Box>
              {formData.terms.map((term, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    value={term}
                    onChange={(e) => updateTerm(index, e.target.value)}
                    placeholder="Digite um termo ou condição..."
                    sx={{ mr: 1 }}
                  />
                  <IconButton color="error" onClick={() => removeTerm(index)} disabled={formData.terms.length === 1}>
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
            {selectedContract ? "Salvar" : "Criar Contrato"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Contract Dialog */}
      <Dialog open={viewDialog} onClose={() => setViewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Visualizar Contrato</DialogTitle>
        <DialogContent>
          {selectedContract && (
            <Box>
              <Typography variant="h6" gutterBottom>
                {selectedContract.contractType}
              </Typography>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Paciente:
                  </Typography>
                  <Typography variant="body1">{selectedContract.patientName}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Data de Criação:
                  </Typography>
                  <Typography variant="body1">
                    {new Date(selectedContract.createdDate).toLocaleDateString("pt-BR")}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Tipo de Sessão:
                  </Typography>
                  <Typography variant="body1">{selectedContract.sessionType}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Duração:
                  </Typography>
                  <Typography variant="body1">{selectedContract.duration}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Valor por Sessão:
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    R$ {selectedContract.price.toLocaleString("pt-BR")}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Status:
                  </Typography>
                  <Chip label={selectedContract.status} color={getStatusColor(selectedContract.status)} size="small" />
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" gutterBottom>
                Termos e Condições:
              </Typography>
              <List>
                {selectedContract.terms.map((term, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${index + 1}. ${term}`} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialog(false)}>Fechar</Button>
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
