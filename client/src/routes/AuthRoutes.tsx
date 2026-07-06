import { Routes, Route } from "react-router-dom"
import AuthBaseLanding from "../components/home/Authbaselanding"
import { RegisterPage } from "../components/auth/RegisterPage"
import AuthLayout from "../layout/AuthLayout"
import { LoginPage } from "../pages/loginPage"
import { VerifyAccountPage } from "../components/auth/VerifyAccountPage"

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthBaseLanding/>}/>

            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-account" element={<VerifyAccountPage />} />
            </Route>
        </Routes>
    )
}