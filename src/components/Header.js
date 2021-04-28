import '../css/header.css'; /* '..' volta duas pastas */
import logo from '../img/QS_Capa_Nordica2.png';
import NavButton from './NavButton';
import NavMenu from './NavMenu';
import FilterMenu from './FilterMenu';

function Header({app}) {

    // Não é possível criar duas divs com React.js. Somente div dentro de div;
    return (
    <div className='header'>
        
        {/* Parte escura: definida em header.css */}
        <div className='titleWrapper'>
            <NavMenu></NavMenu>
            
            {/* span é o mais fácil de customizar um texto simples */}
            <span className='mashupTitle'>
                Helpdesk Management
            </span>

            <img src={logo} alt='nórdica' className='logo'></img>
            {/* ou <img src={logo} alt='logo da amazon' className='logo'/> */}
            {/* {logo}: referencia uma variável de js; alt: hover do mouse */}

            {/* <button className='menuButton'>
                <i className='fas fa-sliders-h'></i>
            </button> */}
            <FilterMenu app={app}></FilterMenu>
        </div>

        {/* Parte clara: definida em header.css */} 
        <div className='navWrapper'>    
            <div className='buttonsDiv'>
                <NavButton title='Dashboard' url='dashboard' icon='fas fa-chart-line'/>
                <NavButton title='Performance' url='performance' icon='fas fa-chart-bar'/>
                <NavButton title='Case Details' url='case_details' icon='fas fa-table'/>
                <NavButton title='Support' url='support' icon='fas fa-headset'/>
            </div>
        </div>
    </div>)
}

export default Header;