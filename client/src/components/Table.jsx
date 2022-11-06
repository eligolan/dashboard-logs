/*global io*/
import React, { useEffect, useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Table = () => {
    const [rowData, setRowData] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        socketRef.current = newSocket;

        newSocket.on('all-logs', data => {
            if (data.length) {
                setRowData(data.map((item) => {
                    return {
                        name: item.name,
                        screenshot: item.url
                    }
                }))
            }
        })

        return () => {
            newSocket.off('all-logs');
        };
    }, [])

    useEffect(() => {
        const onGetNewMessage = (data) => {
            setRowData([...rowData, {
                ...data,
                screenshot: data.url,
            }])
        }
        socketRef.current.on('message', onGetNewMessage)

        return () => {
            socketRef.current.off('message', onGetNewMessage);
        };
    }, [rowData]);

    const [columnDefs] = useState([
        { field: 'name' },
        { field: 'screenshot' },
    ])

    return (
        <div className="ag-theme-alpine" style={{ height: 400 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
        </div>
    );
};

export default Table;