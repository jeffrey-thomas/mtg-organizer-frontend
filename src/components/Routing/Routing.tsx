import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Firebase } from "../../firebase/Firebase";
import { About } from "../About";
import { Unauthorized } from "../Authorization/Unauthorized";
import { Dashboard } from "../Dashboard";
import { ErrorPage } from "../ErrorPage";
import { Home } from "../Home";
import { Layout } from "../Layout";

export const Routing = ()=>{
  const authorized = Firebase.useAuth()

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>} errorElement={<ErrorPage/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route 
            path='/dashboard' 
            element={
              authorized ? <Dashboard/> : <Unauthorized/>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}