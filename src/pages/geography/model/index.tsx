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
        id: 'YIDS0191',
        date: '33.00',
        model: '320.00',
        type: '2200.00',
        status: '启用',
        pinlv: '基本型缓和曲线',
        process: 85,
    },
    {
        id: 'YIDS2SI1',
        date: '25.00',
        model: '300.00',
        type: '1230.00',
        status: '启用',
        pinlv: '同向复曲线',
        process: 100,
    },
    {
        id: 'YIDS0122',
        date: '60.00',
        model: '623.00',
        type: '5002.00',
        status: '启用',
        pinlv: '基本型缓和曲线',
        process: 73,
    },
    {
        id: 'YIDS2S12',
        date: '45.00',
        model: '400.00',
        type: '3500.00',
        status: '启用',
        pinlv: '凸型曲线',
        process: 88,
    },
    {
        id: 'YIDS01IOS',
        date: '25.00',
        model: '456.00',
        type: '2320.00',
        status: '启用',
        pinlv: '同向复曲线',
        process: 69,
    },
    {
        id: 'YSIW9s1',
        date: '35.00',
        model: '236.00',
        type: '1300.00',
        status: '启用',
        pinlv: '凸型曲线',
        process: 77,
    },
    {
        id: 'YID80SJ',
        date: '20.00',
        model: '853.00',
        type: '2000.00',
        status: '启用',
        pinlv: '凸型曲线',
        process: 86,
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
            title: '道路线型',
            dataIndex: 'pinlv',
        },
        {
            title: 'X',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: 'Y',
            dataIndex: 'model',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '公里数',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '设计进度',
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
                title="道路设计"
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
