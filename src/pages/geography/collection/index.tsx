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
        fenceng: 'A大楼',
        name: '10',
        leixing: '私有',
        jishu: '广告招标',
        state: '启用',
    },
    {
        id: 'LYA10202',
        fenceng: 'B大楼',
        name: '5',
        leixing: '私有',
        jishu: '广告招标',
        state: '启用',
    },
    {
        id: 'LYA10203',
        fenceng: 'C大楼',
        name: '15',
        leixing: '私有',
        jishu: '广告招标',
        state: '启用',
    },
    {
        id: 'LYA10204',
        fenceng: 'D大楼',
        name: '20',
        leixing: '私有',
        jishu: '广告招标',
        state: '启用',
    },
    {
        id: 'LYA10205',
        fenceng: 'A大楼',
        name: '10',
        leixing: '私有',
        jishu: '广告招标',
        state: '启用',
    },
    {
        id: 'LYA10206',
        fenceng: 'B大楼',
        name: '5',
        leixing: '公有',
        jishu: '广告招标',
        state: '启用',
    },
    {
        id: 'LYA10207',
        fenceng: 'C大楼',
        name: '15',
        leixing: '私有',
        jishu: '广告招标',
        state: '启用',
    },
    {
        id: 'LYA10208',
        fenceng: 'D大楼',
        name: '20',
        leixing: '私有',
        jishu: '广告招标',
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
            title: '楼宇信息',
            dataIndex: 'fenceng',
        },
        {
            title: '设备数量',
            dataIndex: 'name',
        },
        {
            title: '属性',
            dataIndex: 'leixing',
        },
        {
            title: '资源来源',
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
                title="楼宇媒体管理"
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
