import Logo from "../logo/Logo.tsx";
import Container from "../utils/Container.tsx";
import Nabvar from "./Navbar.tsx";
import UserMenu from "./UserMenu.tsx";
export default function Header() {
  return (
    <div className=' fixed top-0 left-0 right-0 shadow-md z-50 bg-blue-500/30 h-18'>
      <Container className="flex items-center justify-between h-full" >
          <Logo/>
          <Nabvar/>
          <UserMenu/>
      </Container>
    </div>
  )
}
