// src/components/AutocompleteRoutes.jsx
import { TextField, CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";

const AutocompleteRoutes = ({ value, onChange }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/full-routes");
        if (!res.ok) throw new Error("Error cargando rutas");
        const data = await res.json();
        const mapped = data.map((r) => ({
          id: r.Id_rut,
          nombre: r.Nombre_rut,
          origenDesc: `${r.CiudadO}, ${r.EstadoO}, ${r.PaisO}`,
          destinoDesc: `${r.CiudadD}, ${r.EstadoD}, ${r.PaisD}`,
          distancia: r.DistanciaKM_rut,
          duracion: r.DuracionHoras_rut,
          cuotaTonelada: r.CuotaTonelada_rut,
          cuotaAuto: r.CuotaAutopts_rut,
          cuotaBarco: r.CuotaBarco_rut,
          Observaciones_rut: r.Observaciones_rut || "-",
        }));
        setOptions(mapped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={(_, newVal) => onChange(newVal)}
      getOptionLabel={(option) => option.nombre || ""}
      isOptionEqualToValue={(option, val) => option.id === val?.id}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Selecciona ruta"
          variant="outlined"
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              height: 55,
              backgroundColor: "rgba(255,255,255,0.9)",
              boxShadow: "inset 0 0 6px rgba(0,0,0,0.1)",
            },
            input: { fontSize: "0.95rem" },
          }}
        />
      )}
    />
  );
};

export default AutocompleteRoutes;
