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
        id: 'GGJG0023',
        pinlv: 'JIA架构广告活动0023',
        date: '设计广告订单提交方式',
        model: '采纳广告创意',
        type: '线上推广',
        process: 30,
        status: '启用',
    },
    {
        id: 'GGJG0036',
        pinlv: 'JIA架构广告活动0036',
        date: '设计广告订单保存方式',
        model: '收集广告创意',
        type: '线上推广',
        process: 45,
        status: '启用',
    },
    {
        id: 'GGJG0015',
        pinlv: 'JIA架构广告活动0015',
        date: '设计广告订单提交方式',
        model: '收集广告创意',
        type: '线上推广',
        process: 63,
        status: '启用',
    },
    {
        id: 'GGJG0024',
        pinlv: 'JIA架构广告活动0024',
        date: '设计广告订单保存方式',
        model: '收集广告创意',
        type: '线上推广',
        process: 72,
        status: '启用',
    },
    {
        id: 'GGJG0039',
        pinlv: 'JIA架构广告活动0039',
        date: '设计广告订单提交方式',
        model: '采纳广告创意',
        type: '线上推广',
        process: 13,
        status: '启用',
    },
    {
        id: 'GGJG0040',
        pinlv: 'JIA架构广告活动0040',
        date: '设计广告订单提交方式',
        model: '收集广告创意',
        type: '线上推广',
        process: 44,
        status: '启用',
    },
    {
        id: 'GGJG0011',
        pinlv: 'JIA架构广告活动0011',
        date: '设计广告订单提交方式',
        model: '采纳广告创意',
        type: '线上推广',
        process: 38,
        status: '启用',
    },
    {
        id: 'GGJG0014',
        pinlv: 'JIA架构广告活动0014',
        date: '设计广告订单保存方式',
        model: '收集广告创意',
        type: '线上推广',
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
            title: '广告活动',
            dataIndex: 'pinlv',
        },
        {
            title: '广告订单',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '广告创意',
            dataIndex: 'model',
        },
        {
            title: '广告定向',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '架构进度',
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
                title="架构设计管理"
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
