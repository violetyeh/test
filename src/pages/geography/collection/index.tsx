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
        id: 'CEL0001',
        jishu: 's230（16.632）',
        fenceng: 's231（42.242）',
        leixing: '无限制',
        name: 'BLH',
        state: '启用',
    },
    {
        id: 'CEL0002',
        jishu: 's350（13.214）',
        fenceng: 's351（36.612）',
        leixing: '无限制',
        name: 'xyh',
        state: '启用',
    },
    {
        id: 'CEL0003',
        jishu: 's412（31.451）',
        fenceng: 's413（57.421）',
        leixing: '无限制',
        name: 'BLH',
        state: '启用',
    },
    {
        id: 'CEL0004',
        jishu: 's315（85.235）',
        fenceng: 's316（94.423）',
        leixing: '无限制',
        name: 'xyh',
        state: '启用',
    },
    {
        id: 'CEL0005',
        jishu: 's315（27.235）',
        fenceng: 's316（53.123）',
        leixing: '有限制',
        name: 'xyh',
        state: '启用',
    },
    {
        id: 'CEL0006',
        jishu: 's302（10.238）',
        fenceng: 's303（25.421）',
        leixing: '有限制',
        name: 'BLH',
        state: '启用',
    },
    {
        id: 'CEL0007',
        jishu: 's325（27.471）',
        fenceng: 's326（47.571）',
        leixing: '有限制',
        name: 'xyh',
        state: '启用',
    },
    {
        id: 'CEL0008',
        jishu: 's315（16.235）',
        fenceng: 's316（26.435）',
        leixing: '有限制',
        name: 'BLH',
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
            title: '坐标格式',
            dataIndex: 'name',
        },
        {
            title: '起点位置',
            dataIndex: 'jishu',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '终点位置',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '承载限值',
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
                title="测量配置"
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
