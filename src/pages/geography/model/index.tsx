import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Card, Switch, Divider, message, Badge, Tag, Progress } from "antd";
import Search from "./Search";
import Save from "./Save";
import styles from "../style.less";

interface ModelProps {

}

interface ModelState {
    saveVisible: boolean,
    data: any[],
    currentItem: any,
}

const mockData = [
    {
        id: 'MTZY012323',
        pinlv: '广告机23',
        date: '广告招商',
        model: '32',
        type: '18',
        process: 87,
        status: '启用',
    },
    {
        id: 'MTZY012336',
        pinlv: '广告机36',
        date: '私有广告位',
        model: '36',
        type: '18',
        process: 65,
        status: '启用',
    },
    {
        id: 'MTZY012315',
        pinlv: '广告机15',
        date: '广告招商',
        model: '36',
        type: '18',
        process: 71,
        status: '启用',
    },
    {
        id: 'MTZY012324',
        pinlv: '广告机24',
        date: '私有广告位',
        model: '36',
        type: '18',
        process: 72,
        status: '启用',
    },
    {
        id: 'MTZY012339',
        pinlv: '广告机39',
        date: '广告招商',
        model: '27',
        type: '18',
        process: 13,
        status: '启用',
    },
    {
        id: 'MTZY012340',
        pinlv: '广告机40',
        date: '广告招商',
        model: '36',
        type: '18',
        process: 44,
        status: '启用',
    },
    {
        id: 'MTZY012311',
        pinlv: '广告机11',
        date: '广告招商',
        model: '27',
        type: '18',
        process: 38,
        status: '启用',
    },
    {
        id: 'MTZY012314',
        pinlv: '广告机14',
        date: '私有广告位',
        model: '36',
        type: '18',
        process: 56,
        status: '启用',
    },
   
]

class Model extends Component<ModelProps, ModelState>{
    state: ModelState = {
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
            title: '媒体资源名称',
            dataIndex: 'pinlv',
        },
        {
            title: '资源来源渠道',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '设备日播资源数（广告：个）',
            dataIndex: 'model',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '媒体设备启用时长（小时）',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '时长率',
            dataIndex: 'process',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },

        {
            title: '是否启用',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="启用" unCheckedChildren="禁用" />,
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
        this.setState({
            currentItem: record,
            saveVisible: true,
        });
    }

    delete = (record: any) => {
        message.error('核心数据，无法删除');
    }
    render() {
        const { saveVisible, data, currentItem } = this.state;
        return (
            <PageHeaderWrapper
                title="媒体资源管理"
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
            </PageHeaderWrapper>
        );
    }
}

export default Model;
