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
       id:'ZJ-001',
       cf:'254.76',
       jc:'3X:F0:49:8F:A5:39',
       dw:'组（254.88，254.123）',
       jg:'升级机器',
       jx:'42',
       status: '启用',
    },
    {
        id:'ZJ-002',
        cf:'254.88',
        jc:'5V:F0:19:8F:A5:Z4',
        dw:'节点<internet>IP<172.168.254.108>',
        jg:'TELNET管理器',
        jx:'52',
        status: '启用',
     },
     {
        id:'ZJ-003',
        cf:'254.36',
        jc:'9C:K0:49:8F:A5:50',
        dw:'节点<internet>IP<172.168.254.102>',
        jg:'升级机器',
        jx:'91',
        status: '启用',
     },
     {
        id:'ZJ-004',
        cf:'254.12',
        jc:'3C:F5:49:8F:G5:10',
        dw:'组（254.88，254.168）',
        jg:'TELNET管理器',
        jx:'63',
        status: '启用',
     },
     {
         id:'ZJ-005',
         cf:'254.52',
         jc:'6C:F0:49:8F:Q5:55',
         dw:'节点<internet>IP<172.168.254.321>',
         jg:'TELNET管理器',
         jx:'38',
         status: '启用',
      },
      {
         id:'ZJ-006',
         cf:'254.94',
         jc:'6Q:F0:49:8F:A5:74',
         dw:'节点<internet>IP<172.168.254.174>',
         jg:'升级机器',
         jx:'54',
         status: '启用',
      },
      {
        id:'ZJ-007',
        cf:'254.64',
        jc:'6C:F1:49:8Q:A5:C6',
        dw:'组（254.88，254.253）',
        jg:'GUI管理器',
        jx:'34',
        status: '启用',
     },
     {
         id:'ZJ-008',
         cf:'254.31',
         jc:'1C:F0:D9:8F:A5:96',
         dw:'节点<internet>IP<172.168.254.88>',
         jg:'GUI管理器',
         jx:'84',
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
            title: '对象名称',
            dataIndex: 'cf',
            render: (text) => <Tag color="black">{text}</Tag>,
        },
        
        {
            title: '描述',
            dataIndex: 'dw',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '防火墙物理地址',
            dataIndex: 'jc',
        },

        {
            title: '登录类型',
            dataIndex: 'jg',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '防火墙配置进度（%）',
            dataIndex: 'jx',
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
                title="防火墙配置管理"
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
