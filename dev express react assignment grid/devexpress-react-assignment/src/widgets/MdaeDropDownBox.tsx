import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { SelectBox } from 'devextreme-react/select-box';

const MdaeDropDownBox = (props, ref) => {
    const state = useRef(null);
    useImperativeHandle(ref, () => ({
        dataSource: (dataSourceValue) => {
            state.current.instance.option('dataSource', dataSourceValue);
        }
    }));
    return (<SelectBox
        ref={state}
        className="mdaeDropDownBox"
        value={props.value}
        name={props.name}
        dataSource={props.dataSource}
        onValueChanged={props.onValueChanged}
        {...props}
    />)
}
export default forwardRef(MdaeDropDownBox)