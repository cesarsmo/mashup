// Altera URL e navega para a página
import {NavLink} from 'react-router-dom'; 
import '../css/navButton.css';

// Definição de um componente
function NavButton({icon, title, url}) {

    return(
    <NavLink to={url} className="navButton" activeClassName="active">
        <i className={icon}></i>
        <span>  
            {title}
        </span>
    </NavLink>
    )
}

export default NavButton;

