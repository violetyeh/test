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
        pinlv: '快速路',
        date: '22个进口道',
        model: '2056',
        type: '2541',
        process: 30,
        status: '启用',
    },
    {
        id: 'GTOU1336',
        pinlv: '支路',
        date: '10个进口道',
        model: '1952',
        type: '2031',
        process: 45,
        status: '启用',
    },
    {
        id: 'GTOU1315',
        pinlv: '快速路',
        date: '8个进口道',
        model: '1456',
        type: '1520',
        process: 63,
        status: '启用',
    },
    {
        id: 'GTOU1324',
        pinlv: '主干路',
        date: '6个进口道',
        model: '3547',
        type: '2599',
        process: 72,
        status: '启用',
    },
    {
        id: 'GTOU1339',
        pinlv: '次干路',
        date: '4个进口道',
        model: '1245',
        type: '1025',
        process: 13,
        status: '启用',
    },
    {
        id: 'GTOU1340',
        pinlv: '支路 ',
        date: '24个进口道',
        model: '3120',
        type: '3021',
        process: 44,
        status: '启用',
    },
    {
        id: 'GTOU1311',
        pinlv: '主干路',
        date: '22个进口道',
        model: '2645',
        type: '2789',
        process: 38,
        status: '启用',
    },
    {
        id: 'GTOU1314',
        pinlv: '次干路',
        date: '16个进口道',
        model: '2250',
        type: '2300',
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
            title: '分类',
            dataIndex: 'pinlv',
        },
        {
            title: '观测车道数量',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '直行车流',
            dataIndex: 'model',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '左转车流',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '规划进度',
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
                title="道路功能分类"
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
