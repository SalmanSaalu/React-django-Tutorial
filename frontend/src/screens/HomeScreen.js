import axios from 'axios'
import React,{useState,useEffect} from 'react'
import {Row,Col} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
// import products from '../products'

import {listProducts} from '../actions/productActions'

function HomeScreen() {
  const dispatch=useDispatch()
  const productList =useSelector(state => state.productlist)
  const {error,loading,products} =productList
  // const [products,setProducts]=useState([])
  useEffect(()=>{
    // async function fetch(){
    //   const {data}=await axios.get('/api/products/')
    //   setProducts(data)
    // }
    // fetch()
    dispatch(listProducts())
},[dispatch])

// const products=[]
  return (
    <div>
      <h1>Latest products</h1>
      {loading ? <Loader/>
      :error ? <Message variant='danger'>{error}</Message>
    :     
     <Row>
      {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
          <Product product={product} />
          </Col>
      ))}
    </Row>
   }
 
    </div>
  )
}

export default HomeScreen
