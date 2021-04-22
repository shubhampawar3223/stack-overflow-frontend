import React,{useState,useRef} from 'react';
import {useHistory} from 'react-router-dom'
import NavElement from './NavElement';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import './Signin.css'
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

export default function Signup(){
    const [show1, setShow1] = useState(false)
    const [show3, setShow3] = useState(false)
    const [loading,setLoading] = useState(false);
    
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();

    const submit= async(e)=>{
      e.preventDefault();
      setLoading(true);
      const url="https://stack-overflow-new1.herokuapp.com/signup";
      if(nameRef.current.value ==='' || emailRef.current.value ==='' || passwordRef.current.value ===''){
        setShow3(true);
      }
      else{
      let postData = {
          name: nameRef.current.value,
          email:emailRef.current.value,
          password:passwordRef.current.value      
      }  
      let resp = await fetch(url,{
          method: 'POST',
          mode:'cors',
          headers: {
              'Content-Type': 'application/json'
          },
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(postData)
      });
      let n = await resp.json();

      if(resp.status === 200){
          localStorage.setItem('Authorisation',n.token);
          localStorage.setItem('email',emailRef.current.value);
          history.push('/login');  
      }
      else if(resp.status === 400){
          setShow1(true); 
      }
    }
    setLoading(false);
    }

    return(
        <div >
        <NavElement/>
        <div className="container">

        {
          show1 ?
      <Alert variant="danger" onClose={() => setShow1(false)} dismissible>
        <Alert.Heading>User Already Present</Alert.Heading>
      </Alert>
      :null
     }   
         
    
{
          show3 ?
      <Alert variant="danger" onClose={() => setShow3(false)} dismissible>
        <Alert.Heading>Please Enter Valid Inputs.</Alert.Heading>
      </Alert>
      :null
     }
          
        <div className="row" style={{marginTop:"10%"}}>
        <div className="col-sm-6 col-lg-8 "style={{ }}>
            <h1 className=" " style={{marginTop:"7%" }}>Join the Stack Overflow community</h1>   
            <h3><i class="fa fa-question-circle fa-1x font1" aria-hidden="true"></i> Get unstuck-ask a question</h3> 
            <h3><i class="bi bi-chevron-expand font1"></i>Unlock new privileges like voting and commenting</h3>
            <p className="mt-5 font1">Collaborate and share knowledge with a private group for FREE.</p>
        </div>
        <div className=" border col-sm-6  col-lg-4" style={{borderRadius:"10px", boxShadow:"5px 10px 18px #888888" }}>
               <div className="form-group p-3">
                   <input type="text" ref={nameRef} className="mt-3 form-control" placeholder="Enter Your Name" required></input>
                   <input type="email" ref={emailRef} className="form-control mt-4" placeholder="Enter Email Id" required></input>
                   <input type="password" ref={passwordRef} className=" mt-4 form-control " placeholder="Enter Password" required></input>
                   <button onClick={submit} className="btn btn-primary form-control mt-3">Sign In</button>
               </div>      
        </div>        
        </div>
           {
             loading?
             <div><i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
             <span class="sr-only">Loading...</span></div>
             :null  
           }
        </div>
    </div>
    )
}