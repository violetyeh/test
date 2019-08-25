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
        id:'zd094',
        cf:'192.168.1.025',
        dw:'2019年7月25日17:37:46',
        jg:'即时通讯',
        jx:'QQ',
        process:'13',
        status: '启用',
     },
     {
         id:'zd095',
         cf:'192.168.1.63',
         dw:'2019年8月05日13:47:40',
         jg:'网页提交',
         jx:'HTTP',
         process:'68',
         status: '启用',
      },
    {
        id:'zd096',
        cf:'192.168.1.41',
        dw:'2019年8月06日17:12:36',
        jg:'普通网页',
        jx:'HTTP',
        process:'54',
        status: '启用',
     },
     {
       id:'zd097',
       cf:'192.168.1.08',
       dw:'2019年8月17日11:47:31',
       jg:'即时通讯',
       jx:'QQ',
       process:'99',
       status: '启用',
    },
    {
        id:'zd098',
        cf:'192.168.1.12',
        dw:'2019年8月18日12:35:26',
        jg:'普通网页',
        jx:'HTTP',
        process:'46',
        status: '启用',
     },
    {
       id:'zd091',
       cf:'192.168.1.28',
       dw:'2019年8月19日13:08:21',
       jg:'网页提交',
       jx:'HTTP',
       process:'100',
       status: '启用',
    },
    {
        id:'zd092',
        cf:'192.168.1.36',
        dw:'2019年8月20日14:05:16',
        jg:'普通网页',
        jx:'HTTP',
        process:'88',
        status: '启用',
     },
     {
        id:'zd093',
        cf:'192.168.1.115',
        dw:'2019年8月21日15:43:11',
        jg:'网页提交',
        jx:'HTTP',
        process:'79',
        status: '启用',
     },
     {
        id:'zd094',
        cf:'192.168.1.025',
        dw:'2019年8月22日16:17:03',
        jg:'普通网页',
        jx:'HTTP',
        process:'46',
        status: '启用',
     },
     {
         id:'zd095',
         cf:'192.168.1.63',
         dw:'2019年8月23日17:29:51',
         jg:'即时通讯',
         jx:'QQ',
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
            title: 'WEB活动',
            dataIndex: 'jg',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: 'IP地址',
            dataIndex: 'cf',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '协议',
            dataIndex: 'jx',
            render: (text) => <Tag color="#000000">{text}</Tag>,
        },
        {
            title: '访问时间',
            dataIndex: 'dw',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '防护进度',
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
                title="WEB应用防护管理"
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
