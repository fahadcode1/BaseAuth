import { Routes, Route } from "react-router-dom"
import AuthBaseLanding from "../components/Authbaselanding"
import AuthLayout from "../layout/AuthLayout"
import { LoginPage } from "../pages/loginPage"

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthBaseLanding/>}/>

            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage/>}/>
            </Route>
        </Routes>
    )
}