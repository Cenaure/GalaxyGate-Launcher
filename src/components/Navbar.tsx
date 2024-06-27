import ServerCard from "./ServerCard";
import { servers } from "../utils/servers";

interface NavbarProps {
  
}
 
const Navbar: React.FC<NavbarProps> = () => {

  return(
    <div className="navbar">
      {servers.map((server) => (
        <ServerCard name={server.name} id={server.id}/>
      ))}
    </div>
  )
}
 
export default Navbar;