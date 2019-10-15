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
        jishu: '赵海',
        fenceng: '13020115874',
        leixing: '行驶在线',
        name: '运输车辆01',
        state: '启用',
    },
    {
        id: 'LX002',
        jishu: '张明',
        fenceng: '15736205147',
        leixing: '离线',
        name: '运输车辆02',
        state: '启用',
    },
    {
        id: 'LX003',
        jishu: '黄云',
        fenceng: '18225641527',
        leixing: '停车在线',
        name: '运输车辆03',
        state: '启用',
    },
    {
        id: 'LX004',
        jishu: '陈朝华',
        fenceng: '18221452415',
        leixing: '行驶在线',
        name: '运输车辆04',
        state: '启用',
    },
    {
        id: 'LX005',
        jishu: '江云峰',
        fenceng: '15174523564',
        leixing: '行驶在线',
        name: '运输车辆05',
        state: '启用',
    },
    {
        id: 'LX006',
        jishu: '刘亚亚',
        fenceng: '15142632541',
        leixing: '行驶在线',
        name: '运输车辆06',
        state: '启用',
    },
    {
        id: 'LX007',
        jishu: '张芸',
        fenceng: '15142356417',
        leixing: '离线',
        name: '运输车辆07',
        state: '启用',
    },
    {
        id: 'LX008',
        jishu: '黄韵雅',
        fenceng: '13025642156',
        leixing: '停车在线',
        name: '运输车辆08',
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
            title: '车辆名称',
            dataIndex: 'name',
           
        },
        {
            title: '司机姓名',
            dataIndex: 'jishu',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '司机手机号',
            dataIndex: 'fenceng',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '当前状态',
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
                title="运输车辆管理"
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
