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
        id: 'GTOU1323',
        pinlv: '广告投放资源ZY23',
        date: '电视媒体',
        model: '上班族',
        type: '线上推广',
        process: 30,
        status: '启用',
    },
    {
        id: 'GTOU1336',
        pinlv: '广告投放资源ZY36',
        date: '微信/微博',
        model: '大学生',
        type: '线上推广',
        process: 45,
        status: '启用',
    },
    {
        id: 'GTOU1315',
        pinlv: '广告投放资源ZY15',
        date: '电视媒体',
        model: '大学生',
        type: '线上推广',
        process: 63,
        status: '启用',
    },
    {
        id: 'GTOU1324',
        pinlv: '广告投放资源ZY24',
        date: '微信/微博',
        model: '大学生',
        type: '线上推广',
        process: 72,
        status: '启用',
    },
    {
        id: 'GTOU1339',
        pinlv: '广告投放资源ZY39',
        date: '电视媒体',
        model: '上班族',
        type: '线上推广',
        process: 13,
        status: '启用',
    },
    {
        id: 'GTOU1340',
        pinlv: '广告投放资源ZY40',
        date: '电视媒体',
        model: '大学生',
        type: '线上推广',
        process: 44,
        status: '启用',
    },
    {
        id: 'GTOU1311',
        pinlv: '广告投放资源ZY11',
        date: '电视媒体',
        model: '上班族',
        type: '线上推广',
        process: 38,
        status: '启用',
    },
    {
        id: 'GTOU1314',
        pinlv: '广告投放资源ZY14',
        date: '微信/微博',
        model: '大学生',
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
            title: '广告投放资源',
            dataIndex: 'pinlv',
        },
        {
            title: '广告投放渠道',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '广告目标人群',
            dataIndex: 'model',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '广告定向',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '资源占比',
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
                title="投放资源管理"
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
