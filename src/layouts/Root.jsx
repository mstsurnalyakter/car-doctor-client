import { Outlet } from "react-router-dom"
import NavBar from "../pages/shared/NavBar/NavBar"
import Footer from "../pages/shared/Footer/Footer"



const Root = () => {
  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Root