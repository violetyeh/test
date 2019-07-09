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
        jishu: '人工测绘',
        fenceng: '水系',
        leixing: '面、点、线',
        name: '误差测量',
        state: '启用',
    },
    {
        id: 'D0002',
        jishu: '电子测绘',
        fenceng: '居民地',
        leixing: '面、点',
        name: 'CNSS定位与测量',
        state: '启用',
    },
    {
        id: 'D0003',
        jishu: '智能测绘',
        fenceng: '铁路',
        leixing: '线',
        name: '计算机测绘',
        state: '启用',
    },
    {
        id: 'D0004',
        jishu: '人工测绘',
        fenceng: '公路',
        leixing: '线',
        name: '控制测量',
        state: '启用',
    },
    {
        id: 'D0005',
        jishu: '人工测绘',
        fenceng: '行政境界',
        leixing: '点、线、面',
        name: '数据测图',
        state: '启用',
    },
    {
        id: 'D0006',
        jishu: '电子测绘',
        fenceng: '行政境界',
        leixing: '点、线、面',
        name: '工程测量',
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
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '测绘技术名称',
            dataIndex: 'name',
        },
        {
            title: '技术类型',
            dataIndex: 'jishu',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '数据分层',
            dataIndex: 'fenceng',
        },
        {
            title: '几何类型',
            dataIndex: 'leixing',
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
                title="测绘技术管理"
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
