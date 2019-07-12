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
        id: 'TJJ1001',
        xm:'营养强化剂',
        jg:'0.1',
        dw:'mg/kg',
        pd:'合格',
        yj:'《GJAQ-食品添加剂国家安全规范》',
        state: '启用',
    },
    {
        id: 'TJJ1002',
        xm:'消泡剂',
        jg:'0.1',
        dw:'mg/kg',
        pd:'合格',
        yj:'《GJAQ-食品添加剂国家安全规范》',
        state: '启用',
    },
    {
        id: 'TJJ1003',
        xm:'漂白剂',
        jg:'0.1',
        dw:'mg/kg',
        pd:'合格',
        yj:'《GJAQ-食品添加剂国家安全规范》',
        state: '启用',
    },
    {
        id: 'TJJ1004',
        xm:'膨松剂',
        jg:'0.1',
        dw:'mg/kg',
        pd:'合格',
        yj:'《GJAQ-食品添加剂国家安全规范》',
        state: '启用',
    },
    {
        id: 'TJJ1005',
        xm:'着色剂',
        jg:'0.1',
        dw:'mg/kg',
        pd:'合格',
        yj:'《GJAQ-食品添加剂国家安全规范》',
        state: '启用',
    },
    {
        id: 'TJJ1006',
        xm:'护色剂',
        jg:'0.3',
        dw:'mg/kg',
        pd:'合格',
        yj:'《GJAQ-食品添加剂国家安全规范》',
        state: '启用',
    },
    {
        id: 'TJJ1007',
        xm:'酶制剂',
        jg:'0.2',
        dw:'mg/kg',
        pd:'合格',
        yj:'《GJAQ-食品添加剂国家安全规范》',
        state: '启用',
    },
    {
        id: 'TJJ1008',
        xm:'增味剂',
        jg:'0.01',
        dw:'mg/kg',
        pd:'合格',
        yj:'《GJAQ-食品添加剂国家安全规范》',
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
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '添加剂检验项目',
            dataIndex: 'xm',
        },
        {
            title: '添加剂检验结果',
            dataIndex: 'jg',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '结果单位',
            dataIndex: 'dw',
        },
        {
            title: '结果判定',
            dataIndex: 'pd',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: '添加剂检验依据',
            dataIndex: 'yj',
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
                title="添加剂检测分析"
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
