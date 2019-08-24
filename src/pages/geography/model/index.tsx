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
        id:'IPID001',
        cf:'告警延时',
        dw:'201次',
        jg:'192.168.1.036',
        jx:'60min',
        status: '启用',
     },
     {
         id:'IPID002',
         cf:'限电时间',
         dw:'324次',
         jg:'192.168.1.05',
         jx:'30min',
         status: '启用',
      },
      {
         id:'IPID003',
         cf:'告警时间',
         dw:'336次',
         jg:'192.168.1.021',
         jx:'25min',
         status: '启用',
      },
      {
         id:'IPID004',
         cf:'通讯网络线路故障',
         dw:'211次',
         jg:'192.168.1.023',
         jx:'50min',
         status: '启用',
      },
      {
          id:'IPID005',
          cf:'告警延时时间',
          dw:'251次',
          jg:'192.168.1.108',
          jx:'30min',
          status: '启用',
       },
    {
        id:'IPID006',
        cf:'限电时间',
        dw:'241次',
        jg:'192.168.1.058',
        jx:'30min',
        status: '启用',
     },
     {
       id:'IPID007',
       cf:'告警时间',
       dw:'324次',
       jg:'192.168.1.067',
       jx:'50min',
       status: '启用',
    },
    {
        id:'IPID008',
        cf:'网络线路故障',
        dw:'420次',
        jg:'192.168.1.047',
        jx:'40min',
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
            title: '监测项目',
            dataIndex: 'cf',
        },
        {
            title: '终端地址',
            dataIndex: 'jg',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '抄收间隔时间',
            dataIndex: 'jx',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '抄收次数',
            dataIndex: 'dw',
            render: (text) => <Tag color="MAGENTA">{text}</Tag>,
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
                title="监测管理"
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
