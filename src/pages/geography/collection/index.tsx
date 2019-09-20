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
        id: 'LX001',
        jishu: '道路',
        fenceng: ' 1：1000',
        leixing: '142',
        name: 'ROAD1',
        state: '启用',
    },
    {
        id: 'LX002',
        jishu: '绿化带',
        fenceng: ' 1：500',
        leixing: '166',
        name: 'ROAD2',
        state: '启用',
    },
    {
        id: 'LX003',
        jishu: '人行道',
        fenceng: ' 1：1000',
        leixing: '160',
        name: 'ROAD3',
        state: '启用',
    },
    {
        id: 'LX004',
        jishu: '道路中心线',
        fenceng: ' 1：1000',
        leixing: '36',
        name: 'ROAD4',
        state: '启用',
    },
    {
        id: 'LX005',
        jishu: '副道路中心线',
        fenceng: ' 1：500',
        leixing: '45',
        name: 'ROAD5',
        state: '启用',
    },
    {
        id: 'LX006',
        jishu: '人行横道线',
        fenceng: ' 1：1000',
        leixing: '96',
        name: 'ROAD6',
        state: '启用',
    },
    {
        id: 'LX007',
        jishu: '道路宽度标注',
        fenceng: ' 1：1000',
        leixing: '89',
        name: 'ROAD7',
        state: '启用',
    },
    {
        id: 'LX008',
        jishu: '道弧标注',
        fenceng: ' 1：500',
        leixing: '110',
        name: 'ROAD8',
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
            title: '编号',
            dataIndex: 'id',
        },
        {
            title: '图层名',
            dataIndex: 'name',
        },
        {
            title: '图层含义',
            dataIndex: 'jishu',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '出图比例',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '公里数',
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
                title="图层设置"
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
