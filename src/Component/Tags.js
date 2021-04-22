import React,{useState,useEffect} from 'react';
import Sidenav from './Sidenav'
import NavElement from './NavElement'
import axios from 'axios'

export default function Tags(){
   const [tags,setTags] = useState([]);
   const [loading,setLoading] = useState(false);

   useEffect(async()=>{
       setLoading(true);
    let resp = await axios.get('https://stack-overflow-new1.herokuapp.com/tags');
    setTags(()=>[...resp.data.data]);
    setLoading(false);           
   },[])

    return(
        <div>
           <NavElement/>
           <div className="row">
               <Sidenav/>
                <div className="col-10" >
                   <div className="m-5"> 
                   <h2 style={{fontWeight:"bold"}}>Tags</h2>
                   <h4>A tag is a keyword or label that categorizes your question with other, similar questions. 
                       Using the right tags makes it easier for others to find and answer your question.</h4>
                    
                    <div className="row" >
                        {
                           loading===false? 
                           tags.map((e)=>{
                               return(
                                 <div className='col-4 p-2 '>
                                    <div className="p-3 border rounded">
                                   <button className="btn btn-primary"><h4>{e.tag}</h4> </button> 
                                   <div className=" mt-3" style={{height:"7vh",display:"block", overflow:"hidden"}}>
                                      <h5>{e.info}</h5> 
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