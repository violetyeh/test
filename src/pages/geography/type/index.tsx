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
        mc:'eth0',
        gg:'虚拟存储口',
        hz:'192 . 168 . 1 . 106',
        jd:'202 . 106 . 0 . 157',
        state: 1,
        sl:'6',
     },
     {
        id: 'NET-007',
        mc:'eth1',
        gg:'管理口，数据通讯口',
        hz:'192 . 168 . 1 . 105',
        jd:'202 . 106 . 5 . 245',
        state: 1,
        sl:'3',
     },
     {
        id: 'NET-008',
        mc:'eth2',
        gg:'虚拟存储口',
        hz:'192 . 168 . 1 . 013',
        jd:'202 . 106 . 1 . 101',
        state: 1,
        sl:'2',
     }, 
    {
       id: 'NET-001',
       mc:'eth3',
       gg:'虚拟存储口',
       hz:'192 . 168 . 1 . 107',
       jd:'202 . 106 . 3 . 2',
       state: 1,
       sl:'5',
    },
    {
        id: 'NET-002',
        mc:'eth4',
        gg:'管理口，数据通讯口',
        hz:'192 . 168 . 1 . 15',
        jd:'202 . 106 . 0 . 0',
        state: 1,
        sl:'6',
     },
     {
        id: 'NET-003',
        mc:'eth5',
        gg:'管理口，数据通讯口',
        hz:' 192 . 168 . 1 . 12',
        jd:'202 . 106 . 3 . 5',
        state: 1,
        sl:'3',
     },
     {
        id: 'NET-004',
        mc:'eth6',
        gg:'虚拟存储口',
        hz:'192 . 168 . 1 . 1',
        jd:'202 . 106 . 1 . 10',
        state: 1,
        sl:'2',
     },
     {
        id: 'NET-005',
        mc:'eth7',
        gg:'管理口，数据通讯口',
        hz:'192 . 168 . 1 . 21',
        jd:'202 . 106 . 0 . 20',
        state: 1,
        sl:'6',
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
            title: '网口名称',
            dataIndex: 'mc',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '网口类型',
            dataIndex: 'gg',
        },
        {
            title: 'IP/子网掩码',
            dataIndex: 'hz',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '网关',
            dataIndex: 'jd',
        },
        {
            title: '网口数量',
            dataIndex: 'sl',
        },
        {
            title: '连接状态',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="连接正常" unCheckedChildren="连接异常" />,
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
                title="网络信息"
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
