import '../css/navMenu.css';
import {useState} from 'react';
import logoMobile from '../img/Nordica.png';
import NavButton from './NavButton';

function NavMenu () {
    // criação de estado: [variável, função]
    const [navMenuOpened, setNavMenuOpened] = useState(false);

    return (
        <div className='navMenu'>
            {/* propriedade de ação de um click */}
            <button onClick={() => setNavMenuOpened(!navMenuOpened)} className='menuButton'>
                <i className='fas fa-bars'></i>
            </button>

            {/* {comparação em Js: If navMenuOpened=true Then sideNavMenu open else sideNavMenu} */}
            <div className={navMenuOpened ? 'sideNavMenu open' : 'sideNavMenu'}>     

                <div className='navMenuHeader'>

                    <img src={logoMobile} alt='Amazon' className='logoMobile'></img>
                    <span className='navTitle'>
                        Helpdesk Management
                    </span>
                </div>

                <NavButton title='Dashboard' url='dashboard' icon='fas fa-chart-line'/>
                <NavButton title='Performance' url='performance' icon='fas fa-chart-bar'/>
                <NavButton title='Case Details' url='case_details' icon='fas fa-table'/>
                <NavButton title='Support' url='support' icon='fas fa-headset'/>
            </div>
            
            <div onClick={() => setNavMenuOpened(false)} className={navMenuOpened ? 'blackScreen' : ''}>
            </div>
        </div>  
    )
}

export default NavMenu;