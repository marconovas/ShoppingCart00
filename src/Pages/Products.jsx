import { Col, Container, Row, Card, Button, Alert } from "react-bootstrap";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../Context/MockApiCOntext";

function Products () {
    const { cart, addToCart, removeFromCart } = useCart();
    const  { products } = useContext(ProductsContext);

    //DEBOUNCE (OPTIMIZACIÓN DE BÚSQUEDA)
    const useDebounce = (value, delay = 300) => {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay)
            
            return () => clearTimeout(handler);
        }, [value, delay]);

        return debouncedValue;
    };

    //BUSQUEDA DE PRODUCTOS
    const [ search, setSearch ] = useState("");
    const debouncedSearch = useDebounce(search, 300);

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    return(
        <>
            <Header />

            <div className="input-group mb-3">
                <span className="input-group-text bg-white border-end-0">
                    <i className="bi bi-search text-secondary"></i>
                </span>

                <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Buscar productos..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>




            <Container className="my-5">
                <Row xs={1} md={3} className="g-4">

                    {search !== "" ? (              ///mostrar todos los productos si no tengo nada en el buscador
                        filteredProducts.map((i) => {
                        const cartItem = cart.find((p) => p.id === i.id); //veo si el item ya está en el carrito (info util para botones)

                        return (
                        <Col key={i.id}>
                            <Card className="h-100">
                                <Card.Img 
                                    variant="top" 
                                    src={i.image?.trim() || "holder.js/100px180"}
                                    width="300px" 
                                    height="300px" 
                                />
                            <Card.Body className="d-flex flex-column justify-content-between">
                                <div>
                                <Card.Title>{i.name}</Card.Title>
                                <Card.Text>
                                    {i.description}
                                    <br />
                                    <b>${i.price}</b>
                                </Card.Text>
                                </div>

                                <div className="d-flex justify-content-center mt-3 flex-wrap">
                                <Button
                                    as={Link}
                                    to={`/detail/${i.id}`}
                                    variant="primary"
                                    className="me-2 mb-2"
                                >
                                    Description
                                </Button>
                                
                                {cartItem ? (
                                    <>
                                    {cartItem.quantity > 1 && (
                                        <Button
                                        variant="danger"
                                        className="me-2 mb-2"
                                        onClick={() => removeFromCart(i.id)}
                                        >
                                        Remove
                                        </Button>
                                    )}
                                    <Button
                                        variant="success"
                                        className="mb-2"
                                        onClick={() => addToCart(i)}
                                    >
                                        Buy More
                                    </Button>
                                    </>
                                ) : (
                                    <Button
                                    variant="success"
                                    className="mb-2"
                                    onClick={() => addToCart(i)}
                                    >
                                    Buy Now
                                    </Button>
                                )}
                                </div>
                            </Card.Body>
                            </Card>
                        </Col>
                        );
                    })
                    ) : (
                        products.map((i) => {
                        const cartItem = cart.find((p) => p.id === i.id); //veo si el item ya está en el carrito (info util para botones)

                        return (
                        <Col key={i.id}>
                            <Card className="h-100">
                                <Card.Img 
                                    variant="top" 
                                    src={i.image?.trim() || "holder.js/100px180"}
                                    width="300px" 
                                    height="300px" 
                                />
                            <Card.Body className="d-flex flex-column justify-content-between">
                                <div>
                                <Card.Title>{i.name}</Card.Title>
                                <Card.Text>
                                    {i.description}
                                    <br />
                                    <b>${i.price}</b>
                                </Card.Text>
                                </div>

                                <div className="d-flex justify-content-center mt-3 flex-wrap">
                                <Button
                                    as={Link}
                                    to={`/detail/${i.id}`}
                                    variant="primary"
                                    className="me-2 mb-2"
                                >
                                    Description
                                </Button>
                                
                                {cartItem ? (
                                    <>
                                    {cartItem.quantity > 1 && (
                                        <Button
                                        variant="danger"
                                        className="me-2 mb-2"
                                        onClick={() => removeFromCart(i.id)}
                                        >
                                        Remove
                                        </Button>
                                    )}
                                    <Button
                                        variant="success"
                                        className="mb-2"
                                        onClick={() => addToCart(i)}
                                    >
                                        Buy More
                                    </Button>
                                    </>
                                ) : (
                                    <Button
                                    variant="success"
                                    className="mb-2"
                                    onClick={() => addToCart(i)}
                                    >
                                    Buy Now
                                    </Button>
                                )}
                                </div>
                            </Card.Body>
                            </Card>
                        </Col>
                        );
                    })
                    )}
                
                </Row>

                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                />
            </Container>

            <Footer />
        </>
    )
}

export default Products;