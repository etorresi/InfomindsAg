import {
  Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    styled,
    tableCellClasses,
  } from "@mui/material";
import { useEffect, useState } from "react";
import ExportXML from "../Components/Customers/ExportCustomersToXML";
import FilterInput from "../Components/UI/Input/FilterInput";

interface CustomerListQuery {
    id: number;
    name: string;
    address: string;
    email: string;
    phone: string;
    iban: string;
    customerCategory: CustomerCategory;
}

interface CustomerCategory { 
    id: number;
    code: string;
    description: string;
}

// Definizione dei parametri opzionali per filtrare i dati nella tabella 
type FilterOptions = {
    name: string;
    email: string;
};

export default function CustomerListPage() {
    const [list, setList] = useState<CustomerListQuery[]>([]);

    const [filters, setFilters] = useState<FilterOptions>({
        name: "",
        email: "",
      });

    useEffect(() => {

        // Funzione per generare l'URL della richiesta con i filtri
        const generateAPIUrl = () => {
          let apiUrl = "/api/customers/list?";
          for (const key in filters) {
            if (filters[key as keyof FilterOptions]) {
              apiUrl += `${key}=${encodeURIComponent(
                filters[key as keyof FilterOptions]
              )}&`;
            }
          }
          return apiUrl.slice(0, -1); // Rimuove l'ultimo "&" dalla stringa
        };
    
        // Invia una richiesta al backend quando i filtri cambiano
        fetch(generateAPIUrl())
          .then((response) => response.json())
          .then((data) => {
            setList(data as CustomerListQuery[]);
          })
          .catch((error) => {
            console.error("Errore nella richiesta API:", error);
          });
      }, [filters]);
        
    return (
        <>
            <Typography variant="h4" sx={{ textAlign: "center", mt: 4, mb: 4 }}>
                Customers   
            </Typography>

            <TableContainer sx={{ minWidth: 600, marginBottom: '40px' }} component={Paper}>
              <Grid container alignItems="center" mb={2}>
                <Grid item xs={6}> {/* I campi di input occupano metà della larghezza */}
                  <FilterInput
                    type="text" 
                    placeholder="Filtra per nome"
                    value={filters.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFilters({ ...filters, name: e.target.value })
                    }
                  />
                  <FilterInput
                    type="text"
                    placeholder="Filtra per email"
                    value={filters.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFilters({ ...filters, email: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "right" }}>
                  <ExportXML data={list} />
                </Grid>
              </Grid>
              <Table sx={{ minWidth: 500 }} aria-label="simple table">
                  <TableHead>
                      <TableRow>
                          <StyledTableHeadCell>Name</StyledTableHeadCell>
                          <StyledTableHeadCell>Address</StyledTableHeadCell>
                          <StyledTableHeadCell>Email</StyledTableHeadCell>
                          <StyledTableHeadCell>Phone</StyledTableHeadCell>
                          <StyledTableHeadCell>Iban</StyledTableHeadCell>
                          <StyledTableHeadCell>Code</StyledTableHeadCell>
                          <StyledTableHeadCell>Description</StyledTableHeadCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {list.map((row) => (
                          <TableRow
                          key={row.id}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                          >
                              <TableCell>{row.name}</TableCell>
                              <TableCell>{row.address}</TableCell>
                              <TableCell>{row.email}</TableCell>
                              <TableCell>{row.phone}</TableCell>
                              <TableCell>{row.iban}</TableCell>
                              <TableCell>{row.customerCategory?.code}</TableCell>
                              <TableCell>{row.customerCategory?.description}</TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
            </TableContainer>
        </>
    );
}

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
  }));