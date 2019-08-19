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
        id: 'YH0020191',
        date: '陈学',
        model: 'android',
        type: '47',
        status: '启用',
        pinlv: '中国',
        process: 2,
    },
    {
        id: 'YH0022SI1',
        date: '杜小维',
        model: 'iPhone',
        type: '79',
        status: '启用',
        pinlv: '中国',
        process: 6,
    },
    {
        id: 'YH0020191',
        date: '陈光学',
        model: 'WEB',
        type: '102',
        status: '启用',
        pinlv: '国外',
        process: 3,
    },
    {
        id: 'YH0022SI1',
        date: '杜维',
        model: 'iPhone',
        type: '66',
        status: '启用',
        pinlv: '国外',
        process: 8,
    },
    {
        id: 'YH00201IOS',
        date: '陈鹏屹',
        model: 'android',
        type: '100',
        status: '启用',
        pinlv: '中国',
        process: 9,
    },
    {
        id: 'YSIW9s1',
        date: '张磊',
        model: 'iPhone',
        type: '102',
        status: '启用',
        pinlv: '国外',
        process: 7,
    },
    {
        id: 'YID80SJ',
        date: '陈芙蓉',
        model: 'WEB',
        type: '59',
        status: '启用',
        pinlv: '中国',
        process: 6,
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
            title: '地区',
            dataIndex: 'pinlv',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '用户名',
            dataIndex: 'date',
        },

        {
            title: '上次访问设备',
            dataIndex: 'model',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '近30天访问次数',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '用户活跃占比',
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
                title="用户轨迹查看"
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
