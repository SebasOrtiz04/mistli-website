import Logo from "../logo/Logo.tsx";
import Container from "../utils/Container.tsx";

export default function Footer() {
  return (
    <div className='bg-blue-500/30 h-18'>
      <Container className="flex items-center justify-between h-full" >
          <Logo/>
      </Container>
    </div>
  )
}
