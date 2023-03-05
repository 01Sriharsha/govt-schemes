import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { adminLogin } from '../api/adminService';
import { loginMember } from '../api/memberService';
import { TOAST_PROP } from '../App';
import MemberLogin from '../components/member/authentication/MemberLogin';

const Context = createContext();

export const CustomContext = () => useContext(Context);

export default function AuthContext({ children }) {

    const navigate = useNavigate();

    const { pathname } = useLocation();

    const [isAuthenticated, setIsAuthenticated] = useState(null);

    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!sessionStorage.getItem("user")) {
            setIsAuthenticated(false);
            setUser(null)
        } else {
            setIsAuthenticated(true);
            setUser(JSON.parse(sessionStorage.getItem("user")))
            navigate(pathname)
        }
    }, [])

    function login(userData) {
        const loginPromise = (pathname.includes("/admin/login")) ? adminLogin(userData) : loginMember(userData)
        toast.promise(loginPromise, {
            pending: "Logging in...",
            success: "Logged in successfulyy!!"
        }, TOAST_PROP).then(res => {
            sessionStorage.setItem("user", JSON.stringify(res.data?.user))
            setIsAuthenticated(true);
            setUser(JSON.parse(sessionStorage.getItem("user")))
            navigate(
                (pathname.includes("/admin/login"))
                    ? "/admin/dashboard"
                    : "/member/matching-schemes"
            )
        }).catch(err => {
            console.log(err);
            toast.error(err?.response?.data, TOAST_PROP)
        })

    }

    function logout() {
        sessionStorage.clear();
        setIsAuthenticated(false);
        setUser(null);
        toast.success("Logged out successfully!!", TOAST_PROP)
    }

    return (
        <Context.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </Context.Provider>
    )
}
