import React,{useRef} from 'react';
import {Link,useHistory} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Nav,Form ,FormControl,Button } from 'react-bootstrap';


export default function NavElement(){
    const history = useHistory();
    const mySidebar = useRef();
    const logout = (e)=>{
       e.preventDefault();
       localStorage.removeItem('Authorisation');
       localStorage.removeItem('email');
       localStorage.removeItem('tags');
       localStorage.removeItem('userId');
       history.push('/');
       alert('You are logged out');
       
    }
    
    const w3_open=(e)=>{
        e.preventDefault()
        mySidebar.current.style.display = "block"; 
    }

    const w3_close=(e)=>{
        e.preventDefault()
       mySidebar.current.style.display = "none"; 
     }

    return(
        <div style={{zIndex:"1"}}>
    <Navbar bg="light" variant="light">
    <button className="btn btn-light" onClick={w3_open}>☰</button>   
    <Navbar.Brand href="#home" className="ml-3"><a href="/"><img height="40px" src="https://stackoverflow.design/assets/img/logos/so/logo-stackoverflow.svg"/></a> </Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/about">About</Nav.Link>
    </Nav>
    <Form inline className="mr-5">
      {
      localStorage.getItem('Authorisation')===null ?   
      <> 
      <Link to="/login"><Button variant="outline-primary">Login</Button></Link>
      <Link to="/signup"><Button variant="primary" className="ml-2">SignUp</Button></Link>
      </> 
      :
      <>
      <Link to="/user-dashboard"><Button variant="outline-primary"><i class="fa fa-user" aria-hidden="true"></i>
Profile</Button></Link>
      <Button variant="danger" onClick={logout} className="ml-2">Logout</Button>
      </>
      }
    </Form>
  </Navbar>
        
  <div className="w3-sidebar w3-bar-block w3-border-right" style={{display:"none"}} ref={mySidebar}>
    <button onClick={w3_close} className="w3-bar-item w3-large">Close &times;</button>
    <a href="/" class="w3-bar-item w3-button">Home</a>
    <a href="/questions" class="w3-bar-item w3-button">Questions</a>
    <a href="/tags" class="w3-bar-item w3-button">Tags</a>
    <a href="/users" class="w3-bar-item w3-button">Users</a>
     </div>

        </div>
    )
    
} 