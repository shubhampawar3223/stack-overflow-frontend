import React,{useEffect,useState,useRef} from 'react';
import Sidenav from './Sidenav';
import NavElement from './NavElement'
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import immer from 'immer';

export default function Question(props){
    const [que,setQue] =useState('');
    const [resp,setResp] = useState([]);
    const [queVote, setVote] = useState();
    const [queTags,setTags] = useState([]);
    const [loading, setLoading] = useState(false);    
    const waraningRef1 = useRef();
    const waraningRef2 = useRef();

    const
     inputRef = useRef();
    
    const upRef = useRef()
    const downRef = useRef()
    const upRef1 = useRef()
    const downRef1 = useRef()

    useEffect(async()=>{
        setLoading(true);
        let id =props.match.params.id;
        const url="https://stack-overflow-new1.herokuapp.com/que/"+id;
        let response = await axios.get(url);         
        setQue(response.data.data1)
        setVote(response.data.data1.votes);
        setTags(()=>[...response.data.data1.tags])
        setResp(()=>[...response.data.data2])
        setLoading(false);
    },[])
 
    //function to submit response
    const submit= async(e)=>{
       e.preventDefault();
       if(inputRef.current.value.length < 15){
        waraningRef2.current.style.display="inline";
       }
       else if((localStorage.getItem('Authorisation')=== null) || (localStorage.getItem('Authorisation')=== undefined)){
        waraningRef1.current.style.display="inline";     
       }
       else{
        let max = 1000000;
        let min =0;   
         let id= Math.floor(Math.random() * (max - min) + min);
           let url="https://stack-overflow-new1.herokuapp.com/que-response";
           const postData={
               responseId: id,
               queId:que.queId,
               userId:+localStorage.getItem('userId'),
               body:inputRef.current.value,
               votes:0,
               comments:[] 
           }
           inputRef.current.value="";
            setResp((r)=>[...r,postData])
            let config= {
                headers:{
                    'Authorisation':localStorage.getItem('Authorisation'),
                }
            }
        let resp = await axios.post(url,   
            postData, config);
       }
       
       
    }
    
    //function to cast vote to question
    const changeQueVotes = async(i)=>{
        let k;
       if((localStorage.getItem('Authorisation')=== null) || (localStorage.getItem('Authorisation')=== undefined)){          
        alert("Please Login");
       }
       else{
       if(i===1){
       upRef.current.style.backgroundColor = "#f0c03c";    
       k= queVote+1
       setVote(k);
       setTimeout(()=>{upRef.current.style.backgroundColor="" },300);
       }
       else{
        downRef.current.style.backgroundColor = "#f0c03c";    
       k=queVote-1;
        setVote(k);
       setTimeout(()=>{downRef.current.style.backgroundColor="" },300); 
       }   
       let config= {
        headers:{
            'Authorisation':localStorage.getItem('Authorisation'),
        }
    }    
       let url='https://stack-overflow-new1.herokuapp.com/update-que-votes/'+ que.queId;
       await axios.put(url,{
           votes:k
       },config)
    }
    }
  
 //function  to cast vote to an answer.   
    const responseVote = async(e,i,j)=>{    
            let k;
           if((localStorage.getItem('Authorisation')=== null) || (localStorage.getItem('Authorisation')=== undefined)){          
            alert("Please login to submit your vote.");
           }
           else{
           if(j===1){
               
           k= e.votes + 1
           setResp(resp =>{
             const newResp = immer(resp, draft=>{
                 draft[i].votes= k
             })
             return newResp;
           })
           }
           else{    
            k= e.votes - 1
           setResp(resp =>{
             const newResp = immer(resp, draft=>{
                 draft[i].votes= k
             })
             return newResp;
           })
            }   
           let config= {
            headers:{
                'Authorisation':localStorage.getItem('Authorisation'),
            }
        }    
           let url='https://stack-overflow-new1.herokuapp.com/update-resp-votes/'+ e.responseId;
           await axios.put(url,{
               votes:k
           },config)
        }
      
    }


    return(
       <div className="container-fluid">
           <NavElement/>
         <div className="row">  
          <Sidenav/>
          <div className="col-7 col-lg-10">
          { 
           loading===false ?       
            <div>    
                <div style={{borderBottom:"1px solid #b4b6b8"}}>  
                 <div className=" ml-lg-3 mt-lg-5 d-flex justify-content-between">  
                <div> 
               <h1 className="" style={{display:"inline"}}>{que.title}</h1>
               </div> 
                 <div> 
               <a href='/ask-question'><button className="btn btn-primary  btn-lg mb-3">Ask Question</button></a>
               </div>
                 </div>
                </div>
                <div className="col-8  mt-2 mt-lg-4">
                <div className="row">
                    <div className="col-3 col-lg-2 text-center">
                        <p><span><i ref={upRef} onClick={()=>changeQueVotes(1)} class="bi bi-caret-up fa-2x"></i></span></p>
                        <p>{queVote}</p>
                        <p><span><i ref={downRef} onClick={()=>changeQueVotes(0)} class="bi bi-caret-down fa-2x"></i></span></p>
                    </div>
                    <div className="col-9 lg-10">
                       <h4> {que.body}</h4> 
                       <div>
                       {
                          
                         queTags.map((e)=>{
                             return(
                              <button className="btn btn-primary">{e}</button>   
                             )
                         })
                        
                       }
                       </div>
                       </div>
                </div>
                </div>
                <div className="col-8  mt-2 mt-lg-4">
                <div className="mt-5" style={{borderBottom:"1px solid #dee1e3"}}>
                     <h3 className="ml-lg-3">{resp.length} Answers</h3>
                     {
                      resp.map((e,i)=>{
                       return(   
                        <div key={i} className="mt-3">
                            <div className="row">
                                <div className="col-2 text-center">
                                <p><span><i ref={upRef1} onClick={()=>responseVote(e,i,1)} class="bi bi-caret-up fa-2x"></i></span></p>
                                <p>{e.votes}</p>
                                <p><span><i ref={downRef1} onClick={()=>responseVote(e,i,0)} class="bi bi-caret-down fa-2x"></i></span></p>
                                </div>
                                <div className="col-10">
                                    <h4>{e.body}</h4>    
                                </div>
                            </div> 
                        </div>
                       )
                      })   
                     
                     }
                </div> 
                </div>      
                <div  className="col-8  mt-2 mt-lg-4">
                   <h3>Your Answer</h3>
                   <p ref={waraningRef1} style={{display:"none"}} className="text-danger">Please Login To Submit Response.</p>
                   <p ref={waraningRef2} style={{display:"none"}} className="text-danger" >Answer should be grater than 15 words.</p>
                   <textarea ref={inputRef} class="form-control" placeholder="Type Your Answer Here..." rows="8"></textarea> 
                   <div className="mt-3">
                       <button className="btn btn-primary" onClick={submit}>Submit</button>
                   </div>
                </div>    
            </div>    
            :
            <div className="d-flex justify-content-center"><i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
            <span class="sr-only">Loading...</span>
            </div>    
           }
          </div>
          </div >
       </div>
    )    
}