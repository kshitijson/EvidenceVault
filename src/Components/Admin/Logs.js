import React, { useEffect, useState } from 'react'
import { Spin, Table } from "antd"
import { LinkOutlined } from '@ant-design/icons'
import { baseUrl } from '../utils/baseUrl';

export default function Logs() {

    useEffect(() => {
        document.title = "EPB | Admin | Logs";
    }, []);

    const [cases, setCases] = useState("No Matches Found");

    const clickkHandler = () => {
        setCases(<Spin className='custom-spinner' />);

        const columns = [
            {
                title: "ID",
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: 'Case no.',
                dataIndex: 'caseNo',
                key: 'caseNo',
            },
            {
                title: 'Case name',
                dataIndex: 'caseName',
                key: 'caseName',
            },
            {
                title: 'File name',
                dataIndex: 'fileName',
                key: 'fileName',
            },
            {
                title: 'File type',
                dataIndex: 'fileType',
                key: 'fileType',
            },
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
            },
        ];


        const _caseNo_ = document.getElementById("logs-search").value;
        const formData = new FormData();
        formData.append('caseNo', _caseNo_);

        fetch(`${baseUrl}/admin/logs`, {
            method: 'POST',
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (!data) {
                    setCases("No Matches Found");
                } else {
                    const formattedData = data.map(row => ({
                        id: row[0],
                        caseNo: row[1],
                        caseName: row[2],
                        fileName: row[3],
                        fileType: row[4],
                        action: row[6],
                    }));
                    const dataSource = formattedData;
                    setCases(<Table className='custom-table' dataSource={dataSource} columns={columns} pagination={false} />);
                }
            })
            .catch(error => {
                console.error('There was an error:', error);
            });
    }



    return (
        <>
            <div className="container logs">
                <div className="input-group rounded">
                    <input type="search" id='logs-search' className="form-control rounded" placeholder="Search Case number" aria-label="Search" aria-describedby="search-addon" />
                    <span className="input-group-text border-0" id="search-addon">
                        <i className="fas fa-search" onClick={clickkHandler}></i>
                    </span>
                </div>
            </div>

            <div className="container cases">
                <h5 className="cases-h5">{cases}</h5>
            </div>
        </>
    )
}
