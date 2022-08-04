import React,{useState,useEffect} from 'react'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import { Form,Button } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {saveShippingAddress} from '../actions/cartActions'
function ShippingScreen() {

    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart
    const navigate=useNavigate()
    const [address,setAdress]=useState(shippingAddress.address)
    const [city,setCity]=useState(shippingAddress.city)
    const [postalcode,setPostalcode]=useState(shippingAddress.postalcode)
    const [country,setCountry]=useState(shippingAddress.country)
    const dispatch=useDispatch()

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalcode,country}))
        navigate('/payment')
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
                <Form.Label>Adress</Form.Label>
                <Form.Control required type='text' placeholder='Enter address' 
                value={address ? address : ''}
                onChange={(e)=>setAdress(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
                <Form.Label>city</Form.Label>
                <Form.Control required type='text' placeholder='Enter city' 
                value={city ? city : ''}
                onChange={(e)=>setCity(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalcode'>
                <Form.Label>postalcode</Form.Label>
                <Form.Control required type='text' placeholder='Enter postalcode' 
                value={postalcode ? postalcode : ''}
                onChange={(e)=>setPostalcode(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='country'>
                <Form.Label>country</Form.Label>
                <Form.Control required type='text' placeholder='Enter country' 
                value={country ? country : ''}
                onChange={(e)=>setCountry(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='sumbit' variant='primary'>
            Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
