import React,{useState,useEffect} from 'react'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import { Form,Button,Col,Row,Table } from 'react-bootstrap'
import {LinkContainer  } from 'react-router-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails,updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'

function ProfileScreen() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPasssword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [message,setMessage]=useState('')

    const dispatch=useDispatch()

    const navigate=useNavigate()
    const location=useLocation()
    
    const userDetails=useSelector(state=>state.userDetails)
    const {error,loading,user}=userDetails

    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin

    const userUpdateProfile=useSelector(state=>state.userUpdateProfile)
    const {success}=userUpdateProfile

    const orderListMy=useSelector(state=>state.orderListMy)
    const {loading:loadingOrders,error:errorOrders,orders}=orderListMy
    useEffect(()=>{
        if(!userInfo){
            navigate('/login')
        }else{
            if(!user ||  !user.name || success || userInfo._id !== user._id){
                dispatch({type:USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[navigate,userInfo,dispatch,user,success])
    
    const submitHandler = (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('password does not match')
        }else{
            dispatch(updateUserProfile({'id':user._id,
            'name':name,
            'email':email,
            'password':password}))
            setMessage('password matches')
        }
        
    }
  return (
    <Row>
      <Col md={3}>
        <h2>User profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
      <Form onSubmit={submitHandler}>

        
        <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control required type='name' placeholder='Enter name' 
            value={name}
            onChange={(e)=>setName(e.target.value)}></Form.Control>
        </Form.Group>
        
        
        <Form.Group controlId='email'>
        <Form.Label>Email Adress</Form.Label>
        <Form.Control required type='email' placeholder='Enter Email' 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}></Form.Control>
        </Form.Group>


        <Form.Group controlId='password'>
        <Form.Label>password</Form.Label>
        <Form.Control type='password' placeholder='Enter password' 
        value={password}
        onChange={(e)=>setPasssword(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='passwordConfirm'>
        <Form.Label>Confirm password</Form.Label>
        <Form.Control type='password' placeholder='Confirm password' 
        value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>Update</Button>

      </Form>
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
        {loadingOrders ?(
          <Loader/>
        ):errorOrders?(
          <Message variant='danger'>
            {errorOrders}
          </Message>
        ):(
          <Table striped responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                </tr>
                </thead>
                <tbody>
                  {orders.map(order=>(
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0,10)}</td>
                      <td>${order.totalPrice}</td>
                      <td>{order.isPaid ? order.paidAt :(
                        <i className='fas fa-times' style={{color:'red'}}></i>
                      )}</td>
                      <td>
                        <LinkContainer to={`/orders/${order._id}`}>
                          <Button className='btn-sm'>details</Button>
                        </LinkContainer>
                      </td>

                    </tr>
                  )
                  )}
                </tbody>
              
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
