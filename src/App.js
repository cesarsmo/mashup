//Importação do CSS
import './App.css';

// Engine do Qlik
import engine from './QlikEngine'

// Páginas desenvolvidas
import Dashboard from './pages/Dashboard';
import CaseDetails from './pages/CaseDetails';

//importação dos nossos componentes utilizados
import Header from './components/Header';

//Importando funções do react
import {useEffect, useState} from 'react';

//importação do React-Router-Dom, utilizado para fazer a navegação
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

function App() {
    const [app, setApp] = useState();

    //Tudo que estiver dentro desse useEffect irá rodar assim que o componente for montado
    useEffect(() => {
        //Config para passar como parâmetro para a conexão inicial com o qlik e também para abrir o QVF
        let config = {
            host: 'grupoitg-nordica.us.qlikcloud.com',
            prefix: '/',
            port: 443,
            isSecure: true,
            webIntegrationId: 'zQLeIH8-uf87QC9JyLRsdrdZpvhVlkli'
        }

        // let config = {
        //     host: 'qspoc.nordica.net.br',
        //      prefix: '/',
        //      port: 443,
        //      isSecure: true
        // }        

        //Função para usar caso for conectar no Qlik Enterprise
        // engine.connectQSE(config).then(qlik =>{
        //QSE
        // let tempApp = qlik.openApp('4aef20d3-a3a7-4e93-9e65-70f11b624521', config) 

        //Conexão com o qlik cloud
        engine.connectQCS(config).then(qlik =>{
            //Recebida a conexão com qlik, é aberto o qvf (app) logo após com o qlik.openApp
            //QSC
            let tempApp = qlik.openApp('999759c8-696c-4009-9546-0e658a9c6fdc', config)

            //Salvando nosso app no state para passar pros demais componentes por props com app={app}
            setApp(tempApp);
        })
    }, [])


    return (
        <div className="App">
            {/* HashRouter coloca todos os componentes dentro do âmbito do router, permitindo ter acesso a página atual */}
            <HashRouter>
                {/* Header fica fora do switch pois sempre é renderizado independente da url */}
                <Header app={app}>
                </Header>

                {/* Switch faz a checagem da url atual e renderiza a página correspondente */}
                <Switch>
                    <Route path="/dashboard" exact render={() => (<Dashboard app={app}></Dashboard>)} />
                    <Route path="/case_details" exact render={() => (<CaseDetails app={app}></CaseDetails>)} />
                    <Route exact path="/">
                        <Redirect to="/dashboard" />
                    </Route>
                </Switch>
                
            </HashRouter>
        </div>
    );
}

export default App;
