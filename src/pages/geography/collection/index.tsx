import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag } from "antd";
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
        id: 'SYBH1021',
        tiji1:'101',
        tiji2:'13.23',
        zhiliang:'8',
        xisi:'13倍',
        quxian:'600',
        state: '启用',
    },
    {
        id: 'SYBH1022',
        tiji1:'102',
        tiji2:'23.23',
        zhiliang:'5',
        xisi:'4倍',
        quxian:'500',
        state: '启用',
    },
    {
        id: 'SYBH1023',
        tiji1:'103',
        tiji2:'13',
        zhiliang:'1.56',
        xisi:'3倍',
        quxian:'323',
        state: '启用',
    },
    {
        id: 'SYBH1024',
        tiji1:'104',
        tiji2:'52',
        zhiliang:'0.56',
        xisi:'5倍',
        quxian:'231',
        state: '启用',
    },
    {
        id: 'SYBH1025',
        tiji1:'105',
        tiji2:'13.23',
        zhiliang:'0.56',
        xisi:'4倍',
        quxian:'978',
        state: '启用',
    },
    {
        id: 'SYBH1026',
        tiji1:'106',
        tiji2:'13.23',
        zhiliang:'0.56',
        xisi:'7倍',
        quxian:'154',
        state: '启用',
    },
    {
        id: 'SYBH1027',
        tiji1:'107',
        tiji2:'13.23',
        zhiliang:'0.56',
        xisi:'3倍',
        quxian:'241',
        state: '启用',
    },
    {
        id: 'SYBH1028',
        tiji1:'108',
        tiji2:'13.23',
        zhiliang:'0.56',
        xisi:'10倍',
        quxian:'321',
        state: '启用',
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
            title: '试验编号',
            dataIndex: 'id',
        },
        {
            title: '试验体积',
            dataIndex: 'tiji1',
        },
        {
            title: '测定体积',
            dataIndex: 'tiji2',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '样品质量',
            dataIndex: 'zhiliang',
        },
        {
            title: '稀释倍数',
            dataIndex: 'xisi',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: '合格曲线',
            dataIndex: 'quxian',
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
                title="检测参数管理"
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
