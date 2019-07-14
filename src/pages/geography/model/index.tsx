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
        dw:'45/tcp',
        jg:'网络信息过滤',
        jx:'高级优先',
        status: '启用',
     },
     {
       id:'ZJSM023897',
       cf:'192.168.1.08',
       dw:'56/tcp',
       jg:'用户行为审计',
       jx:'高级优先',
       status: '启用',
    },
    {
        id:'ZJSM023898',
        cf:'192.168.1.12',
        dw:'23/tcp',
        jg:'网络信息过滤',
        jx:'低级优先',
        status: '启用',
     },
    {
       id:'ZJSM023891',
       cf:'192.168.1.28',
       dw:'38/tcp',
       jg:'用户行为审计',
       jx:'低级优先',
       status: '启用',
    },
    {
        id:'ZJSM023892',
        cf:'192.168.1.36',
        dw:'46/tcp',
        jg:'网络信息过滤',
        jx:'低级优先',
        status: '启用',
     },
     {
        id:'ZJSM023893',
        cf:'192.168.1.115',
        dw:'57/tcp',
        jg:'用户行为审计',
        jx:'高级优先',
        status: '启用',
     },
     {
        id:'ZJSM023894',
        cf:'192.168.1.025',
        dw:'16/tcp',
        jg:'网络信息过滤',
        jx:'高级优先',
        status: '启用',
     },
     {
         id:'ZJSM023895',
         cf:'192.168.1.63',
         dw:'06/tcp',
         jg:'用户行为审计',
         jx:'低级优先',
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
            title: 'IP地址',
            dataIndex: 'cf',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '管理状态',
            dataIndex: 'jg',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '服务',
            dataIndex: 'jx',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '端口号',
            dataIndex: 'dw',
            render: (text) => <Tag color="magenta">{text}</Tag>,
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
                title="本机信息管理"
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
