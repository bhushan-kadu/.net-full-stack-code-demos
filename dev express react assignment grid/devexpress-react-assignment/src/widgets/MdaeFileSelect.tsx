import React from 'react';
import { FileUploader } from 'devextreme-react/file-uploader';
interface IMdaeFileSelect {
    name: string,
    onValueChanged: () => void,
    onInitialized?: (e) => void
}
export const MdaeFileSelect: React.FC<IMdaeFileSelect> = (props) => {
    return (<FileUploader
        name={props.name}
        className="mdeTextBox"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        {...props}
    />)
}