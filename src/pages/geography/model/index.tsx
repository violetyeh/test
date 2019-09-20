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
        id: 'WJ0008S0J',
        date: '街道名称',
        type: '50',
        status: '启用',
        pinlv: '道路编号',
        process: '0.3',
    },
    {
        id: 'WJ00072IK',
        date: '路名牌',
        type: '40',
        status: '启用',
        pinlv: '分岔路口',
        process: '0.4',
    },
    {
        id: 'WJ00063JJ',
        date: '入口预告',
        type: '50',
        status: '启用',
        pinlv: '互通式立交',
        process: '0.3',
    },
    {
        id: 'WJ0000191',
        date: '地点方向',
        type: '60',
        status: '启用',
        pinlv: '环形交叉路口',
        process: '0.3',
    },
    {
        id: 'WJ0002SI1',
        date: '公路编号',
        type: '50',
        status: '启用',
        pinlv: 'Y型交叉路口',
        process: '0.4',
    },
    {
        id: 'WJ00001IOS',
        date: '出口预告',
        type: '30',
        status: '启用',
        pinlv: '丁字路口预告',
        process: '0.3',
    },
    {
        id: 'YSIW9s1',
        date: '高速起终点',
        type: '45',
        status: '启用',
        pinlv: '十字路口预告',
        process: '0.6',
    },
    {
        id: 'WJ00080SJ',
        date: '里程牌',
        type: '50',
        status: '启用',
        pinlv: '交叉路口预告',
        process: '0.3',
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
            title: '编号',
            dataIndex: 'id',
        },
        {
            title: '自定义标志设计',
            dataIndex: 'pinlv',
        },
        {
            title: '交通设施',
            dataIndex: 'date',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '汉英高度 H （cm）',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '汉英间距',
            dataIndex: 'process',
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
                title="交通路标设计"
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
