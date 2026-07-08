import React, { useState } from "react";
import FormularioProducto from "../FormularioProducto/FormularioProducto";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export function FormularioContenedor() {
    const [datosForm, setDatosForm] = useState({
        nombre: "",
        precio: "",
        stock: "",
        categoria: ""
        //urlImagen: ""
    });
    const [imagenFile, setImagenFile] = useState(null);
    const manejarCambio = (evento) => {
        setDatosForm({ ...datosForm, [evento.target.name]: evento.target.value });
    };
    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    }
    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        if (!imagenFile) {
            return alert("Seleccione una imagen para su producto");
        }
        try {
            const apiKey = "4992a189af943a5a5de3cedc48d71d88";
            const formData = new FormData();
            formData.append("image", imagenFile);
            const respuestaImg = await
                fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: "POST",
                    body: formData,
                });
            const resultadoImg = await respuestaImg.json();
            if (datosImgbb.success) {
                const urlFinal = resultadoImg.data.url;

                const productParaGuardar = {
                    ...datosForm,
                    imagen: urlFinal,
                    precio: Number(datosForm.precio),
                    stock: Number(datosForm.stock)
                };
                const coleccionRef = collection(db, "productos-nacionales");
                await addDoc(coleccionRef, productParaGuardar);
                alert("¡Producto guardado!")
                setImagenFile(null);
            }
        }
        catch (error) {
            console.error("Error completo: ", error);
        }
    };
    const [loading, setLoading] = useState(false);
    function handleFormSubmit() {
        setLoading(true);
        try {
            setLoading(false);
        }
        catch {
            setLoading(false);
        }
        finally {
            console.log("Fin de la funcion handleFormSubmit");
        }

    }
    return (
        <ProductForm
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            manejarCambioImagen={manejarCambioImagen}
            >
        </ProductForm>
    );
}