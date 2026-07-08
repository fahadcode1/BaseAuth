import { Routes, Route } from "react-router-dom"
import AuthBaseLanding from "../components/home/Authbaselanding"
import { RegisterPage } from "../components/auth/RegisterPage"
import AuthLayout from "../layout/AuthLayout"
import { LoginPage } from "../components/auth/LoginPage"
import { VerifyAccountPage } from "../components/auth/VerifyAccountPage"
import { RegisterSuccessPage } from "../components/auth/RegisterSuccessPage"
import { ProtectedRoute } from "./ProtectedRoutes"
import DashboardLayout from "../layout/DashboardLayout"
import { DashboardPage } from "../components/dashboard/DashboardPage"

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthBaseLanding/>}/>

            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-account" element={<VerifyAccountPage />} />
                <Route path="/register-success" element={<RegisterSuccessPage/>} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardPage />} />
                </Route>
            </Route>
        </Routes>
    )
}