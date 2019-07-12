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
        id: 'D0001',
        lx:'过敏源食品（芒果）',
        yp:'人',
        xx:'2',
        sx:'12mg/kg',
    },
    {
        id: 'D0002',
        lx:'过敏源食品（玉米）',
        yp:'人',
        xx:'2',
        sx:'8mg/kg',
    },
    {
        id: 'D0003',
        lx:'过敏源食品（鸭蛋）',
        yp:'人',
        xx:'1',
        sx:'8mg/kg',
    },
    {
        id: 'D0004',
        lx:'过敏源食品（生姜）',
        yp:'人',
        xx:'1',
        sx:'6mg/kg',
    },
    {
        id: 'D0005',
        lx:'过敏源食品（大蒜）',
        yp:'人',
        xx:'1',
        sx:'15mg/kg',
    },
    {
        id: 'D0006',
        lx:'过敏源食品（牛奶）',
        yp:'人',
        xx:'1',
        sx:'22mg/kg',
    },
    {
        id: 'D0007',
        lx:'过敏源食品（花生）',
        yp:'人',
        xx:'2',
        sx:'8mg/kg',
    },
    {
        id: 'D0008',
        lx:'过敏源食品（鸡蛋）',
        yp:'人',
        xx:'2',
        sx:'5mg/kg',
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
            title: '食品名称',
            dataIndex: 'lx',
            render: (text) => <Tag color="#ff8ee9">{text}</Tag>,
        },
        {
            title: '过敏对象',
            dataIndex: 'yp',
        },
        {
            title: '过敏源数量',
            dataIndex: 'xx',
        },
        {
            title: '过量限制',
            dataIndex: 'sx',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
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
                title="过敏源分析管理"
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
