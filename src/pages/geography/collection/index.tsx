import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag, Checkbox } from "antd";
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
        id: 'APLO-000038',
        fl:'http',
        mc:'192.168.1.32',
        ma:'Smurf',
        nl:'刘文',
    },
    {
        id: 'APLO-000021',
        fl:'ftp',
        mc:'192.168.1.2',
        ma:'Ping Sweep',
        nl:'赵媛',
    },
    {
        id: 'APLO-000037',
        fl:'sql',
        mc:'192.168.1.120',
        ma:'Ip Spoof',
        nl:'刘冰',
    },
    {
        id: 'APLO-000035',
        fl:'rtsp',
        mc:'192.168.1.301',
        ma:'Tear Drop',
        nl:'汪峰',
    },
    {
        id: 'APLO-000064',
        fl:'http',
        mc:'192.168.1.102',
        ma:'Smurf',
        nl:'陈云',
    },
    {
        id: 'APLO-000078',
        fl:'ftp',
        mc:'192.168.1.02',
        ma:'Land',
        nl:'王安',
    },
    {
        id: 'APLO-000021',
        fl:'ftp',
        mc:'192.168.1.54',
        ma:'Ip Spoof',
        nl:'张文芳',
    },
    {
        id: 'APLO-000035',
        fl:'nail',
        mc:'192.168.1.01',
        ma:'Ping Sweep',
        nl:'王芳',
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
            title: '模块名称',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '受保护的机器',
            dataIndex: 'mc',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '攻击类型',
            dataIndex: 'ma',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
       
        {
            title: '管理员',
            dataIndex: 'nl',
        },
        {
            title: '禁止',
            dataIndex: 'jz',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >禁止</Checkbox>
                </Fragment>
            ),
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
                title="防火墙参数设置"
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
