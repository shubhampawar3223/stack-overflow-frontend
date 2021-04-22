import React,{useState} from 'react';
import {BrowserRouter as Router, Route, Link, Switch,Redirect} from 'react-router-dom';
import './App.css';
import Home from './Component/Home'
import About from './Component/About'
import UserDash from './Component/UserDash'
import Login from './Component/Login'
import Signup from './Component/Signup'
import Questions from './Component/Questions'
import Users from './Component/Users'
import User from './Component/User'
import Question from './Component/Question'
import Ask from './Component/Ask'
import Tags from './Component/Tags';


export const Context =  React.createContext();

const WrapperRoute =({render,...restProps}) =>{
    return(
      <Route
      {...restProps}
      render={
        (props)=>{
          if(localStorage.getItem("Authoristion") !== null){
            return <Redirect to={`/user-dashboard`}/>
          }
          else{
             return render(props);   
          }
        }
      }
      />
    )
}

const ProtectedRoute = ({component:Component, ...restProps})=>{
  return(
    <Route
    {...restProps}
    render={
      (props)=>{
          if(localStorage.getItem("Authorisation") === null){
            return <Redirect to={`/login`}/>
          }
          else{
            return(
              <>
                 <Component {...props}/>
              </>
            )  
          }
      }
    }
    />
  )
}

function App() {
    const [email,setEmail] = useState();
    const [login,setLogin] = useState(false);
    const [userId, setId]  = useState();

  return (
     <Context.Provider
     value={{
       email:email,
       login:login,
       userId:userId,
       setEmail:setEmail,
       setLogin:setLogin,
       setId:setId
     }}
     >
      <Router>
        <Switch>
           <Route exact path='/' component={Home}/>
           <Route exact path='/about' component={About}/>
           <Route exact path='/questions' component={Questions}/>
           <Route exact path='/users' component={Users}/>
           <Route exact path='/users/:id' component={User}/>
           <Route exact path='/signup' component={Signup}/>
           <Route exact path='/tags' component={Tags}/>
           <Route exact path='/questions/:id' component={Question}/>
           <WrapperRoute 
           path='/login' 
           render={(props) => <Login {...props}/>}/>
           <ProtectedRoute exact path='/user-dashboard' component={UserDash}/>
           <ProtectedRoute exact path='/ask-question' component={Ask}/>

        </Switch>
      </Router> 
      </Context.Provider>            
  );
}

export default App;
