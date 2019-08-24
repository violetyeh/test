import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag, Select, Progress } from "antd";
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
        id: 'TD-ZOP00231',
        jishu: 'SYN-SENT',
        fenceng: 'TCP',
        leixing: '等待连接',
        name: '10.318.100.198：4623-112.20.148.30：7909',
        state: '启用',
        jd:'100',
    },
    {
        id: 'TD-ZOP00232',
        jishu: 'ESTABLISHED',
        fenceng: 'UDP',
        leixing: '已经连接',
        name: '10.175.100.198：4623-112.20.148.30：7909',
        state: '启用',
        jd:'68',
    },
    {
        id: 'TD-ZOP00233',
        jishu: 'SYN-SENT',
        fenceng: 'UDP',
        leixing: '等待连接',
        name: '10.175.100.198：4623-112.20.148.30：7909',
        state: '启用',
        jd:'43',
    },
    {
        id: 'TD-ZOP00234',
        jishu: 'CLOSE',
        fenceng: 'SMTP',
        leixing: '已经连接',
        name: '10.158.100.198：2314-112.20.148.30：6320',
        state: '启用',
        jd:'100',
    },
    {
        id: 'TD-ZOP00235',
        jishu: 'ESTABLISHED',
        fenceng: 'SMTP',
        leixing: '等待连接',
        name: '10.175.100.198：4623-112.20.148.30：7909',
        state: '启用',
        jd:'79',
    },
    {
        id: 'TD-ZOP00236',
        jishu: 'CLOSE',
        fenceng: 'FTP',
        leixing: '已经连接',
        name: '10.212.100.198：4623-112.20.148.30：7909',
        state: '启用',
        jd:'19',
    },
    {
        id: 'TD-ZOP00237',
        jishu: 'SYN-SENT',
        fenceng: 'TCP',
        leixing: '等待连接',
        name: '10.175.100：3008-112.20.148.30：5532',
        state: '启用',
        jd:'0',
    },
    {
        id: 'TD-ZOP00238',
        jishu: 'ESTABLISHED',
        fenceng: 'TCP',
        leixing: '已经连接',
        name: '10.318.100.198：4623-112.20.148.30：7909',
        state: '启用',
        jd:'56',
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
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '协议',
            dataIndex: 'fenceng',
        },
        {
            title: '连接描述',
            dataIndex: 'jishu',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        
        {
            title: ' 连接状态',
            dataIndex: 'leixing',
        },
        {
            title: '连接信息',
            dataIndex: 'name',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '连接进度',
            dataIndex: 'jd',
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
                title="连接监控管理"
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
