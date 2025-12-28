import LoginView from '../../sections/auth/LoginView.tsx'
import { Title } from 'react-head';

export default function LoginPage() {
  return (
    <>
        <Title>
            <title>Iniciar sesión</title>
        </Title>

        <LoginView/> 
    </>
  )
}
