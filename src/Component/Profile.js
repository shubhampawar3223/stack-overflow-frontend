import React,{useState,useEffect,useRef} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function Profile(props){
    const [userData,setData] = useState([]);
    const [userProfile,setProfile] = useState([]);
    const [queData,setQuedata] = useState([]);

    useEffect(async ()=>{
    
      let id=props.id;
      let url = 'https://stack-overflow-new1.herokuapp.com/users/'+id;
      let resp =await axios.get(url);
      setData(()=>[...resp.data.data1]);
      setProfile(()=>[...resp.data.data2]);
      setQuedata(()=>[...resp.data.data3]);
      if(props.setData1 !== undefined){
      props.setData1(()=>[...resp.data.data1]);
      props.setProfile1(()=>[...resp.data.data2]);
      props.setName(resp.data.data1[0].name);
      props.setTags(resp.data.data1[0].tags.join(","));
      props.setPic(resp.data.data1[0].profilePic);      
      }
      
    },[])
    

    return(
        
          <div>  
             { 
            (userData.length && userProfile.length) ?   
            <>  
                 
                 <div >
                 <div className="row">    
                 <img className="img-thumbnail" width="300px" height="259px" src={userData[0].profilePic}/>
                 <div className=" col-sm-10 col-lg-6" style={{}}>
                 <h1  style={{fontWeight:"bolder"}}>{userData[0].name}</h1>
                 <h4 className="mt-4" >{userProfile[0].title}</h4>
                 <h4 className="mt-4" >{userProfile[0].aboutMe}</h4>
                 </div>

                 <div className="col-sm-2 col-lg-3 " style={{position:"abosolute", right:"0px"}}>
                 <div className="row">
                 <div className= " col-sm-12 col-lg-6 ">
                 <h3 className="text-center" style={{fontWeight:"bold"}}>{userProfile[0].ansCount}</h3>
                 <h4 className="text-center" >Answers</h4>
                 </div>

                 <div className="col-sm-12 col-lg-6 ">
                 <h3 style={{fontWeight:"bold"}} className="text-center">{userProfile[0].queCount}</h3>
                 <h4 className="text-center">Questions</h4> 
                 </div>  
                 </div>  
                 <div  className="mt-4">
                  {userProfile[0].location !==''  && <h4 className="text-center right"><i className="fa fa-map-marker" aria-hidden="true"></i>{userProfile[0].location}</h4>}   
                  {userData[0].website !=="" && <h4 className="text-center right"><i className="fa fa-link" aria-hidden="true"></i>{userData[0].website}</h4> }
                  {userData[0].twitter!=='' && <h4 className="text-center right"> <i class="fa fa-twitter" aria-hidden="true"></i>{userData[0].twitter}</h4> }
                  {userData[0].git!=='' && <h4 className="text-center right"> <i class="fa fa-github" aria-hidden="true"></i>{userData[0].git}</h4> }   
                 </div>
                 </div>
                 </div>

                 <div className="mt-4">
                   <h4 style={{fontWeight:"bold"}}>Tags:</h4>
                   {
                       
                      userData[0].tags.map((e)=>{
                        return(
                        <button className="btn btn-primary ml-2">{e}</button>
                        )
                      }) 
                   }
                 <div className="mt-4">
                 <h4 style={{fontWeight:"bold"}}>Top Questions:</h4>
                 <div className="col-5 mt-3" style={{height:"40vh", overflow:"auto"}}>
                     {
                        queData.length ? 
                            queData.map((e)=>{
                              return(  
                              <div className=" p-2 border-top border-bottom" style={{}}>
                              <h4><a href={"/questions/"+e.queId}><i class="fa fa-question-circle" aria-hidden="true"></i> {e.title}</a></h4>
                              </div>  
                              )  
                         })
                        :<p>No question is posted.</p>
                     }
                 </div>   
                 </div>

                 </div>
                 </div>  
                 
                  </> 
                 :
                 <div className="d-flex justify-content-center"><i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
                 <span class="sr-only">Loading...</span></div>
                } 
        </div>  
    )
}