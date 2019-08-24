import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag, Checkbox, Progress } from "antd";
import styles from '../style.less';
import Search from "./Search";
import Save from "./Save";
import { Chart, View, Geom, Label } from "bizcharts";
import DataSet from '@antv/data-set';
import dituData from "./mockdata";


interface TypeProps {

}

interface TypeState {
    saveVisible: boolean;
    currentItem: any;
    data: any[];
}

const mockData = [
    {
        id: 'ZJXX00038',
        fl:'192 . 168 . 1 . 105',
        mc:'Windows Server 2008',
        ma:'VNC',
        nl:'2347',
        status:'34',
    },
    {
        id: 'ZJXX00021',
        fl:'192 . 168 . 1 . 01',
        mc:'Windows XP',
        ma:'FTP',
        nl:'1257',
        status:'100',
    },
    {
        id: 'ZJXX00037',
        fl:'192 . 168 . 1 . 302',
        mc:'Windows Server 2012',
        ma:'RDP',
        nl:'6341',
        status:'78',
    },
    {
        id: 'ZJXX00035',
        fl:'192 . 168 . 1 . 478',
        mc:'Windows 7/8 /10',
        ma:'VNC',
        nl:'7542',
        status:'99',
    },
    {
        id: 'ZJXX00064',
        fl:'192 . 168 . 1 . 356',
        mc:'Windows Server 2008/2012',
        ma:'RDP',
        nl:'2156',
        status:'39',
    },
    {
        id: 'ZJXX00078',
        fl:'192 . 168 . 1 . 255',
        mc:'Windows Server 2008',
        ma:'FDP',
        nl:'3321',
        status:'100',
    },
    {
        id: 'ZJXX00021',
        fl:'192 . 168 . 1 . 412',
        mc:'Windows 7/8 /10',
        ma:'RDP',
        nl:'4476',
        status:'78',
    },
    {
        id: 'ZJXX00035',
        fl:'192 . 168 . 1 . 231',
        mc:'Windows XP',
        ma:'SSH',
        nl:'3389',
        status:'56',
    },
 
    
]

class Type extends Component<TypeProps, TypeState>{

    state: TypeState = {
        saveVisible: false,
        data: mockData,
        currentItem: {},
    }

    columns: ColumnProps<any>[] = [
        
        {
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '主机地址',
            dataIndex: 'fl',
            render: (text) => <Tag color="black">{text}</Tag>,
        },
        {
            title: '操作系统',
            dataIndex: 'mc',
            render: (text) => <Tag color="Cyan">{text}</Tag>,
        },
        {
            title: '网络协议',
            dataIndex: 'ma',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
       
        {
            title: '服务端口',
            dataIndex: 'nl',
        },
        {
            title: '服务进度',
            dataIndex: 'status',
            render: (text) => <Progress percent={text} status="active" />,
          },
        {
            title: '操作',
            render: (text, record) => (
                <Fragment>
                    <a onClick={() => this.edit(record)}>编辑</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.delete(record)}>删除</a>
                </Fragment>
            ),
        },
    ];

    edit = (record: any) => {
        console.log(record, 'res');
        this.setState({
            currentItem: record,
            saveVisible: true,
        });
    }

    delete = (record: any) => {
        message.error('核心数据，无法删除');
    }

    render() {
        const { saveVisible, currentItem, data } = this.state;

        return (
            <PageHeaderWrapper
                title="主机信息管理"
            >
                <Card bordered={false}>
                    <div className={styles.tableListForm}><Search handleSave={() => this.setState({ currentItem: {}, saveVisible: true })} /></div>

                    <Table
                        dataSource={data}
                        columns={this.columns}
                        rowKey={item => item.id}
                    />

                </Card>
                {
                    saveVisible &&
                    <Save
                        currentItem={currentItem}
                        handleSaveVisible={() => this.setState({ saveVisible: false })}
                    />
                }
            </PageHeaderWrapper >
        );
    }
}

export default Type;
