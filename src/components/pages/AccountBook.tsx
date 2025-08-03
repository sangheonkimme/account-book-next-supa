"use client";

import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { addTransaction, deleteTransaction } from "@/actions/transaction";
import { Toaster, toast } from "react-hot-toast";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Transaction } from "@/types/interface/transaction";

type AccountBookProps = {
  initialTransactions: Transaction[];
  session: boolean;
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      sx={{ height: "56px" }}
      disabled={pending}
    >
      {pending ? <CircularProgress size={24} color="inherit" /> : "추가"}
    </Button>
  );
}

export default function AccountBook({
  initialTransactions,
  session,
}: AccountBookProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [transactions, setTransactions] = useState(initialTransactions);

  const [open, setOpen] = useState(false);
  const [transactionIdToDelete, setTransactionIdToDelete] = useState<
    number | null
  >(null);

  useEffect(() => {
    setTransactions(initialTransactions);
  }, [initialTransactions]);

  const handleClickOpen = (id: number) => {
    setTransactionIdToDelete(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTransactionIdToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (transactionIdToDelete !== null) {
      if (session) {
        const result = await deleteTransaction(transactionIdToDelete);
        if (result?.success) {
          toast.success(result.message);
        } else if (result?.message) {
          toast.error(result.message);
        }
      } else {
        setTransactions((prev) =>
          prev.filter((t) => t.id !== transactionIdToDelete)
        );
        toast.success("거래 내역이 삭제되었습니다.");
      }
    }
    handleClose();
  };

  const handleAddTransaction = async (formData: FormData) => {
    if (session) {
      const result = await addTransaction(formData);
      if (result?.success) {
        toast.success(result.message);
        formRef.current?.reset();
      } else if (result?.message) {
        toast.error(result.message);
      }
    } else {
      const newTransaction: Transaction = {
        id: Date.now(),
        date: formData.get("date") as string,
        description: formData.get("description") as string,
        amount: Number(formData.get("amount")),
        type: formData.get("type") as "income" | "expense",
      };
      setTransactions((prev) => [newTransaction, ...prev]);
      toast.success("거래 내역이 추가되었습니다.");
      formRef.current?.reset();
    }
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <ThemeProvider theme={theme}>
      <Toaster position="top-center" />
      <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: 4 }}>
        <Container maxWidth="lg">
          <Paper elevation={3} sx={{ mb: 4, p: 3, borderRadius: 2 }}>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              가계부
            </Typography>
          </Paper>

          <Grid container spacing={3} mb={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={3}
                sx={{ p: 2, borderRadius: 2, backgroundColor: "#e8f5e9" }}
              >
                <Typography variant="h6" color="#2e7d32">
                  총 수입
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#1b5e20" }}
                >
                  {totalIncome.toLocaleString()}원
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={3}
                sx={{ p: 2, borderRadius: 2, backgroundColor: "#ffebee" }}
              >
                <Typography variant="h6" color="#c62828">
                  총 지출
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#b71c1c" }}
                >
                  {totalExpense.toLocaleString()}원
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={3}
                sx={{ p: 2, borderRadius: 2, backgroundColor: "#e3f2fd" }}
              >
                <Typography variant="h6" color="#0277bd">
                  잔액
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#01579b" }}
                >
                  {balance.toLocaleString()}원
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
              새 거래 추가
            </Typography>
            <Box
              component="form"
              ref={formRef}
              action={handleAddTransaction}
              sx={{ mt: 2 }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <TextField
                    name="date"
                    label="날짜"
                    type="date"
                    defaultValue={new Date().toISOString().slice(0, 10)}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    name="description"
                    label="내용"
                    fullWidth
                    placeholder="예: 점심 식사"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <TextField
                    name="amount"
                    label="금액"
                    type="number"
                    fullWidth
                    placeholder="예: 10000"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>종류</InputLabel>
                    <Select name="type" defaultValue="expense" label="종류">
                      <MenuItem value="expense">지출</MenuItem>
                      <MenuItem value="income">수입</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <SubmitButton />
                </Grid>
              </Grid>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>날짜</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>내용</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">
                      금액
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                      종류
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">
                      삭제
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((t) => (
                    <TableRow key={t.id} hover>
                      <TableCell>{t.date}</TableCell>
                      <TableCell>{t.description}</TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          color: t.type === "income" ? "green" : "red",
                          fontWeight: "medium",
                        }}
                      >
                        {t.type === "income" ? "+" : "-"}
                        {t.amount.toLocaleString()}원
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={t.type === "income" ? "수입" : "지출"}
                          color={t.type === "income" ? "success" : "error"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => handleClickOpen(t.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"거래 내역 삭제 확인"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              이 거래 내역을 정말로 삭제하시겠습니까? 이 작업은 되돌릴 수
              없습니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={handleDeleteConfirm} autoFocus color="secondary">
              삭제
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
