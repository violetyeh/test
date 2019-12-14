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
        id: 'DKL0121',
        fenceng: '鹿岛',
        name: '国有',
        leixing: '使用权',
        jishu: '待质检',
        state: '启用',
    },
    {
        id: 'DKL0122',
        fenceng: '清远',
        name: '私有',
        leixing: '出让土地使用权',
        jishu: '待质检',
        state: '启用',
    },
    {
        id: 'DKL0123',
        fenceng: '惠州',
        name: '国有',
        leixing: '使用权',
        jishu: '待质检',
        state: '启用',
    },
    {
        id: 'DKL0124',
        fenceng: '禅城',
        name: '国有',
        leixing: '使用权',
        jishu: '已质检',
        state: '启用',
    },
    {
        id: 'DKL0125',
        fenceng: '金家岩',
        name: '国有',
        leixing: '出让土地使用权',
        jishu: '待质检',
        state: '启用',
    },
    {
        id: 'DKL0126',
        fenceng: '岚园',
        name: '私有',
        leixing: '划拨土地使用权',
        jishu: '质检不通过',
        state: '启用',
    },
    {
        id: 'DKL0127',
        fenceng: '增城',
        name: '国有',
        leixing: '使用权',
        jishu: '已质检',
        state: '启用',
    },
    {
        id: 'DKL0128',
        fenceng: '越秀',
        name: '国有',
        leixing: '使用权',
        jishu: '待质检',
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
            title: '地籍编号',
            dataIndex: 'id',
        },
        {
            title: '行政区名',
            dataIndex: 'fenceng',
        },
        {
            title: '土地属性',
            dataIndex: 'name',
        },
        {
            title: ' 使用类型',
            dataIndex: 'leixing',
        },
        {
            title: '状态',
            dataIndex: 'jishu',
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
                title="地籍信息"
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
