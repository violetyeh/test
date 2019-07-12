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
        id: '1001',
        xm:'铬',
        jg:'0.1',
        dw:'mg/kg',
        pd:'合格',
        yj:'《食品安全国家标准》',
        state: '启用',
    },
    {
        id: '1002',
        xm:'铅',
        jg:'0.1',
        dw:'mg/kg',
        pd:'合格',
        yj:'《食品安全国家标准》',
        state: '启用',
    },
    {
        id: '1003',
        xm:'总汞',
        jg:'0.1',
        dw:'mg/kg',
        pd:'合格',
        yj:'《食品安全国家标准》',
        state: '启用',
    },
    {
        id: '1004',
        xm:'黄曲霉毒素',
        jg:'0.1',
        dw:'mg/kg',
        pd:'合格',
        yj:'《食品安全国家标准》',
        state: '启用',
    },
    {
        id: '1005',
        xm:'氢氧化钠',
        jg:'0.1',
        dw:'mg/kg',
        pd:'合格',
        yj:'《食品安全国家标准》',
        state: '启用',
    },
    {
        id: '1006',
        xm:'准邻苯二甲酸氢钾',
        jg:'0.3',
        dw:'mg/kg',
        pd:'合格',
        yj:'《食品安全国家标准》',
        state: '启用',
    },
    {
        id: '1007',
        xm:'酚酞指示剂',
        jg:'0.2',
        dw:'mg/kg',
        pd:'合格',
        yj:'《食品安全国家标准》',
        state: '启用',
    },
    {
        id: '1008',
        xm:'浓盐酸',
        jg:'0.01',
        dw:'mg/kg',
        pd:'合格',
        yj:'《食品安全国家标准》',
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
            title: '检验项目',
            dataIndex: 'xm',
        },
        {
            title: '检验结果',
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
            title: '检验依据',
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
                title="检测分析审核"
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
