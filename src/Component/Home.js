import React from 'react';
import {Link} from 'react-router-dom';
import NavElement from './NavElement'
import './Home.css'

export default function Home(){
    return(
        <div className="containe-fluid" style={{zIndex:"-1"}}>
            <NavElement/>
            <div className="mt-5">
                 <div className="offset-1 col-10 bg-dark rounded" style={{boxShadow:"10px 40px 18px #888888"}}> 
                   <div className="d-flex justify-content-center p-5 mt-3">
                         <div className="d-flex flex-column rounded  col-6" style={{backgroundColor:"#edd2b7"}}>
                              <div className="d-flex justify-content-center mt-3">
                              <i class="fa fa-search fa-5x" aria-hidden="true"></i>
                              </div> 
                              <div className="d-flex justify-content-center mt-3">
                                <h4>
                                Find the best answer to your technical 
                                </h4>  
                              </div>
                              <div className="d-flex justify-content-center">
                                  <h4>
                                  question, help others answer theirs.  
                                  </h4>
                              </div>
                              <div className="d-flex justify-content-center m-4 ">
                                <Link to='/signup'><button className="btn btn-lg" style={{backgroundColor:"#ed821a"}}>Join the community</button></Link>
                              </div>
                         </div>
                   </div>

                   <div className="text-center text-light m-3 fontU" >
                        <h1>Every</h1>
                        <h1 style={{color:"#e88533"}}>Developer</h1>
                        <h1>has a tab open to</h1>
                        <h1>Stack Overflow</h1>
                   </div>

                   <div>
                     <div className="d-flex justify-content-around mt-5">
                         <div className="text-center">
                           <h2 className="text-light font-weight-bolder ">100+ million</h2>
                           <div  style={{color:"#a6a4a4"}}>
                           <h5 >monthly visitors to Stack </h5>
                           <h5>Overflow & Stack </h5>
                           <h5>Exchange</h5>
                           </div>
                          </div>
                         <div className="text-center">
                           <h2 className="text-light font-weight-bolder">45.1+ billion</h2>
                           <div  style={{color:"#a6a4a4"}}>
                           <h5 >Times a developer </h5>
                           <h5>got help since 2008</h5>  
                           </div>
                         </div>
                         <div className="text-center">
                           <h2 className="text-light font-weight-bolder ">179% ROI</h2>
                           <div  style={{color:"#a6a4a4"}}>
                           <h5 >from companies using</h5>
                           <h5>Stack Overflow for Teams</h5>
                           </div> 
                         </div>
                         <div className="text-center">
                           <h2 className="text-light font-weight-bolder text-center">5,000+</h2>
                           <div style={{color:"#a6a4a4"}}>
                           <h5 >Stack Overflow for Teams</h5>
                           <h5>instances active every day</h5>
                           </div>
                         </div>
                     </div>
                 </div>

                 </div>

                 
            </div>    
        </div>
    )
} 