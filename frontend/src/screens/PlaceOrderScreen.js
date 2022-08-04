import React,{useState,useEffect} from 'react'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import { Form,Button,Row,Col,ListGroup,Image,Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'

function PlaceOrderScreen() {
    const cart=useSelector(state=>state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc,item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice=(cart.itemsPrice>100 ? 0 :10).toFixed(2)
    cart.taxPrice=((0.082)*cart.itemsPrice).toFixed(2)

    cart.totalPrice=(Number(cart.itemsPrice)+ Number(cart.shippingPrice)+ Number(cart.taxPrice)).toFixed(2)
    const placeOrder=()=>{
        console.log('placed')
    }
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4/>
      <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>shipping</h2>
                    <p><strong>shipping:</strong>
                    {cart.shippingAddress.address},{cart.shippingAddress.city},{'  '}
                    {cart.shippingAddress.postalcode},
                    {'  '}
                    {cart.shippingAddress.country}

                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>payment method</h2>
                    <p><strong>method:</strong>
                    {cart.paymentmethod}
                   

                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>oder items</h2>
                    {cart.cartItems.length === 0 ? <Message variant='info'>
                        your cart is empty
                    </Message>:(
                        <ListGroup variant='flush'>
                            {cart.cartItems.map((item,index)=>(
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>

                                        <Col>
                                        <Link to={`/products/${item.product}`}>{item.name}</Link>
                                        </Col>

                                        <Col md={4}>
                                            {item.qty} x ${item.price} = ${(item.qty  * item.price).toFixed(2)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                   
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup>
                    <ListGroupItem>
                        <h2>order summary</h2>
                    </ListGroupItem>

                    <ListGroup.Item>
                        <Row>
                            <Col>Items:
                            </Col>

                            <Col>${cart.itemsPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>


                    <ListGroup.Item>
                        <Row>
                            <Col>shipping:
                            </Col>

                            <Col>${cart.shippingPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Tax:
                            </Col>

                            <Col>${cart.taxPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Total:
                            </Col>

                            <Col>${cart.totalPrice}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Button type='button' className='btn-block'
                        disabled={cart.cartItems=== 0}
                        onClick={placeOrder}>place order</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
      </Row>
    </div>
  )
}

export default PlaceOrderScreen
