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
        id: 'XNJ00007',
        tongdao:'i-2-46-VM',
        touguang:'BMC Server001',
        duizhao:'sandong',
        shijian:'停止运行',
        state: '启用',
    },
    {
        id: 'XNJ00006',
        tongdao:'i-2-47-VM',
        touguang:'BMC Server002',
        duizhao:'jinan',
        shijian:'正在运行中',
        state: '启用',
    },
    {
        id: 'XNJ00005',
        tongdao:'i-2-48-VM',
        touguang:'BMC Server003',
        duizhao:'chongqing',
        shijian:'停止运行',
        state: '启用',
    },
    {
        id: 'XNJ000004',
        tongdao:'i-2-49-VM',
        touguang:'BMC Server004',
        duizhao:'sandong',
        shijian:'正在运行中',
        state: '启用',
    },
    {
        id: 'XNJ00003',
        tongdao:'i-2-41-VM',
        touguang:'BMC Server005',
        duizhao:'guangzhou',
        shijian:'停止运行',
        state: '启用',
    },
    {
        id: 'XNJ00002',
        tongdao:'i-2-42-VM',
        touguang:'BMC Server006',
        duizhao:'yunnan',
        shijian:'停止运行',
        state: '启用',
    },
    {
        id: 'XNJ00001',
        tongdao:'i-2-43-VM',
        touguang:'BMC Server007',
        duizhao:'beijing',
        shijian:'正在运行中',
        state: '启用',
    },
    {
        id: 'XNJ00000',
        tongdao:'i-2-44-VM',
        touguang:'BMC Server008',
        duizhao:'sandong',
        shijian:'正在运行中',
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
            title: '内部名称',
            dataIndex: 'tongdao',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '显示名称',
            dataIndex: 'touguang',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '区域名称',
            dataIndex: 'duizhao',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '状态',
            dataIndex: 'shijian',
            render: (text) => <Tag color="#ff5555">{text}</Tag>,
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
                title="虚拟机管理"
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
