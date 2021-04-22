import React from 'react';
import {Link} from 'react-router-dom';
import NavElement from './NavElement'


export default function About(){
    return(
        <div >
            <NavElement/>
            <div className="container">
            <div className=" d-flex justify-content-center" style={{marginTop:"5%"}}>
            <Link to='/'><img height="70vh" src="data:image/png;base64,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"/></Link> 
            </div>     
            <div  style={{marginTop:"10%"}}>    
            <h3 style={{color:"#848687"}} >Who we are</h3>    
            <h1 >Helping developers and technologists write the script of the future.</h1>
            <h4 >Our public platform serves many people every month.Our asynchronous knowledge management and collaboration offering Stack Overflow for Teams, is transforming how people work.</h4>
            </div>            
            </div>
        </div>
    )
} 