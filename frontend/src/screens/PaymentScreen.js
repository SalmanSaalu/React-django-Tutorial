import React,{useState,useEffect} from 'react'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import { Form,Button,Col } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {savePaymentmethod} from '../actions/cartActions'

function PaymentScreen() {
    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart
    const dispatch=useDispatch()
  const navigate=useNavigate()
  const [paymentmethod,setPaymentmethod]=useState('Paypal')
 if(!shippingAddress.address){
    navigate('/shipping')
 }

 const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(savePaymentmethod(paymentmethod))
    navigate('/placeorder')
 }

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <Form onSubmit={submitHandler}>

            <Form.Group>
                <Form.Label as='legend'>
                    Select Method
                </Form.Label>
                <Col>
                <Form.Check type='radio' 
                id='paypal' name='paymentmethod' checked onChange={(e)=>
                setPaymentmethod(e.target.value)}>
                    
                </Form.Check><label>Paypal or Credit Card</label>
                </Col>
            </Form.Group>


            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen
