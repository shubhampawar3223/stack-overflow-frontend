import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import NavElement from './NavElement';
import axios from 'axios';
import './User.css'
import Sidenav from './Sidenav';
import Profile from './Profile';

export default function User(props){
     const [userData,setData] = useState([]);
     const [userProfile,setProfile] = useState([]);


    
     return(
         <div >
           <NavElement/> 
            <div className="row">
                
                <Sidenav/>
               <div className="col-7 col-lg-10">
                   <div className="ml-3" style={{marginTop:"7%"}}>
                        <Profile id={props.match.params.id}/>
                    </div>
               </div>
            </div>   
            
        </div>    
    )
}
