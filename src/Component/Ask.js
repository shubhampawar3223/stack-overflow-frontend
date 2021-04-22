import React,{useState,useRef,useContext} from 'react';
import {Link} from 'react-router-dom';
import NavElement from './NavElement'
import axios from 'axios';
import {Context} from '../App';

export default function Ask(){
    const titleRef = useRef();
    const bodyRef = useRef();
    const tagsRef = useRef();
    const [loading,setLoading] = useState(false);
    const aContext = useContext(Context);

    const sendQue = async(e)=>{
      e.preventDefault();
      setLoading(true);
      let title = titleRef.current.value;
      let body = bodyRef.current.value;
      let tags = tagsRef.current.value;     
      if(title.length ===0 || body.length ===0 || tags.length ===0 ){
        setLoading(false); 
        alert("Please Enter All The Fields");
      }
      else if(title.length < 10 ){
        setLoading(false);  
        alert("Title Should have more than 10 words.");  
      }
      else if(title.length < 20){
        setLoading(false);  
        alert("Body Should have more than 20 words.");  
      }
      else{
        tags = tags.split(',');  
        let max= 1000000;
          let min = 0;
          let id =  Math.floor(Math.random()* (max-min)+min)
          let postData= {
              queId:id,
              userId:+localStorage.getItem('userId'),            
              title:title,
              body:body,
              tags:tags,
              votes:0,
              answerCount:0
          }
          let url="https://stack-overflow-new1.herokuapp.com/post-que"
          let config={
              headers:{
                 "Authorisation":localStorage.getItem('Authorisation')                 
              }
          }
          await axios.post(url,postData,config);
          setLoading(false); 
          alert("Question Is Posted Successfully");          
          
      }
}
     return(
    <div className="" >
        <NavElement/>
      <div className="container-fluid" style={{ backgroundColor:"#ededed"}}>  
         <div className=" p-md-5 p-lg-5" >
            <p className="h1">Ask a public question</p> 
         </div>
         <div className="row">
             <div className="col-lg-9">
                 <div className=" ml-5 mr-5  border rounded bg-light" >
                      <div className="p-4 form-group">
                          <h4 style={{fontWight:"bold"}}>Title</h4>
                          <h5>Be specific and imagine you’re asking a question to another person</h5>
                          <input ref={titleRef} type="text" className="form-control" placeholder="Enter title of a question."/>
                          
                          <h4 className="mt-4" style={{fontWight:"bold"}} >Body</h4>
                          <h5>Include all the information someone would need to answer your question</h5>
                          <textarea ref={bodyRef} className="form-control" rows="15"/>

                          <h4 className="mt-4" style={{fontWight:"bold"}} >Tags</h4>
                          <h5>Add up to 5 tags to describe what your question is about</h5>
                         <input ref={tagsRef} type="text" className="form-control p-3" placeholder="eg. python,javascript,Go"/>
                      </div>
                 </div>
                 <div className="m-5">
                          <button onClick={sendQue} className="btn btn-primary btn-lg">Submit</button>
                          {
                           loading===true?
                           <span><i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
                           <span class="sr-only">Loading...</span></span>
                           :null  
                          }
                      </div>
             </div>
             <div className="col-lg-3"></div>  
         </div>
       </div>
    </div>
     )
}