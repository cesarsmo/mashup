import '../css/dashboard.css';


import NativeObject from '../components/NativeObject';
import BarChart from '../components/BarChart';

function Dashboard ({app}) {
    return (
    <div className='pageDiv'>
        
        <div className='pageTitleDiv'>
            <span className='pageTitle'>Dashboard</span>
        </div>

        <div className='kpisDiv'>
            <NativeObject app={app} qlikId={'jTuCwkB'} className={'kpiBig'} style={{height: '105px', width: '100%'}}></NativeObject>
            <NativeObject app={app} qlikId={'JARjh'} style={{height: '105px', width: '100%'}}></NativeObject>
            <NativeObject app={app} qlikId={'JsVPe'} style={{height: '105px', width: '100%'}}></NativeObject>
        </div>

        <div className='chartsDiv'>
            {/* style + flex, 2/5 ou 3/5 dá a proporção do objeto na div */}
            <NativeObject app={app} qlikId={'hRZaKk'} style={{flex: 3, height: '344px', width: '100%'}}></NativeObject>
            <NativeObject app={app} qlikId={'a5e0f12c-38f5-4da9-8f3f-0e4566b28398'} style={{flex: 2, height: '344px', width: '100%'}}></NativeObject>
        </div>    
        
        <BarChart id={'a5e0f12c-38f5-4da9-8f3f-0e4566b28398'} app={app}></BarChart>

    </div>)
    
}

export default Dashboard;