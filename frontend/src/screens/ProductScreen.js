import React,{useState,useEffect} from 'react'
import {Link,useParams,useNavigate } from 'react-router-dom'
import {Row ,Col,Image,ListGroup,Button,ListGroupItem,Card, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import {listProductDetails} from '../actions/productActions'
import { withRouter } from 'react-router'
// import products from '../products'

function ProductScreen() {
    // const [product,setProduct]=useState([])
    const navigate=useNavigate()
    const [qty,setQty] =useState(1)
    const dispatch=useDispatch()
    const productDetails=useSelector(state=>state.productdetails)
    const {loading,error,product}=productDetails
    const number=useParams()
    useEffect(()=>{
  
            dispatch(listProductDetails(number.id))
    // async function  fetchProduct(){
    // const {data}= await axios.get(`/api/products/${number.id}`)
    // setProduct(data)
//   }
  
    // fetchProduct()
  },[dispatch,number.id])

  const addToCartHandler=()=>{
    navigate(`/cart/${number.id}?qty=${qty}`)
  }
//   let product ={}

//   const product = products.find((p) => p._id === number.id)
  return (
    <div>
        <Link to='/' className='btn btn-light my-3 '>Go back</Link>
        {
            loading? <Loader/>
            : error
            ? <Message variant='danger'>{error}</Message>
            :
            (
                <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name}/>
            </Col>
            <Col md={3}>
                <ListGroup variant="flush">
                    <ListGroupItem>
                        <h3>{product.name}</h3>
                    </ListGroupItem>

                    <ListGroupItem>
                        <Rating value={product.rating} text={`${product.numReviews} rating `}color={'#f82825'}/>
                    </ListGroupItem>

                    <ListGroupItem>
                        Price : ${product.price}
                    </ListGroupItem>

                    <ListGroupItem>
                        Description : {product.description}
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem >
                            <Row>
                                <Col>Price :</Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem >
                            <Row>
                                <Col>Status :</Col>
                                <Col>
                                    {product.countInStock > 0 ? 'In stock' : 'Out of Stock'}
                                </Col>
                            </Row>
                        </ListGroupItem>

                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col xs='auto' className='my-1'>
                                    <Form.Control as='select'
                                    value={qty}
                                    onChange={(e)=>setQty(e.target.value)}>
                                    
                                    {

                                        [...Array(product.countInStock).keys()].map((x)=>(
                                            <option key={x+1} value={x+1}>
                                                {x+1}
                                            </option>
                                        ) )
                                    }

                                    </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}
                        <ListGroupItem >
                            <Button 
                            onClick={addToCartHandler}
                            className='btn-block' disabled={product.countInStock === 0 } type='button' >
                                Add to Cart
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
            )
        }
        
        

      
    </div>
  )
}

export default ProductScreen
