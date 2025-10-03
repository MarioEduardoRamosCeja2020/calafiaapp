import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  Button,
  TableContainer,
  Paper,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import GridOnIcon from "@mui/icons-material/GridOn";

// Solo estas columnas se mostrarán en la tabla
const visibleFields = [
  "tipoDocu",
  "fechFac",
  "recoEn",
  "entrEn",
  "formPago",
  "numeInfo",
  "esta_avan",
];

// Formatear nombre de columna
const formatHeader = (key) => {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

function ResultsTable({ data }) {
  const pdfUrl = "https://example.com/report.pdf";
  const excelUrl = "https://example.com/report.xlsx";

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          flexGrow: 1,
          overflowX: "auto",
          maxHeight: "50vh",
          borderRadius: 2,
          minHeight: 250,
        }}
      >
        {data && data.length > 0 ? (
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                {visibleFields.map((key) => (
                  <TableCell
                    key={key}
                    sx={{
                      backgroundColor: "#f5f5f5",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {formatHeader(key)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {visibleFields.map((key) => (
                    <TableCell key={key}>
                      {row[key] !== null && row[key] !== "" ? (
                        key.startsWith("fech") ? (
                          new Date(row[key]).toLocaleString()
                        ) : (
                          row[key]
                        )
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 2,
            }}
          >
            <Typography variant="body2" align="center">
              Realiza una búsqueda para ver resultados.
            </Typography>
          </Box>
        )}
      </TableContainer>

      {data && data.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mt: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            color="error"
            startIcon={<PictureAsPdfIcon />}
            href={"http://45.190.243.90/stctca/CFDI/CartasPorte/TQPA/2014/06/TCA-TQPA25000.pdf"}
            target="_blank"
            sx={{ textTransform: "none", px: 3, py: 1, fontWeight: "bold" }}
          >
            Ver PDF
          </Button>

          <Button
            variant="contained"
            color="success"
            startIcon={<GridOnIcon />}
            href={excelUrl}
            target="_blank"
            sx={{ textTransform: "none", px: 3, py: 1, fontWeight: "bold" }}
          >
            Ver Excel
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default ResultsTable;
