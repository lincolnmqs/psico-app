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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
} from "@mui/material"
import { Add, TrendingUp, TrendingDown, Payment, Receipt, Edit, Delete, AttachMoney } from "@mui/icons-material"

interface PaymentRecord {
  id: number
  patientName: string
  amount: number
  date: string
  status: "Pago" | "Pendente" | "Atrasado"
  method: "Dinheiro" | "PIX" | "Cartão" | "Transferência"
  sessionType: string
}

const mockPayments: PaymentRecord[] = [
  {
    id: 1,
    patientName: "Maria Silva",
    amount: 150,
    date: "2024-01-15",
    status: "Pago",
    method: "PIX",
    sessionType: "Consulta Individual",
  },
  {
    id: 2,
    patientName: "João Santos",
    amount: 200,
    date: "2024-01-14",
    status: "Pago",
    method: "Cartão",
    sessionType: "Terapia de Casal",
  },
  {
    id: 3,
    patientName: "Ana Costa",
    amount: 150,
    date: "2024-01-10",
    status: "Pendente",
    method: "Dinheiro",
    sessionType: "Consulta Individual",
  },
  {
    id: 4,
    patientName: "Pedro Lima",
    amount: 180,
    date: "2024-01-05",
    status: "Atrasado",
    method: "Transferência",
    sessionType: "Avaliação Psicológica",
  },
]

export default function PagamentoPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>(mockPayments)
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null)
  const [formData, setFormData] = useState({
    patientName: "",
    amount: "",
    date: "",
    status: "Pendente" as PaymentRecord["status"],
    method: "PIX" as PaymentRecord["method"],
    sessionType: "",
  })

  // Cálculos financeiros
  const totalReceived = payments.filter((p) => p.status === "Pago").reduce((sum, p) => sum + p.amount, 0)
  const totalPending = payments.filter((p) => p.status === "Pendente").reduce((sum, p) => sum + p.amount, 0)
  const totalOverdue = payments.filter((p) => p.status === "Atrasado").reduce((sum, p) => sum + p.amount, 0)

  const handleOpenDialog = (payment?: PaymentRecord) => {
    if (payment) {
      setSelectedPayment(payment)
      setFormData({
        patientName: payment.patientName,
        amount: payment.amount.toString(),
        date: payment.date,
        status: payment.status,
        method: payment.method,
        sessionType: payment.sessionType,
      })
    } else {
      setSelectedPayment(null)
      setFormData({
        patientName: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        status: "Pendente",
        method: "PIX",
        sessionType: "",
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedPayment(null)
  }

  const handleSave = () => {
    if (selectedPayment) {
      setPayments(
        payments.map((p) =>
          p.id === selectedPayment.id
            ? {
                ...p,
                patientName: formData.patientName,
                amount: Number.parseFloat(formData.amount),
                date: formData.date,
                status: formData.status,
                method: formData.method,
                sessionType: formData.sessionType,
              }
            : p,
        ),
      )
    } else {
      const newPayment: PaymentRecord = {
        id: Math.max(...payments.map((p) => p.id)) + 1,
        patientName: formData.patientName,
        amount: Number.parseFloat(formData.amount),
        date: formData.date,
        status: formData.status,
        method: formData.method,
        sessionType: formData.sessionType,
      }
      setPayments([...payments, newPayment])
    }
    handleCloseDialog()
  }

  const handleDelete = (id: number) => {
    setPayments(payments.filter((p) => p.id !== id))
  }

  const getStatusColor = (status: PaymentRecord["status"]) => {
    switch (status) {
      case "Pago":
        return "success"
      case "Pendente":
        return "warning"
      case "Atrasado":
        return "error"
      default:
        return "default"
    }
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Controle Financeiro
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{ backgroundColor: "#4CAF50" }}
        >
          Novo Pagamento
        </Button>
      </Box>

      {/* Financial Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: "#E8F5E8",
                    color: "#4CAF50",
                    mr: 2,
                  }}
                >
                  <AttachMoney />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Recebido
                  </Typography>
                  <Typography variant="h5">R$ {totalReceived.toLocaleString("pt-BR")}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TrendingUp sx={{ fontSize: 16, color: "#4CAF50", mr: 0.5 }} />
                <Typography variant="body2" color="#4CAF50">
                  +12% vs mês anterior
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: "#FFF3E0",
                    color: "#FF9800",
                    mr: 2,
                  }}
                >
                  <Payment />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Pendente
                  </Typography>
                  <Typography variant="h5">R$ {totalPending.toLocaleString("pt-BR")}</Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {payments.filter((p) => p.status === "Pendente").length} pagamentos
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: "#FFEBEE",
                    color: "#F44336",
                    mr: 2,
                  }}
                >
                  <TrendingDown />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Em Atraso
                  </Typography>
                  <Typography variant="h5">R$ {totalOverdue.toLocaleString("pt-BR")}</Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {payments.filter((p) => p.status === "Atrasado").length} pagamentos
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    backgroundColor: "#E3F2FD",
                    color: "#2196F3",
                    mr: 2,
                  }}
                >
                  <Receipt />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Geral
                  </Typography>
                  <Typography variant="h5">
                    R$ {(totalReceived + totalPending + totalOverdue).toLocaleString("pt-BR")}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {payments.length} registros
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Payments Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Paciente</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Método</TableCell>
                <TableCell>Tipo de Sessão</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell>{payment.patientName}</TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold">
                      R$ {payment.amount.toLocaleString("pt-BR")}
                    </Typography>
                  </TableCell>
                  <TableCell>{new Date(payment.date).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>
                    <Chip label={payment.status} color={getStatusColor(payment.status)} size="small" />
                  </TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>{payment.sessionType}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="primary" onClick={() => handleOpenDialog(payment)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(payment.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Payment Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{selectedPayment ? "Editar Pagamento" : "Novo Pagamento"}</DialogTitle>
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
                label="Valor"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>R$</Typography>,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Data"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as PaymentRecord["status"] })}
              >
                <MenuItem value="Pago">Pago</MenuItem>
                <MenuItem value="Pendente">Pendente</MenuItem>
                <MenuItem value="Atrasado">Atrasado</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Método de Pagamento"
                value={formData.method}
                onChange={(e) => setFormData({ ...formData, method: e.target.value as PaymentRecord["method"] })}
              >
                <MenuItem value="Dinheiro">Dinheiro</MenuItem>
                <MenuItem value="PIX">PIX</MenuItem>
                <MenuItem value="Cartão">Cartão</MenuItem>
                <MenuItem value="Transferência">Transferência</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tipo de Sessão"
                value={formData.sessionType}
                onChange={(e) => setFormData({ ...formData, sessionType: e.target.value })}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained" sx={{ backgroundColor: "#4CAF50" }}>
            {selectedPayment ? "Salvar" : "Adicionar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
