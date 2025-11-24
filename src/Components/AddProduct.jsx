import { useState, useContext } from "react";
import { Button, Form, Container, Card } from "react-bootstrap";
import { ProductsContext } from "../Context/MockApiCOntext";
import { useNavigate } from "react-router-dom";

function AddProduct() {
    const { addProduct } = useContext(ProductsContext);
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        stock: 0
    })

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value});
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(
            !data.name ||
            !data.description ||
            !data.price ||
            !data.stock
        ) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        addProduct(data);
        alert("Producto Agregado!");
        navigate("/admin");
    }

    return(
        <Container className="py-4 d-flex justify-content-center">
            <Card className="shadow-sm p-4" style={{ maxWidth: "500px", width: "100%" }}>
                <h3 className="mb-4 text-center">Agregar producto</h3>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Título</Form.Label>
                        <Form.Control 
                            name="name" 
                            placeholder="Ingrese el título"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Descripción</Form.Label>
                        <Form.Control 
                            name="description" 
                            placeholder="Ingrese la descripción"
                            as="textarea"
                            rows={3}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Precio</Form.Label>
                        <Form.Control 
                            name="price" 
                            type="number"
                            placeholder="Ingrese el precio"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Stock</Form.Label>
                        <Form.Control 
                            name="stock" 
                            type="number"
                            placeholder="Cantidad disponible"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">URL de imagen</Form.Label>
                        <Form.Control 
                            name="image" 
                            placeholder="https://..."
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-center mt-3">
                        <Button type="submit" variant="success" className="px-4">
                            Guardar
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    )
}

export default AddProduct;