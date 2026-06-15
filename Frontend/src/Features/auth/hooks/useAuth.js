import { useContext } from 'react'
import { AuthContext } from '../auth.context.jsx'
import { login, register, logout } from '../services/auth.api.js'

export const useAuth = () => {
    const { user, setUser, loading, setLoading } = useContext(AuthContext)

    const handlelogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login(email, password)
            setUser(data.user)
            console.log('%c Login Success ✅', 'color: green; font-weight: bold;', data)
        } catch (error) {
            console.error('%c Login Failed ❌', 'color: red; font-weight: bold;', error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register(username, email, password)
            setUser(data.user)
            console.log('%c Register Success ✅', 'color: green; font-weight: bold;', data)
        } catch (error) {
            console.error('%c Register Failed ❌', 'color: red; font-weight: bold;', error)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            setUser(null)
            console.log('%c Logout Success ✅', 'color: green; font-weight: bold;')
        } catch (error) {
            console.error('%c Logout Failed ❌', 'color: red; font-weight: bold;', error)
        } finally {
            setLoading(false)
        }
    }

    return { user, loading, handlelogin, handleRegister, handleLogout }
}
