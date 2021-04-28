// funções do React

// useState: receber a lista
// useEffect: 
// useCallback: recebe as seleções
// useRef: salvar ID da lista para depois destruir objeto
import {useState, useEffect, useCallback, useRef} from 'react';

// Outros
import '../css/currentSelections.css'

function CurrentSelections ({app}) {

    // declaração de um array vazio para as seleções
    const [selections, setSelections] = useState([]);
    // variável para armazenar o Id para destruição
    const objId = useRef(null);

    // para pegar a lista de seleção do Qlik
    // assíncrona: retorno não é instantâneo, o código chama e continua a executar. 
    const loadCurrentSelections = useCallback(async() => {
        if (app) {
            // esperar receber a lista do app do qlik e a resposta é res
            await app.getList('CurrentSelections', (res) => {
                // console.log(res)
                // Array dentro do Array
                setSelections([...res.qSelectionObject.qSelections])
                objId.current = res.qInfo.qId;

            } )
        }

    },[app])

    // primeiro o useEffect vê se houve mudanças no app
    useEffect(() => {
        if(app) {
            loadCurrentSelections()
        }    

        return () => {
            if(app) {
                app.destroySessionObject(objId.current)
            }
        }

    },[app]) 

    return (
        // caixa das seleções do usuário
        <div className='currentSelections'> 

            {/* checagem se existe seleções feitas */}
            {selections.length > 0 ? 
            // semelhante à for each, map retorna no mesmo local da chamada
            selections.map((item) => (
                // se sim:
                <div className='selection'>
                    {/* título do campo selecionado */}
                    {/* título é o item no local de qField */}
                    <span className='selectionTitle'>
                        {/* Ajuste de nome com expressão */}
                        {item.qField == '=Dual(Year([Date]),YearStart([Date]))' ? 'Ano' : item.qField}
                        {/* ou */}
                        {/* {item.qReadableName} */}
                    </span>

                    {/* div com as seleções dos campos */}
                    <div className='selected'>
                        <span>
                            {item.qSelected}
                            {/* ao clicar chama a API field para o app */}
                            <button onClick={() => app.field(item.qField).clear()} className='menuButton'>
                                <i className='fas fa-times'></i>
                            </button>
                        </span>
                    </div>
                </div>
            ))

            : //senão:                
            <span className='noSelection'>Nenhuma Seleção Atual</span>
            }
        </div>
    )    
}

export default CurrentSelections;