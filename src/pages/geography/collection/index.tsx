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
        jishu: 'WZ12356JG架构广告位位置',
        fenceng: '张宇',
        leixing: '线上广告',
        name: '广告招商',
        state: '启用',
    },
    {
        id: 'D0002',
        jishu: 'WZ16356JG架构广告位位置',
        fenceng: '孟凡',
        leixing: '线上广告',
        name: '广告招商',
        state: '启用',
    },
    {
        id: 'D0003',
        jishu: 'WZ12656JG架构广告位位置',
        fenceng: '程思',
        leixing: '线上广告',
        name: '广告招商',
        state: '启用',
    },
    {
        id: 'D0004',
        jishu: 'WZ12746JG架构广告位位置',
        fenceng: '齐天',
        leixing: '线上广告',
        name: '广告招商',
        state: '启用',
    },
    {
        id: 'D0005',
        jishu: 'WZ12366JG架构广告位位置',
        fenceng: '钱偲',
        leixing: '线上广告',
        name: '广告招商',
        state: '启用',
    },
    {
        id: 'D0006',
        jishu: 'WZ11256JG架构广告位位置',
        fenceng: '孟宇思',
        leixing: '线上广告',
        name: '广告招商',
        state: '启用',
    },
    {
        id: 'D0007',
        jishu: 'WZ112JG架构广告位位置',
        fenceng: '方艳',
        leixing: '线上广告',
        name: '广告招商',
        state: '启用',
    },
    {
        id: 'D0008',
        jishu: 'WZ11856JG架构广告位位置',
        fenceng: '姜宇',
        leixing: '线上广告',
        name: '广告招商',
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
            title: '广告主',
            dataIndex: 'fenceng',
        },
        {
            title: '广告位',
            dataIndex: 'jishu',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '售卖类型',
            dataIndex: 'name',
        },
        {
            title: ' 广告样式',
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
                title="架构技术管理"
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
