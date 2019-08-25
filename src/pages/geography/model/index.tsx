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
        id:'ZY-ID06',
        cf:'36',
        cpu:'23',
        dw:'255.255.255.0',
        jg:'192.168.1.058',
        jx:'3021',
        status: '启用',
     },
     {
       id:'ZY-ID07',
       cf:'21',
       cpu:'6',
       dw:'255.255.255.1',
       jg:'192.168.1.067',
       jx:'3023',
       status: '启用',
    },
    {
        id:'ZY-ID08',
        cf:'36',
        cpu:'41',
        dw:'255.255.255.0',
        jg:'192.168.1.047',
        jx:'3026',
        status: '启用',
     },
    {
       id:'ZY-ID01',
       cf:'20',
       cpu:'25',
       dw:'255.255.255.2',
       jg:'192.168.1.036',
       jx:'3025',
       status: '启用',
    },
    {
        id:'ZY-ID02',
        cf:'14',
        cpu:'17',
        dw:'255.255.255.1',
        jg:'192.168.1.05',
        jx:'3024',
        status: '启用',
     },
     {
        id:'ZY-ID03',
        cf:'14',
        cpu:'5',
        dw:'255.255.255.0',
        jg:'192.168.1.021',
        jx:'3023',
        status: '启用',
     },
     {
        id:'ZY-ID04',
        cf:'25',
        cpu:'63',
        dw:'255.255.255.1',
        jg:'192.168.1.023',
        jx:'3022',
        status: '启用',
     },
     {
         id:'ZY-ID05',
         cf:'35',
         cpu:'20',
         dw:'255.255.255.0',
         jg:'192.168.1.108',
         jx:'3021',
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
            dataIndex: 'jg',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '内存',
            dataIndex: 'cf',
            render: (text) => <Progress percent={text} status="active" />,
        },
        {
            title: 'CPU',
            dataIndex: 'cpu',
            render: (text) => <Progress percent={text} status="active" />,
        },
        {
            title: '日志服务器',
            dataIndex: 'dw',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '内存上限（MB）',
            dataIndex: 'jx',
            render: (text) => <Tag color="blue">{text}</Tag>,
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
                title="资源池管理"
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
