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
        id: 'WLJK63126',
        mc:'192.168.1.12',
        gg:'不使用任何规则',
        hz:'重要',
        jd:76,
        state: 1,
     },
     {
        id: 'WLJK63127',
        mc:'192.168.1.20',
        gg:'网络安全规则',
        hz:'一般',
        jd:100,
        state: 1,
     },
     {
        id: 'WLJK63128',
        mc:'192.168.1.15',
        gg:'不使用任何规则',
        hz:'重要',
        jd:88,
        state: 1,
     }, 
    {
       id: 'WLJK63121',
       mc:'192.168.1.02',
       gg:'不使用任何规则',
       hz:'一般',
       jd:98,
       state: 1,
    },
    {
        id: 'WLJK63122',
        mc:'192.168.1.63',
        gg:'网络安全规则',
        hz:'不重要',
        jd:100,
        state: 1,
     },
     {
        id: 'WLJK63123',
        mc:'192.168.1.71',
        gg:'网络安全规则',
        hz:' 重要',
        jd:56,
        state: 1,
     },
     {
        id: 'WLJK63124',
        mc:'192.168.1.1',
        gg:'不使用任何规则',
        hz:'一般',
        jd:74,
        state: 1,
     },
     {
        id: 'WLJK63125',
        mc:'192.168.1.03',
        gg:'网络安全规则',
        hz:'不重要',
        jd:95,
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
            title: '监控状态',
            dataIndex: 'jk',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >监控</Checkbox>
                </Fragment>
            ),
        },
        {
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: 'IP地址',
            dataIndex: 'mc',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '所用规则',
            dataIndex: 'gg',
        },
        {
            title: '重点监控',
            dataIndex: 'hz',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '监控进度',
            dataIndex: 'jd',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '绑定状态',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="绑定" unCheckedChildren="未绑定" />,
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
                title="网络监控管理"
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
