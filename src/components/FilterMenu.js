import '../css/filterMenu.css';
import {useState} from 'react';
import NativeObject from './NativeObject';
import CurrentSelections from './CurrentSelections';

function FilterMenu ({app}) {
    // criação de estado: [variável, função]
    const [filterMenuOpened, setFilterMenuOpened] = useState(false);
    
    return (
        <div className='filterMenu'>
            {/* botão fora do filtro */}
            {/* propriedade de ação de um click */}
            <button onClick={() => setFilterMenuOpened(!filterMenuOpened)} className='menuButton'>
                <i className='fas fa-sliders-h'></i>
            </button>

            {/* div do menu lateral com os filtros */}
            {/* {comparação em Js: If navMenuOpened=true Then sideNavMenu open else sideNavMenu} */}
            <div className={filterMenuOpened ? 'sideFilterMenu open' : 'sideFilterMenu'}>  

                <div className='filterHeader'>
                    <span className='filterTitle'>Seleções Atuais</span>

                    <button onClick={() => setFilterMenuOpened(!filterMenuOpened)} className='menuButton'>
                        <i className='fas fa-sliders-h'></i>
                    </button>

                </div>

                {/* div com restante do conteúdo */}
                <div className='filtersDiv'>
                    <CurrentSelections app={app}></CurrentSelections>

                    {/* verifica se o app existe (já carregou) */}
                    {app ? <button className='clearAll' onClick={() => app.clearAll()}>Limpar Tudo</button> : ''} 
                    <NativeObject app={app} qlikId={'mQGMhh'} style={{height: '200px'}}></NativeObject>
                </div>

            </div>

            {/* div escura que fica por cima do mashup no mobile */}
            <div onClick={() => setFilterMenuOpened(false)} className={filterMenuOpened ? 'FilterblackScreen' : ''}>
            </div>
        </div>  
    )
}

export default FilterMenu;