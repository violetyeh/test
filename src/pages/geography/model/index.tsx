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
        id:'WLZD-001',
        cf:'192.168.1.28',
        dw:'38/tcp',
        jg:'3000',
        jx:'2301',
        process:'85',
        status: '启用',
        zt:'正常',
     },
     {
         id:'WLZD-002',
         cf:'192.168.1.36',
         dw:'46/tcp',
         jg:'1527',
         jx:'1527',
         process:'100',
         status: '启用',
         zt:'异常',
      },
      {
         id:'WLZD-003',
         cf:'192.168.1.115',
         dw:'57/tcp',
         jg:'1300',
         jx:'1209',
         process:'79',
         status: '启用',
         zt:'正常',
      },
      {
         id:'WLZD-004',
         cf:'192.168.1.025',
         dw:'16/tcp',
         jg:'1423',
         jx:'1324',
         process:'86',
         status: '启用',
         zt:'正常',
      },
      {
          id:'WLZD-005',
          cf:'192.168.1.63',
          dw:'06/tcp',
          jg:'1155',
          jx:'1021',
          process:'74',
          status: '启用',
          zt:'异常',
       },
    {
        id:'WLZD-006',
        cf:'192.168.1.41',
        dw:'45/tcp',
        jg:'1302',
        jx:'1201',
        process:'89',
        status: '启用',
        zt:'正常',
     },
     {
       id:'WLZD-007',
       cf:'192.168.1.08',
       dw:'56/tcp',
       jg:'1365',
       jx:'1298',
       process:'99',
       status: '启用',
       zt:'正常',
    },
    {
        id:'WLZD-008',
        cf:'192.168.1.12',
        dw:'23/tcp',
        jg:'1456',
        jx:'1308',
        process:'78',
        status: '启用',
        zt:'异常',
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
            title: '终端地址',
            dataIndex: 'cf',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '所有终端数量',
            dataIndex: 'jg',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '在线终端数量',
            dataIndex: 'jx',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '端口号',
            dataIndex: 'dw',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '在线比例',
            dataIndex: 'process',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        
        },
        {
            title: '终端状态',
            dataIndex: 'zt',
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
                title="网络终端管理"
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
