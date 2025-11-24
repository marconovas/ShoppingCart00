import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsContext } from "../Context/MockApiCOntext";
import { Container, Form, Button } from "react-bootstrap";

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
        <Container className="p-4">
            <h3>Editar producto</h3>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control name="name" value={data.name} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control name="description" value={data.description} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control name="price" type="number" value={data.price} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control name="stock" type="number" value={data.stock} onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control name="image" value={data.image} onChange={handleChange}/>
                </Form.Group>

                <Button type="submit" variant="warning">Guardar cambios</Button>
            </Form>
        </Container>
    )
}

export default EditProduct;