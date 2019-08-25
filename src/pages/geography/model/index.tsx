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
        id:'AMM-01206',
        cf:'192.168.1.41',
        dw:'25',
        jg:'1500',
        jx:'#0 号防火墙',
        status: '启用',
     },
     {
       id:'AMM-01207',
       cf:'192.168.1.08',
       dw:'15',
       jg:'2000',
       jx:'#1 号防火墙',
       status: '启用',
    },
    {
        id:'AMM-01208',
        cf:'192.168.1.12',
        dw:'20',
        jg:'1500',
        jx:'#3 号防火墙志',
        status: '启用',
     },
    {
       id:'AMM-01201',
       cf:'192.168.1.28',
       dw:'25',
       jg:'2000',
       jx:'#3 号防火墙志',
       status: '启用',
    },
    {
        id:'AMM-01202',
        cf:'192.168.1.36',
        dw:'15',
        jg:'1500',
        jx:'#3 号防火墙志',
        status: '启用',
     },
     {
        id:'AMM-01203',
        cf:'192.168.1.115',
        dw:'20',
        jg:'2000',
        jx:'#2 号防火墙',
        status: '启用',
     },
     {
        id:'AMM-01204',
        cf:'192.168.1.025',
        dw:'25',
        jg:'1500',
        jx:'#0 号防火墙',
        status: '启用',
     },
     {
         id:'AMM-01205',
         cf:'192.168.1.63',
         dw:'20',
         jg:'2000',
         jx:'#1 号防火墙',
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
            title: '防火墙标识',
            dataIndex: 'jx',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: 'IP地址',
            dataIndex: 'cf',
        },
        {
            title: '僵死连接超时（秒）',
            dataIndex: 'dw',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '僵死连接最大数目',
            dataIndex: 'jg',
            render: (text) => <Tag color="green">{text}</Tag>,
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
                title="安全属性管理"
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
