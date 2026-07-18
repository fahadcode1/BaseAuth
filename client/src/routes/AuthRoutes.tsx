import { Routes, Route } from "react-router-dom"
import AuthBaseLanding from "../components/home/Authbaselanding"
import { RegisterPage } from "../components/auth/RegisterPage"
import AuthLayout from "../layout/AuthLayout"
import { LoginPage } from "../components/auth/LoginPage"
import { VerifyAccountPage } from "../components/auth/VerifyAccountPage"
import { RegisterSuccessPage } from "../components/auth/RegisterSuccessPage"
import { ProtectedRoute } from "./ProtectedRoutes"
import { PublicRoute } from "./PublicRoute"
import DashboardLayout from "../layout/DashboardLayout"
import { DashboardPage } from "../components/dashboard/DashboardPage"
import { EditNamePage } from "../components/accountSettingsPage/EditNamePage"
import { ChangePassword } from "../components/accountSettingsPage/ChangePasswordForm"
import { UpdateMobileNumber } from "../components/accountSettingsPage/UpdateMobileForm"
import { UpdateEmail } from "../components/accountSettingsPage/UpdateEmailForm"

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthBaseLanding/>}/>

            <Route element={<AuthLayout />}>
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/register" element={<RegisterPage />} />
                </Route>
                <Route path="/verify-account" element={<VerifyAccountPage />} />
                <Route path="/register-success" element={<RegisterSuccessPage/>} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="account/edit-name" element={<EditNamePage />} />
                    <Route path="account/change-password" element={<ChangePassword/>} />
                    <Route path="account/edit-mobile" element={<UpdateMobileNumber/>} />
                    <Route path="account/edit-email" element={<UpdateEmail/>} />
                </Route>
            </Route>
        </Routes>
    )
}