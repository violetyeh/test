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
        id: 'KFno23',
        pinlv: '售票客服0023',
        date: '退票服务咨询',
        model: '40',
        type: '您已长时间未响应客服，如果过长时间未响应，对话将结束！',
        process: 87,
        status: '启用',
    },
    {
        id: 'KFno36',
        pinlv: '售票客服0036',
        date: '购票服务咨询',
        model: '60',
        type: '您已长时间未响应客服，系统已结束您的对话，欢迎下次咨询！',
        process: 65,
        status: '启用',
    },
    {
        id: 'KFno15',
        pinlv: '售票客服0015',
        date: '购票服务咨询',
        model: '60',
        type: '您已长时间未响应客服，系统已结束您的对话，欢迎下次咨询！',
        process: 71,
        status: '启用',
    },
    {
        id: 'KFno24',
        pinlv: '售票客服0024',
        date: '改签服务咨询',
        model: '60',
        type: '您已长时间未响应客服，如果过长时间未响应，对话将结束！',
        process: 72,
        status: '启用',
    },
    {
        id: 'KFno39',
        pinlv: '售票客服0039',
        date: '退票服务咨询',
        model: '30',
        type: '您已长时间未响应客服，系统已结束您的对话，欢迎下次咨询！',
        process: 13,
        status: '启用',
    },
    {
        id: 'KFno40',
        pinlv: '售票客服0040',
        date: '改签服务咨询',
        model: '60',
        type: '您已长时间未响应客服，系统已结束您的对话，欢迎下次咨询！',
        process: 44,
        status: '启用',
    },
    {
        id: 'KFno11',
        pinlv: '售票客服0011',
        date: '退票服务咨询',
        model: '30',
        type: '您已长时间未响应客服，系统已结束您的对话，欢迎下次咨询！',
        process: 38,
        status: '启用',
    },
    {
        id: 'KFno14',
        pinlv: '售票客服0014',
        date: '购票服务咨询',
        model: '60',
        type: '您已长时间未响应客服，系统已结束您的对话，欢迎下次咨询！',
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
            title: '客服昵称',
            dataIndex: 'pinlv',
        },
        {
            title: '服务类型',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '回复时间间隔（秒）',
            dataIndex: 'model',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '提示消息设置',
            dataIndex: 'type',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '服务效率',
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
                title="票务客服管理"
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
