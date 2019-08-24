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
        id:'IPID006',
        cf:'192.168.1.41',
        dw:'255.255.255.0',
        jg:'192.168.1.058',
        jx:'Auto Create Subnet',
        status: '启用',
     },
     {
       id:'IPID007',
       cf:'192.168.1.08',
       dw:'255.255.255.1',
       jg:'192.168.1.067',
       jx:'Automatic Delete Subnet',
       status: '启用',
    },
    {
        id:'IPID008',
        cf:'192.168.1.12',
        dw:'255.255.255.0',
        jg:'192.168.1.047',
        jx:'Automatically adding subnets',
        status: '启用',
     },
    {
       id:'IPID001',
       cf:'192.168.1.28',
       dw:'255.255.255.2',
       jg:'192.168.1.036',
       jx:'Automatically adding subnet segments',
       status: '启用',
    },
    {
        id:'IPID002',
        cf:'192.168.1.36',
        dw:'255.255.255.1',
        jg:'192.168.1.05',
        jx:'Automatic deletion of subnet segments',
        status: '启用',
     },
     {
        id:'IPID003',
        cf:'192.168.1.115',
        dw:'255.255.255.0',
        jg:'192.168.1.021',
        jx:'Automatic Delete Subnet',
        status: '启用',
     },
     {
        id:'IPID004',
        cf:'192.168.1.025',
        dw:'255.255.255.1',
        jg:'192.168.1.023',
        jx:'Automatically create subnet segments',
        status: '启用',
     },
     {
         id:'IPID005',
         cf:'192.168.1.63',
         dw:'255.255.255.0',
         jg:'192.168.1.108',
         jx:'Auto Create Subnet',
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
            title: 'IP范围开始',
            dataIndex: 'cf',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: 'IP范围结束',
            dataIndex: 'jg',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '描述',
            dataIndex: 'jx',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '掩码',
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
                title="IP管理"
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
