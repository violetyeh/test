import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Progress, Tooltip, Tag, Checkbox } from "antd";
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
        id: 'NET-006',
        mc:'设备编号',
        gg:'主用端口',
        hz:'192 . 168 . 1 . 106',
        jd:'控制命令',
        state: 1,
     },
     {
        id: 'NET-007',
        mc:'终端配置容量信息码',
        gg:'备用IP地址',
        hz:'192 . 168 . 1 . 105',
        jd:'数据转发',
        state: 1,
     },
     {
        id: 'NET-008',
        mc:'终端通信规约',
        gg:'主用端口',
        hz:'192 . 168 . 1 . 013',
        jd:'自定义帧',
        state: 1,
     }, 
    {
       id: 'NET-001',
       mc:'终端硬件',
       gg:'备用端口',
       hz:'192 . 168 . 1 . 107',
       jd:'数据转发',
       state: 1,
    },
    {
        id: 'NET-002',
        mc:'设备编号',
        gg:'主用IP地址',
        hz:'192 . 168 . 1 . 15',
        jd:'自定义帧',
        state: 1,
     },
     {
        id: 'NET-003',
        mc:'终端规约信息',
        gg:'主用IP地址',
        hz:' 192 . 168 . 1 . 12',
        jd:'复位命令',
        state: 1,
     },
     {
        id: 'NET-004',
        mc:'终端硬件版本号',
        gg:'主用端口',
        hz:'192 . 168 . 1 . 1',
        jd:'控制命令',
        state: 1,
     },
     {
        id: 'NET-005',
        mc:'设备编号',
        gg:'主用IP地址',
        hz:'192 . 168 . 1 . 21',
        jd:'复位命令',
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
            title: '数据项',
            dataIndex: 'mc',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '数据内容',
            dataIndex: 'gg',
        },
        {
            title: '主站地址',
            dataIndex: 'hz',
        },
        {
            title: '功能选择',
            dataIndex: 'jd',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '是否在线',
            dataIndex: 'jk',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >是</Checkbox>
                </Fragment>
            ),
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
                title="数据内容管理"
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
