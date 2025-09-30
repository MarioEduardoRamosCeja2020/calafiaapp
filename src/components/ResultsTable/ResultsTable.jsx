import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  Button
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import GridOnIcon from "@mui/icons-material/GridOn";

const formatHeader = (key) => {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

function ResultsTable({ data }) {
  if (!data || data.length === 0) {
    return (
      <Typography variant="body2" align="center" sx={{ mt: 1 }}>
        No results yet
      </Typography>
    );
  }

  const allKeys = Object.keys(data[0]);

  // URLs remotas (reemplaza con tus URLs reales)
  const pdfUrl = "https://example.com/report.pdf";
  const excelUrl = "https://example.com/report.xlsx";

  return (
    <Box sx={{ overflowX: "auto" }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {allKeys.map((key) => (
              <TableCell key={key}>{formatHeader(key)}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {allKeys.map((key) => (
                <TableCell key={key}>
                  {row[key] !== null && row[key] !== "" ? (
                    key.startsWith("fech") && row[key] ? (
                      new Date(row[key]).toLocaleString()
                    ) : (
                      row[key]
                    )
                  ) : (
                    ""
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Botones PDF y Excel */}
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
          href={"file://192.168.1.11/stctca/CFDI/CartasPorte/TQPA/2014/06/TCA-TQPA25000.pdf"}
          target="_blank"
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            px: 3,
            py: 1,
          }}
        >
          View PDF
        </Button>

        <Button
          variant="contained"
          color="success"
          startIcon={<GridOnIcon />}
          href={excelUrl}
          target="_blank"
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            px: 3,
            py: 1,
          }}
        >
          View Excel
        </Button>
      </Box>
    </Box>
  );
}

export default ResultsTable;
