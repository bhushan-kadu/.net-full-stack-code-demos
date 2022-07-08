import * as React from 'react';
export interface IMdaeLoaderProps {
    isLoading: boolean
}

const MdaeLoader: React.FC<IMdaeLoaderProps> = (props) => {

    if (props.isLoading) {
        return (<div className="Loading-panel">
            <img src="loading.gif" className="Loading" />
        </div>)
    } else {
        return <React.Fragment />
    }

}

export default MdaeLoader;