
import {useEffect, useRef} from 'react';

import '../css/nativeObject.css';

import Loader from '../components/Loader';

// função que busca objetos nativos

// className: se tiver um css que altera o objeto do qlik
// style: define um estilo ao objeto
function NativeObject ({app, qlikId, className, style}) {
    // const [isLoading, setIsLoading] = useState(true)

    // variável constante que sempre será useRef():
    const ref = useRef();

    useEffect(() => {
        //checagem se o app existe. Se sim entra na API, busca o qlikId, a resposta 'vis' será apresentada na ref
        if (app) {
            app.visualization.get(qlikId).then((vis) => {
                vis.show(ref.current)
            })
        }
    },[app, qlikId])

    // necessário passar tamanho da div, senão por padrão é zero e não aparece
    return (
        <div ref={ref} className={className} style={style || {width: '100%', height: '100%'}}>
        <Loader></Loader>
        </div>
    )
}

export default NativeObject;