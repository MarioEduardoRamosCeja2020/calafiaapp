import React from "react";
import Lottie from "lottie-react";
import truckAnimation from "../animations/truck-loader.json"; // Ajusta si tu ruta es distinta

const TruckLoader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "50vh", // Usa hasta el 50% de la altura de la pantalla
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Lottie
        animationData={truckAnimation}
        loop
        style={{
          width: "50%",
          height: "100%",
          alignItems: "center",
        }}
      />
    </div>
  );
};

export default TruckLoader;
