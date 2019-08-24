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
        id:'IPC-NUM-006',
        cf:'10.100.200.1-10.100.200.200',
        dw:'255.255.255.0',
        jg:'192.168.1.058',
        jx:'eth1',
        status: '启用',
     },
     {
       id:'IPC-NUM-007',
       cf:'10.100.200.1-10.100.200.100',
       dw:'255.255.255.1',
       jg:'192.168.1.067',
       jx:'eth3',
       status: '启用',
    },
    {
        id:'IPC-NUM-008',
        cf:'10.100.200.1-10.100.200.150',
        dw:'255.255.255.0',
        jg:'192.168.1.047',
        jx:'eth6',
        status: '启用',
     },
    {
       id:'IPC-NUM-001',
       cf:'10.100.200.1-10.100.200.300',
       dw:'255.255.255.2',
       jg:'192.168.1.036',
       jx:'eth5',
       status: '启用',
    },
    {
        id:'IPC-NUM-002',
        cf:'10.100.200.1-10.100.200.220',
        dw:'255.255.255.1',
        jg:'192.168.1.05',
        jx:'eth4',
        status: '启用',
     },
     {
        id:'IPC-NUM-003',
        cf:'10.100.200.1-10.100.200.210',
        dw:'255.255.255.0',
        jg:'192.168.1.021',
        jx:'eth3',
        status: '启用',
     },
     {
        id:'IPC-NUM-004',
        cf:'10.100.200.1-10.100.200.210',
        dw:'255.255.255.1',
        jg:'192.168.1.023',
        jx:'eth2',
        status: '启用',
     },
     {
         id:'IPC-NUM-005',
         cf:'10.100.200.1-10.100.200.200',
         dw:'255.255.255.0',
         jg:'192.168.1.108',
         jx:'eth1',
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
            title: 'IP池',
            dataIndex: 'cf',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '子网掩码',
            dataIndex: 'dw',
            render: (text) => <Tag color="MAGENTA">{text}</Tag>,
        },
        {
            title: '数据通讯口（VxLan）',
            dataIndex: 'jx',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '数据通信IP',
            dataIndex: 'jg',
            render: (text) => <Tag color="RED">{text}</Tag>,
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
                title="IP池管理"
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
