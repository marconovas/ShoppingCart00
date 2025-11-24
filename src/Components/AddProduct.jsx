import { useState, useContext } from "react";
import { Button, Form, Container } from "react-bootstrap";
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
        addProduct(data);
        alert("Producto Agregado!");
        navigate("/admin");
    }

    return(
        <Container className="p-4">
            <h3>Agregar producto</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control name="name" placeholder="Título" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control name="description" placeholder="Descripción" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control name="price" placeholder="Precio" type="number" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control name="stock" placeholder="Stock" type="number" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control name="image" placeholder="URL de imagen" onChange={handleChange}/>
                </Form.Group>

                <Button type="submit" variant="success">Guardar</Button>
            </Form>
        </Container>
    )
}

export default AddProduct;