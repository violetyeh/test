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
        id:'DOS-004',
        cf:'192.168.1.025',
        dw:'16500pps(每秒数据包)',
        jg:'攻击审计-警报回放',
        jx:'上网行为的协议类别',
        process:'13',
        status: '启用',
     },
     {
         id:'DOS-005',
         cf:'192.168.1.63',
         dw:'12000pps(每秒数据包)',
         jg:'攻击审计-实时监控警报',
         jx:'MAC地址',
         process:'68',
         status: '启用',
      },
    {
        id:'DOS-006',
        cf:'192.168.1.41',
        dw:'45147pps(每秒数据包)',
        jg:'攻击审计-警报回放',
        jx:'上网行为的协议类别',
        process:'54',
        status: '启用',
     },
     {
       id:'DOS-007',
       cf:'192.168.1.08',
       dw:'56520pps(每秒数据包)',
       jg:'攻击审计-实时监控警报',
       jx:'用户（域认证或者系统本地认证）',
       process:'99',
       status: '启用',
    },
    {
        id:'DOS-008',
        cf:'192.168.1.12',
        dw:'23174pps(每秒数据包)',
        jg:'攻击审计-警报回放',
        jx:'上网行为的审计状态：报警，限制，正常',
        process:'46',
        status: '启用',
     },
    {
       id:'DOS-001',
       cf:'192.168.1.28',
       dw:'38321pps(每秒数据包)',
       jg:'攻击审计-实时监控警报',
       jx:'上网行为的审计状态：报警，限制，正常',
       process:'100',
       status: '启用',
    },
    {
        id:'DOS-002',
        cf:'192.168.1.36',
        dw:'46157pps(每秒数据包)',
        jg:'攻击审计-警报回放',
        jx:'上网行为的审计状态：报警，限制，正常',
        process:'88',
        status: '启用',
     },
     {
        id:'DOS-003',
        cf:'192.168.1.115',
        dw:'57214pps(每秒数据包)',
        jg:'攻击审计-实时监控警报',
        jx:'上网行为的协议类别',
        process:'79',
        status: '启用',
     },
     {
        id:'DOS-004',
        cf:'192.168.1.025',
        dw:'14256pps(每秒数据包)',
        jg:'攻击审计-警报回放',
        jx:'上网行为的协议类别',
        process:'46',
        status: '启用',
     },
     {
         id:'DOS-005',
         cf:'192.168.1.63',
         dw:'12000pps(每秒数据包)',
         jg:'攻击审计-实时监控警报',
         jx:'上网行为的审计状态：报警，限制，正常',
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
            title: 'IP地址',
            dataIndex: 'cf',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '操作',
            dataIndex: 'jg',
        },
        {
            title: '审计日志',
            dataIndex: 'jx',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '网卡捕包速度',
            dataIndex: 'dw',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '检查进度',
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
                title="攻击警报管理"
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
