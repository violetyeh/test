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
        id:'zd096',
        cf:'通道-TD41',
        dw:'45000',
        jg:'带宽预留',
        jx:'任意',
        process:'54',
        status: '启用',
     },
     {
       id:'zd097',
       cf:'通道-TD08',
       dw:'56000',
       jg:'带宽限制',
       jx:'任意',
       process:'99',
       status: '启用',
    },
    {
        id:'zd098',
        cf:'通道-TD12',
        dw:'23000',
        jg:'带宽预留',
        jx:'网桥1->上行',
        process:'46',
        status: '启用',
     },
    {
       id:'zd091',
       cf:'通道-TD28',
       dw:'38000',
       jg:'带宽限制',
       jx:'网桥1->上行',
       process:'100',
       status: '启用',
    },
    {
        id:'zd092',
        cf:'通道-TD36',
        dw:'46000',
        jg:'带宽预留',
        jx:'网桥1->上行',
        process:'88',
        status: '启用',
     },
     {
        id:'zd093',
        cf:'通道-TD115',
        dw:'57000',
        jg:'带宽限制',
        jx:'任意',
        process:'79',
        status: '启用',
     },
     {
        id:'zd094',
        cf:'通道-TD025',
        dw:'16000',
        jg:'带宽预留',
        jx:'任意',
        process:'46',
        status: '启用',
     },
     {
         id:'zd095',
         cf:'通道-TD63',
         dw:'6000',
         jg:'带宽限制',
         jx:'网桥1->上行',
         process:'23',
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
            title: '通道名称',
            dataIndex: 'cf',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '通道类型',
            dataIndex: 'jg',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '通道路径',
            dataIndex: 'jx',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '通道带宽（kb/s）',
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
                title="流量控制管理"
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
