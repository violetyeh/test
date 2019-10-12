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
        id: 'LYA10201',
        fenceng: '建筑工程A大楼',
        name: '砖混',
        leixing: '360天',
        jishu: '30000',
        state: '启用',
    },
    {
        id: 'LYA10202',
        fenceng: '建筑工程B大楼',
        name: '框架',
        leixing: '280天',
        jishu: '12542',
        state: '启用',
    },
    {
        id: 'LYA10203',
        fenceng: '建筑工程C大楼',
        name: '砖混',
        leixing: '340天',
        jishu: '26300',
        state: '启用',
    },
    {
        id: 'LYA10204',
        fenceng: '建筑工程D大楼',
        name: '框架',
        leixing: '400天',
        jishu: '15000',
        state: '启用',
    },
    {
        id: 'LYA10205',
        fenceng: '建筑工程A大楼',
        name: '框架',
        leixing: '420天',
        jishu: '10000',
        state: '启用',
    },
    {
        id: 'LYA10206',
        fenceng: '建筑工程B大楼',
        name: '砖混',
        leixing: '200天',
        jishu: '25000',
        state: '启用',
    },
    {
        id: 'LYA10207',
        fenceng: '建筑工程C大楼',
        name: '砖混',
        leixing: '300天',
        jishu: '20000',
        state: '启用',
    },
    {
        id: 'LYA10208',
        fenceng: '建筑工程D大楼',
        name: '框架',
        leixing: '360天',
        jishu: '30000',
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
            title: '工程名称',
            dataIndex: 'fenceng',
        },
        {
            title: '结构类型',
            dataIndex: 'name',
        },
        {
            title: '计划工期',
            dataIndex: 'leixing',
        },
        {
            title: '施工面积（m²）',
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
                title="工程信息"
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
