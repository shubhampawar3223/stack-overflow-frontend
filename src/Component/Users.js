import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import NavElement from './NavElement';
import axios from 'axios';
import Sidenav from './Sidenav';

export default function Users(){
    const [users,setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(async()=>{
       setLoading(true);
       let url="https://stack-overflow-new1.herokuapp.com/users"
       let resp = await axios.get(url);
       setUsers(()=>[...resp.data.data])
       setLoading(false);
    },[])

    return(
        <div >
          <NavElement/> 
           <div className="row">
                 <Sidenav/>   
             <div className="col-7 col-lg-10">
                 <h2 className="mt-3">Users</h2> 
                 <div style={{marginTop:"3%"}}>
                   <div className="row ml-3">  
                   {
                       loading === false ?
                       users.map((e)=>{
                         return(  
                           <div className="col-6 col-xl-4 mt-3">
                             <div className="row">
                                
                              <img className="img-thumbnail " src={e.profilePic}/> 
                              <div className="ml-2">
                              <Link  to={"/users/"+e.userId}><h4>{e.name}</h4> </Link>
                              
                              <div className="mt-3">
                              {
                                e.tags.map((e)=>{
                                    return( 
                                     <div>
                                       <a>{e}</a>  
                                     </div>   
                                    )                                    
                                })  
                              }
                              </div>
                              </div>
                             </div> 
                           </div>
                         )                        
                       })
                       :
                       <div className="d-flex justify-content-center">
                       <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
                       <span class="sr-only">Loading...</span>
                       </div>     
                   }    
                   </div>                        
                 </div>                 
              </div>
           </div>
            
        </div>
    )
} 