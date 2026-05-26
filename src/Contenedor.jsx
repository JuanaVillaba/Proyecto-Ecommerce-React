import React from "react";
function Contenedor({ children }) {
    const estilo = {
        border: "1px solid #ff0000",
        padding: "16px",
        margin: "16px 0",
        "background-color": "red",
        color: "pink",
    };
    return
     <div style={estilo}>{children}</div>;
}
export default Contenedor;