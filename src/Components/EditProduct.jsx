import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsContext } from "../Context/MockApiCOntext";
import { Container, Form, Button, Card } from "react-bootstrap";

function EditProduct() {
    const { id } = useParams();
    const { updateProduct } = useContext(ProductsContext);
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    
    useEffect(() => {
        async function loadData() {
            const res = await fetch(`https://69162abea7a34288a27c8e98.mockapi.io/products/${id}`);
            const prod = await res.json();
            setData(prod);
        }

        loadData();
    }, [id]);
    

    if(!data) return <p>Cargando...</p>;

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value} );
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        updateProduct(id, data);
        alert("Producto Actualizado!");
        navigate("/admin");
    }

    return(
        <Container className="py-4 d-flex justify-content-center">
            <Card className="shadow-sm p-4" style={{ maxWidth: "500px", width: "100%" }}>
                <h3 className="mb-4 text-center">Editar producto</h3>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Título</Form.Label>
                        <Form.Control
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Título del producto"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Descripción</Form.Label>
                        <Form.Control
                            name="description"
                            value={data.description}
                            as="textarea"
                            rows={3}
                            onChange={handleChange}
                            placeholder="Descripción detallada"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Precio</Form.Label>
                        <Form.Control
                            name="price"
                            type="number"
                            value={data.price}
                            onChange={handleChange}
                            placeholder="Precio"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">Stock</Form.Label>
                        <Form.Control
                            name="stock"
                            type="number"
                            value={data.stock}
                            onChange={handleChange}
                            placeholder="Cantidad disponible"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">URL de imagen</Form.Label>
                        <Form.Control
                            name="image"
                            value={data.image}
                            onChange={handleChange}
                            placeholder="https://..."
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-center mt-3">
                        <Button type="submit" variant="warning" className="px-4 fw-semibold">
                            Guardar cambios
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    )
}

export default EditProduct;