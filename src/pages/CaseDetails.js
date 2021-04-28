import NativeObject from "../components/NativeObject";


function CaseDetails ({app}) {

    return (
        <div className='pageDiv'>
        
            <div className='pageTitleDiv'>
                <span className='pageTitle'>Case Details</span>
            </div>

            {/* Assim não precisa criar uma classe e css */}
            <div style={{height: '600px'}}>
                <NativeObject app={app} qlikId={'rJFbvG'}></NativeObject>
            </div>    
        </div>

    )
}

export default CaseDetails;