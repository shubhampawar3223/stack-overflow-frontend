import React,{useState,useEffect,useRef, useContext} from 'react';
import {Link} from 'react-router-dom';
import NavElement from './NavElement';
import Sidenav from './Sidenav';
import {Context} from '../App';
import Profile from './Profile'
import './Userdash.css';
import axios from 'axios';

export default function UserDash(){
    const [option, setOption] = useState('profile');
    const [userData1,setData1] = useState([]);
     const [userProfile1,setProfile1] = useState([]);
     const [name,setName]= useState(); 
    const [tags,setTags] = useState("");
    const [pic,setPic] = useState();
    const [loading, setLoading] = useState(false);

    const profileRef = useRef();
    const editRef = useRef();
    const nameRef = useRef();
    const locationRef = useRef();
    const titleRef = useRef();
    const tagsRef = useRef();
    const aboutRef = useRef();   
    const websiteRef = useRef();
    const twitterRef = useRef();
    const gitRef = useRef();
    
    const aContext = useContext(Context);
    
    useEffect(()=>{
      if(localStorage.getItem('tags') === false){
        setOption('edit');
        editRef.current.style.backgroundColor = "#f09637" 
        profileRef.current.style.backgroundColor=""
      }
      else{
        profileRef.current.style.backgroundColor = "#f09637"  
        editRef.current.style.backgroundColor = "";
      }
    },[])

    const set=(i)=>{
        
       if(i==1){  
        setOption('profile')
        editRef.current.style.backgroundColor = ""
        profileRef.current.style.backgroundColor = "#f09637"
        
       }
       else{
       setOption('edit')
       editRef.current.style.backgroundColor = "#f09637"
        profileRef.current.style.backgroundColor = ""
       }
    }

   const submit= async(e)=>{
       e.preventDefault();
       setLoading(true);
       let tags;
       if(tagsRef.current.value===''){
        tags = '';  
       }
       else{
         tags = tagsRef.current.value.split(',');

       }
  
       let postData = {
           name:nameRef.current.value,
           location:locationRef.current.value,
           title: titleRef.current.value,
           tags: tags,
           aboutMe:aboutRef.current.value,
           website:websiteRef.current.value,
           twitter:twitterRef.current.value,
           git:gitRef.current.value
            
       }
       
       let config= {
        headers:{
            'Authorisation':localStorage.getItem('Authorisation'),
        }
    }
        let url="https://stack-overflow-new1.herokuapp.com/edit-profile/"+localStorage.getItem('userId'); 
       await axios.put(url,postData,{
           headers:{
               'Authorisation':localStorage.getItem('Authorisation')
           }
       })
       setLoading(false);
       alert("Profile Updated Successfully.")
   }
    let k="abc";
    return(
        <div >
          <NavElement/> 
           <div className="row">
               <Sidenav/>                 
             <div className="col-9 col-lg-10">
                  <div className="m-4 m-lg-5">
                 <span ref={profileRef}  className="nav2 rounded-pill p-3"  onClick={()=>set(1)} >Profile</span> 
                 <span ref={editRef} className="ml-3 nav2 rounded-pill p-3"  onClick={()=>set(0)} >Edit Profile</span>   
                 
                </div>
                {
                  option ==='profile'?
                  <Profile id={localStorage.getItem('userId')}
                    userData1={userData1} 
                    userProfile1={userProfile1}
                    setData1={setData1}
                    setProfile1={setProfile1}
                    setName={setName}
                    setTags={setTags}
                    setPic = {setPic}
                    />
                  :
                  <div>
                    <div className="row">
                          <div className="d-flex justify-content-center col-md-4 col-lg-4 ml-lg-5 ">
                                <img className="pic" src={pic}/>
                          </div>
                          <div className=" col-md-6 col-lg-5  ">
                                  <div className="form-group ">
                                      <h4 className=" form1">Display Name</h4>
                                      <input ref={nameRef} type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" />
                                      <h4 className="mt-3 form1">Location</h4>
                                      <input ref={locationRef} type="text" value={userProfile1[0].location} onChange={(e)=>{let n= userProfile1[0]; n.location= e.target.value; setData1(()=>[n])}}  className="form-control" />
                                      <h4 className="mt-3 form1">Title</h4>
                                      <input ref={titleRef} type="text" value={userProfile1[0].title} onChange={(e)=>{let n= userProfile1[0]; n.title= e.target.value; setData1(()=>[n])}} className="form-control" />
                                      <h4 className="mt-3 form1">Tags</h4>
                                      <span className="text-primary">Enter tags in comma seperated format.eg. c,java,python..</span>
                                      <input ref={tagsRef} type="text" value={tags} onChange={(e)=>{setTags(e.target.value)}} className="form-control" placeholder="eg. C,C++,JAVA" required/>
                                  </div>    
                          </div>
                    </div>
                    <div className="ml-5">
                    <h4 className="mt-4 form1">About me</h4>
                       <textarea ref={aboutRef} className="form-control" onChange={(e)=>{let n= userProfile1[0]; n.aboutMe= e.target.value; setProfile1(()=>[n])}} value={userProfile1[0].aboutMe} rows="10"/>
                    </div>
                    <div className="ml-5 ">                        
                    <h4 className="mt-4 form1">Web Presence</h4>
                    <div className="row mt-3">
                      <div className="col-4 mt-2">
                      <h4 className=" form1">Website Link</h4>
                     <input ref={websiteRef} type="text" value={userProfile1[0].website} onChange={(e)=>{let n= userProfile1[0]; n.website= e.target.value; setProfile1(()=>[n])}} className="form-control" />           
                      </div>
                      <div className="col-4">
                      <h4 className="mt-3 form1">Twitter Link Or Username</h4>
                     <input ref={twitterRef} type="text" value={userProfile1[0].twitter} onChange={(e)=>{let n= userProfile1[0]; n.twitter= e.target.value; setProfile1(()=>[n])}} className="form-control" />       
                      </div>
                      <div className="col-4">
                      <h4 className="mt-3 form1">Github Link Or Username</h4> 
                     <input ref={gitRef} type="text" value={userProfile1[0].git} onChange={(e)=>{let n= userProfile1[0]; n.git= e.target.value; setProfile1(()=>[n])}} className="form-control" />   
                     </div>
                      </div>
                    </div>
                    <div className="ml-5 mt-3">  
                    <button onClick={submit} className="btn btn-primary btn-lg ">Submit</button>
                    {
                        loading ? 
                        <span>
                        <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
                        <span class="sr-only">Loading...</span>
                        </span>
                        :null
                    }
                    </div>  
                  </div>
                } 

  
              </div>
           </div>
            
        </div>
    )
} 