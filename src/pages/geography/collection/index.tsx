import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag, Progress } from "antd";
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
        id: 'LLJC027',
        mc:'9',
        tiji2:'10',
        zhiliang:'200.00',
        zb:5231,
        state: '启用',
        sj:'18:00',
    },
    {
        id: 'LLJC028',
        mc:'8',
        tiji2:'5',
        zhiliang:'250.00',
        zb:4213,
        state: '启用',
        sj:'6:00',
    },
    {
        id: 'LLJC021',
        mc:'10',
        tiji2:'03',
        zhiliang:'150.00',
        zb:5330,
        state: '启用',
        sj:'12:00',
    },
    {
        id: 'LLJC022',
        mc:'2',
        tiji2:'56',
        zhiliang:'50.00',
        zb:6223,
        state: '启用',
        sj:'24:00',
    },
    {
        id: 'LLJC023',
        mc:'6',
        tiji2:'4',
        zhiliang:'100.00',
        zb:4783,
        state: '启用',
        sj:'6:00',
    },
    {
        id: 'LLJC024',
        mc:'7',
        tiji2:'65',
        zhiliang:'110.00',
        zb:2055,
        state: '启用',
        sj:'18:00',
    },
    {
        id: 'LLJC025',
        mc:'5',
        tiji2:'14',
        zhiliang:'30.00',
        zb:3021,
        state: '启用',
        sj:'12:00',
    },
    {
        id: 'LLJC026',
        mc:'3',
        tiji2:'04',
        zhiliang:'20.00',
        zb:4024,
        state: '启用',
        sj:'7:00',
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
            title: '监测编号',
            dataIndex: 'id',
        },
        {
            title: '监测时间',
            dataIndex: 'sj',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '蓄水池入口瞬时流量（t）',
            dataIndex: 'mc',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: '清水池出口累计流量（t）',
            dataIndex: 'tiji2',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '今日进水量（t）',
            dataIndex: 'zhiliang',
        },
        {
            title: '本月进水量（t）',
            dataIndex: 'zb',
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
                title="流量监测"
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
