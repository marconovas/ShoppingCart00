import { Container, Table, Button } from "react-bootstrap";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { ProductsContext } from "../Context/MockApiCOntext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Admin () {
    {/*----------------- DONE WITH PROTECTEDROUTE.JSX -------------
        const auth = localStorage.getItem("auth");
        const navigate = useNavigate();
    
        if(!auth){
            navigate("/login");
        }    
    */}

    const { products, deleteProduct } = useContext(ProductsContext); 

    return(
        <div>
            <Header />

            <div className="d-flex flex-column justify-content-center align-items-center text-center">
                <h3 className="fw-bold mb-3">Welcome Admin!</h3>
                <p className="lead mb-4">Don't forget to logout after finishing!</p>
            
                <Link to="/admin/add">
                    <Button variant="success" className="mb-3">
                        + Add Product
                    </Button>
                </Link>
            </div>

            <Container>

                <Table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Stock</th>                      
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <th>{p.name}</th>
                                <th>{p.description}</th>
                                <th>${p.price}</th>
                                <th>{p.stock}</th>

                                <td className="d-flex gap-2">
                                    <Link to={`/admin/edit/${p.id}`}>
                                        <Button variant="warning" size="sm">Editar</Button>
                                    </Link>

                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => deleteProduct(p.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>


            <Footer />
        </div>
    )
}

export default Admin;