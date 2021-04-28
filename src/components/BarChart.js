import {useEffect, useRef, useState} from 'react';
import ReactEcharts from 'echarts-for-react';

import Loader from '../components/Loader';

function BarChart({app, id}) {

    // Criação de estado useState. Armazena o option do echart para depois mandar para react e echarts
    const [option, setOption] = useState();

    // Criação de referência useRef para armazenar o ID do novo Hypercube
    const cubeId = useRef(null);

    //useEffect: definir conexão com Qlik e extração de dados
    useEffect (() => {
        // if: verificação da existência do app
        if(app) {
            // conecta com a visualization API e pega o model do objeto (id), chamado de VisualizationModel
            app.visualization.get(id).then((visualizationModel) => {
                // usa função do model para buscar propriedades do objeto
                visualizationModel.model.getProperties().then((res) => {

                    const data = res;

                    // busca na resposta o parâmetro title do objeto e salva na variável
                    const title = data.title;

                    // hypercube já tem como segundo parâmetro um callback. Então
                    // não precisa do '.then'
                    // hypercubo é preciso para buscar os apenas os valores do objetos, sem estilo
                    app.createCube(data.qHyperCubeDef, (hcData) => {
                        // console.log(hcData);
                        // .current: atualiza o valor atual da variável cubeId para = ...
                        cubeId.current = hcData.qInfo.qId;

                        // definição dos Arrays a serem preenchidos
                        let category = [];
                        let values = [];

                        // usar o copy property path do Google Chrome
                        // for each: definição da ação para cada chamado 'item'
                        hcData.qHyperCube.qDataPages[0].qMatrix.forEach(item => {
                            // push: salva na Array um elemento
                            category.push(item[0].qText);
                            values.push(item[1].qText);
                        })

                        // console.log("categoria:",category);
                        // console.log("valores:",values);

                        // salvo em 'option' conforme modelo do echarts
                        let temp_Option = {
                            xAxis: {
                                type: 'value'
                            },
                            yAxis: {

                                type: 'category',
                                data: category                                
                            },
                            series: [{
                                data: values,
                                type: 'bar'
                            }],
                            title: {
                                show: true,
                                text: title
                            },
                            textStyle: {
                                fontfamily: 'Roboto'
                            }
                        };

                        // console.log(temp_Option);
                        setOption(temp_Option);
                    })
                })
            })
        }

        // desconecta a conexão com o qlik para evitar perdas de performance
        return () => {
            if (cubeId.current) {
                app.destroySessionObject(cubeId.current);
            }

        }

    },[app])


    return option ? <ReactEcharts option={option}></ReactEcharts> : <Loader></Loader>
}

export default BarChart;