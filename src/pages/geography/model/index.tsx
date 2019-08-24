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
        id:'SJ-04',
        cf:'192.168.1.025',
        dw:'2019年8月24日10:22:29',
        jg:'SSH',
        jx:'ADMIN',
        process:'13',
        status: '启用',
        ml:'[root@centos - ]#net',
     },
     {
         id:'SJ-05',
         cf:'192.168.1.63',
         dw:'2019年8月23日07:49:48',
         jg:'RDP',
         jx:'TEST',
         process:'68',
         status: '启用',
         ml:'[root@centos - ]#les',
      },
    {
        id:'SJ-06',
        cf:'192.168.1.41',
        dw:'2019年8月23日08:47:52',
        jg:'SSH',
        jx:'ADMIN',
        process:'54',
        status: '启用',
        ml:'[root@centos - ]#as~lm',
     },
     {
       id:'SJ-07',
       cf:'192.168.1.08',
       dw:'2019年8月22日20:57:57',
       jg:'RDP',
       jx:'ADMIN',
       process:'99',
       status: '启用',
       ml:'[root@centos - ]#le~az',
    },
    {
        id:'SJ-08',
        cf:'192.168.1.12',
        dw:'2019年8月21日14:37:03',
        jg:'SSH',
        jx:'TEST',
        process:'46',
        status: '启用',
        ml:'[root@centos - ]#ps~es',
     },
    {
       id:'SJ-01',
       cf:'192.168.1.28',
       dw:'2019年8月20日11:56:08',
       jg:'RDP',
       jx:'TEST',
       process:'100',
       status: '启用',
       ml:'[root@centos - ]#ec',
    },
    {
        id:'SJ-02',
        cf:'192.168.1.36',
        dw:'2019年8月15日11:13:14',
        jg:'SSH',
        jx:'TEST',
        process:'88',
        status: '启用',
        ml:'[root@centos - ]#ext',
     },
     {
        id:'SJ-03',
        cf:'192.168.1.115',
        dw:'2019年7月24日10:23:19',
        jg:'RDP',
        jx:'ADMIN',
        process:'79',
        status: '启用',
        ml:'[root@centos - ]#ls',
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
            title: '主机IP地址',
            dataIndex: 'cf',
        },
        {
            title: '命令',
            dataIndex: 'ml',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '登录方式',
            dataIndex: 'jg',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '登录用户',
            dataIndex: 'jx',
        },
        {
            title: '登录时间',
            dataIndex: 'dw',
        },
        {
            title: '审计进度',
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
                title="审计管理"
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
