import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Progress, Tooltip, Tag } from "antd";
import styles from '../style.less';
import Search from "./Search";
import Save from "./Save";

interface TypeProps {

}

interface TypeState {
    saveVisible: boolean;
    data: any[];
    currentItem: any;
}

const mockData = [
    {
        id: 'FANG0023',
        mc:'石青高速公路',
        gg:'开挖至-5m（深5m）',
        hz:'15',
        jd:56,
        state: 1,
     },
    {
       id: 'FANG0027',
       mc:'石杨高速公路',
       gg:'在-4.4m（深4.4m）处加撑',
       hz:'10',
       jd:100,
       state: 1,
    },
    {
       id: 'FANG0028',
       mc:'桥鸿高速公路',
       gg:'开挖至-6m（深6m）',
       hz:'15',
       jd:88,
       state: 1,
    }, 
    
     {
        id: 'FANG0024',
        mc:'绕城高速公路',
        gg:'开挖至-6.1m（深6.1m）',
        hz:'20',
        jd:74,
        state: 1,
     },
     {
        id: 'FANG0025',
        mc:'跃进高速公路',
        gg:'拆除1支撑',
        hz:'20',
        jd:95,
        state: 1,
     },
     {
        id: 'FANG0026',
        mc:'新南高速公路',
        gg:'在-5m（深5m）处加撑',
        hz:'15',
        jd:76,
        state: 1,
     },
     {
        id: 'FANG0021',
        mc:'万寿高速公路',
        gg:'开挖至-6.6m（深6.6m）',
        hz:'15',
        jd:98,
        state: 1,
     },
     {
         id: 'FANG0022',
         mc:'五四高速公路',
         gg:'在-5.4m（深5.4m）处换撑',
         hz:'20',
         jd:100,
         state: 1,
      },

   
]

class Type extends Component<TypeProps, TypeState>{

    state: TypeState = {
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
            title: '高速公路名称',
            dataIndex: 'mc',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '工况状态',
            dataIndex: 'gg',
        },
        {
            title: '地面超载（Kpa）',
            dataIndex: 'hz',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '检测进度',
            dataIndex: 'jd',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '自动检测',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="自动" unCheckedChildren="手动" />,
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
        console.log(record, 'res');
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
                title="环境参数管理"
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

export default Type;
