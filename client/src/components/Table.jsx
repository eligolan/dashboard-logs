/*global io*/
import React, { useEffect, useState, useRef } from 'react';
import './Table.css';

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
        { field: 'screenshot' }
    ])

    return (
        <div className='tableWrapper'>
            <table border="1">
                <thead>
                    <tr>
                        <th>Pull Request Title</th>
                        <th>Screenshot</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rowData.map((data, index) => {
                            return (<tr key={index}>
                                <td>{data.name}</td>
                                <td>
                                    <img alt="" src={data.screenshot} />
                                </td>

                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Table;