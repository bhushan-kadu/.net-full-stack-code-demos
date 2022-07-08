import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Autocomplete } from 'devextreme-react/autocomplete';
import { SelectBox } from 'devextreme-react/select-box';

const MdaeAutoComplete = (props, ref) => {
    const autocomplete = useRef(null);
    useImperativeHandle(ref, () => ({
        dataSource: (dataSourceValue) => {
            autocomplete.current.instance.option('dataSource', dataSourceValue);
            autocomplete.current.instance.getDataSource().reload();
        },
        instance: () => {
            return autocomplete.current.instance;
        },

    }));
    return (<Autocomplete
        ref={autocomplete}
        className="mdeAutoCmplete"
        value={props.value}
        name={props.name}
        onInput={props.onChange}
        onSelectionChanged={props.onSelectionChanged}
        dataSource={props.dataSource}
        {...props}
    />)
}
export default forwardRef(MdaeAutoComplete)
