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
       id:'YY00100001',
       mc:'开发系统设计与实现001 ',
       cf:'192.168.1.28',
       jc:'6C:F0:49:8F:A5:39',
       dw:'38/tcp',
       jg:'运营状态出现BUG',
       jx:'否',
       status: '启用',
    },
    {
        id:'YY00100002',
        mc:'测试系统设计与实现001 ',
        cf:'192.168.1.36',
        jc:'7C:F0:19:8F:A5:Z4',
        dw:'46/tcp',
        jg:'运营状态良好',
        jx:'是',
        status: '启用',
     },
     {
        id:'YY00100003',
        mc:'开发系统设计与实现002 ',
        cf:'192.168.1.115',
        jc:'9C:K0:49:8F:A5:50',
        dw:'57/tcp',
        jg:'运营状态出现BUG',
        jx:'否',
        status: '启用',
     },
     {
        id:'YY00100004',
        mc:'测试系统设计与实现003 ',
        cf:'192.168.1.025',
        jc:'3C:F5:49:8F:G5:10',
        dw:'16/tcp',
        jg:'运营状态良好',
        jx:'否',
        status: '启用',
     },
     {
         id:'YY00100005',
         mc:'开发系统设计与实现 ',
         cf:'192.168.1.63',
         jc:'6C:F0:49:8F:Q5:55',
         dw:'06/tcp',
         jg:'运营状态出现BUG',
         jx:'是',
         status: '启用',
      },
      {
         id:'YY00100006',
         mc:'运营系统设计与实现 ',
         cf:'192.168.1.41',
         jc:'6Q:F0:49:8F:A5:74',
         dw:'45/tcp',
         jg:'运营状态良好',
         jx:'是',
         status: '启用',
      },
      {
        id:'YY00100007',
        mc:'测试软件系统设计与实现 ',
        cf:'192.168.1.08',
        jc:'6C:F1:49:8Q:A5:C6',
        dw:'56/tcp',
        jg:'运营状态出现BUG',
        jx:'否',
        status: '启用',
     },
     {
         id:'YY00100008',
         mc:'测试系统设计与实现 ',
         cf:'192.168.1.12',
         jc:'1C:F0:D9:8F:A5:96',
         dw:'23/tcp',
         jg:'运营状态良好',
         jx:'是',
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
            title: '开发项目名称',
            dataIndex: 'mc',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: 'IP地址',
            dataIndex: 'cf',
        },
        {
            title: 'MAC地址',
            dataIndex: 'jc',
        },
        {
            title: '端口',
            dataIndex: 'dw',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '状态',
            dataIndex: 'jg',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '报告是否提交',
            dataIndex: 'jx',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
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
                title="开发运营信息"
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
