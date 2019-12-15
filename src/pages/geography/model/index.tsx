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
        pinlv: '110:00:00.0000000000E',
        date: '100',
        model: '10000',
        type: '001:00:00.0000000000E',
        process: 30,
        status: '启用',
    },
    {
        id: 'GTOU1336',
        pinlv: '120:00:00.0000000000E',
        date: '0',
        model: '500000',
        type: '002:00:00.0000000000E',
        process: 45,
        status: '启用',
    },
    {
        id: 'GTOU1315',
        pinlv: '100:00:00.0000000000E',
        date: '20000',
        model: '100000',
        type: '020:00:00.0000000000E',
        process: 63,
        status: '启用',
    },
    {
        id: 'GTOU1324',
        pinlv: '110:00:00.0000000000E',
        date: '2000',
        model: '0',
        type: '010:00:00.0000000000E',
        process: 72,
        status: '启用',
    },
    {
        id: 'GTOU1339',
        pinlv: '100:00:00.0000000000E',
        date: '3000',
        model: '300000',
        type: '001:00:00.0000000000E',
        process: 13,
        status: '启用',
    },
    {
        id: 'GTOU1340',
        pinlv: '110:00:00.0000000000E',
        date: '100',
        model: '10000',
        type: '010:00:00.0000000000E',
        process: 44,
        status: '启用',
    },
    {
        id: 'GTOU1311',
        pinlv: '120:00:00.0000000000E',
        date: '500000',
        model: '1000000',
        type: '020:00:00.0000000000E',
        process: 38,
        status: '启用',
    },
    {
        id: 'GTOU1314',
        pinlv: '110:00:00.0000000000E',
        date: '0',
        model: '500000',
        type: '001:00:00.0000000000E',
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
            title: '中央子午线',
            dataIndex: 'pinlv',
        },
        {
            title: '北向加常数',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '东向加常数',
            dataIndex: 'model',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '平均纬度',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '输入进度',
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
                title="参数输入"
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
