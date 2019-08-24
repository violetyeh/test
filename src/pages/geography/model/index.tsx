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
        id:'ZJSM023896',
        cf:'192.168.1.41',
        dw:'外网口',
        jg:'网络信息过滤',
        jx:'攻击/扫描/地址欺骗等日志',
        status: '启用',
     },
     {
       id:'ZJSM023897',
       cf:'192.168.1.08',
       dw:'任意网口',
       jg:'用户行为审计',
       jx:'攻击/扫描/地址欺骗等日志',
       status: '启用',
    },
    {
        id:'ZJSM023898',
        cf:'192.168.1.12',
        dw:'内网口',
        jg:'网络信息过滤',
        jx:'本地安全日志',
        status: '启用',
     },
    {
       id:'ZJSM023891',
       cf:'192.168.1.28',
       dw:'外网口',
       jg:'用户行为审计',
       jx:'本地安全日志',
       status: '启用',
    },
    {
        id:'ZJSM023892',
        cf:'192.168.1.36',
        dw:'任意网口',
        jg:'网络信息过滤',
        jx:'本地安全日志',
        status: '启用',
     },
     {
        id:'ZJSM023893',
        cf:'192.168.1.115',
        dw:'内网口',
        jg:'用户行为审计',
        jx:'攻击/扫描/地址欺骗等日志',
        status: '启用',
     },
     {
        id:'ZJSM023894',
        cf:'192.168.1.025',
        dw:'外网口',
        jg:'网络信息过滤',
        jx:'数据包流速超限日志',
        status: '启用',
     },
     {
         id:'ZJSM023895',
         cf:'192.168.1.63',
         dw:'任意网口',
         jg:'用户行为审计',
         jx:'本地安全日志',
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
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '服务器地址',
            dataIndex: 'cf',
        },
        {
            title: '区域',
            dataIndex: 'dw',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '管理状态',
            dataIndex: 'jg',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '发送日志',
            dataIndex: 'jx',
            render: (text) => <Tag color="red">{text}</Tag>,
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
                title="威胁审计检测"
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
