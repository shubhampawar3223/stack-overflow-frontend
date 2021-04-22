import React from 'react';
import {Link} from 'react-router-dom';

export default function Sidenav(){
    return(
        <div className=" col-3 col-sm-3 col-lg-2  pl-lg-5 " style={{height:"140vh", fontSize:"1.3rem",borderRight:"1px solid black",zIndex:"2",backgroundColor:"#d4d5d6"}}>
        <p style={{marginTop:"20%"}}><Link className="text-dark" to="/">Home</Link></p>
        <p style={{marginTop:"20%"}}>Public</p>
        <p><i className="fa fa-globe" aria-hidden="true"></i><Link className="text-dark" to="/questions">Questions</Link></p>
        <p className="ml-lg-3"><Link className="text-dark" to="/tags">Tags</Link></p>
        <p className="ml-lg-3"><Link className="text-dark" to="/users">Users</Link></p>                 
     </div>      
    )
}