import { Helmet } from 'react-helmet-async'
import LoginView from '../../sections/auth/LoginView.tsx'

export default function LoginPage() {
  return (
    <>
        <Helmet>
            <title>Iniciar sesión</title>
        </Helmet>

        <LoginView/> 
    </>
  )
}
