import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import NavElement from './NavElement';
import axios from 'axios';
import Sidenav from './Sidenav'

export default function Questions(){
    let [que, setQue] = useState([]);
    let [user,setUser] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(async()=>{
        setLoading(true);
        const url='https://stack-overflow-new1.herokuapp.com/all-que';
        let resp = await axios.get(url);
        setUser(()=>[...resp.data.data2])
        setQue(()=>[...resp.data.data]);
        setLoading(false);
         
    },[])
    
    return(
        <div className="container-fluid">
            <NavElement/>
            <div className="row">
               <Sidenav/> 
               <div className="col-7 col-lg-7"> 
                  
                 <div style={{borderBottom:"1px solid #b4b6b8"}}>  
                 <div className="ml-5 d-flex justify-content-between">  
                 <div>
                 <h1 className="mt-5">All Questions</h1>
                 </div>
                 <div>
                 <a href='/ask-question'><button className="btn btn-primary  btn-lg mt-5">Ask Question</button></a> 
                 </div>
               
                 </div>
                </div>
               <div>                
               {
                (loading===false) ?  
               que.map((e,i)=>{
                 return(  
                <div style={{borderBottom:"1px solid #dee1e3"}} >
                <div className="ml-5 mt-3" >
                <div > 
                <div className="row">
                    <div className="col-2">
                           <div style={{color:"#848687"}}>
                               <h3 className="text-center">{e.votes}</h3>
                               <p className="text-center">Votes</p>
                           </div>
                           <div style={{color:"#848687"}}>
                               <h3 className="text-center">{e.answerCount}</h3>
                               <p className="text-center">Answers</p>
                           </div>
                    </div>
                    <div className="col-10">
                        <h4><a href={'/questions/'+e.queId}>{e.title}</a></h4>
                        <div className="bg-info text-truncate" style={{height:"4vh"}}>
                        <h5>{e.body}</h5>
                        </div>
                        {
                          e.tags.map((e)=>{
                              return(
                                <button className="btn btn-primary m-1">{e}</button>
                              )
                          })  
                        }
                    </div>                               
                </div>
                    <div>
                       <div className="offset-8 mb-1">
                           <img height="60vh" src={user[i].profilePic} />
                           <a href={"/users/"+user[i].userId}>{user[i].name}</a>
                       </div>         
                    </div>
                </div>     
                 </div> 
                </div>
                 )
               })            
               :
               <div className="d-flex justify-content-center"><i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
                    <span class="sr-only">Loading...</span>
                </div>   
               }
               </div>
               
                </div> 

                {/* {
                    loading?
                    <div className="d-flex justify-content-center"><i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
                    <span class="sr-only">Loading...</span>
                    </div>
                    :null  
                }   */}
                   

               </div>
        </div>
    )
} 