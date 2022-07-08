import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { DataGrid } from 'devextreme-react/data-grid';
import { filter } from 'lodash';

const MdaeDataGrid = (props, ref) => {

    const [height, setHeight] = useState(window.innerHeight - 161)
    const setGridHeight = (e) => {
        var windowHeight = e.target.innerHeight;
        setHeight(windowHeight - 160)
    }
    const grid = useRef(null)
    useImperativeHandle(ref, () => ({
        filter: (filterValue) => {
            grid.current.instance.filter(filterValue);
        },
        clearFilter: () => {
            grid.current.instance.clearFilter();
        },
        getSelectedRowKeys: () => {
            return grid.current.instance.getSelectedRowKeys();
        },
        refresh: () => {
            grid.current.instance.refresh();
        },
        instance: () => {
            return grid.current.instance;
        }
    }));

    useEffect(() => {
        window.addEventListener('resize', setGridHeight)
        return () => window.removeEventListener('resize', setGridHeight)
    }, [window.innerHeight])

    return (<DataGrid
        ref={grid}
        defaultFilterValue={props.defaultFilterValue}
        filterSyncEnabled={true}
        dataSource={props.dataSource}
        id={props.id}
        showBorders
        rowAlternationEnabled
        showRowLines
        showColumnLines
        selection={{
            mode: "multiple",
            showCheckBoxesMode: 'always',
            allowSelectAll: false
        }}
        columns={props.columns}
        height={height}
        paging={{ pageSize: 15 }}
        onRowDblClick={props.onRowDblClick}
        onContentReady={props.onContentReady}
        loadPanel={{
            enabled: true,
            showIndicator: true
        }}
    />)
}
export default forwardRef(MdaeDataGrid)