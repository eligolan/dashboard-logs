import React, { useEffect, useState } from 'react';
import './Table.css';
import axios from 'axios';

const HOST_URL = 'http://54.224.137.215:3000';

const Table = () => {
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        const url = `${HOST_URL}/api/logs`;
        axios.get(url)
            .then(function (response) {
                const { data } = response;
                if (data.length) {
                    setRowData(data.map((item) => {
                        return {
                            name: item.name,
                            screenshot: item.url
                        }
                    }))
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

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