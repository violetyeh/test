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
        id: 'CL-00006',
        mc:'192.168.1.12',
        gg:'myoffice',
        hz:'伪IE下载',
        jd:76,
        state: 1,
        jk:'任意下行路径',
     },
     {
        id: 'CL-00003',
        mc:'192.168.1.71',
        gg:'any',
        hz:' 伪IE下载',
        jd:56,
        state: 1,
        jk:'任意上行路径',
     },
     {
        id: 'CL-00004',
        mc:'192.168.1.1',
        gg:'myoffice',
        hz:'P2P下载',
        jd:74,
        state: 1,
        jk:'任意上行路径',
     },
     {
        id: 'CL-00005',
        mc:'192.168.1.03',
        gg:'any',
        hz:'任意协议',
        jd:95,
        state: 1,
        jk:'任意上行路径',
     },
     {
        id: 'CL-00007',
        mc:'192.168.1.20',
        gg:'any',
        hz:'P2P下载',
        jd:100,
        state: 1,
        jk:'任意上行路径',
     },
     {
        id: 'CL-00008',
        mc:'192.168.1.15',
        gg:'myoffice',
        hz:'伪IE下载',
        jd:88,
        state: 1,
        jk:'任意下行路径',
     }, 
    {
       id: 'CL-00001',
       mc:'192.168.1.02',
       gg:'myoffice',
       hz:'P2P下载',
       jd:98,
       state: 1,
       jk:'任意上行路径',
    },
    {
        id: 'CL-00002',
        mc:'192.168.1.63',
        gg:'any',
        hz:'任意协议',
        jd:100,
        state: 1,
        jk:'任意下行路径',
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
            title: 'IP地址',
            dataIndex: 'mc',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '路径',
            dataIndex: 'jk',
           
        },
        {
            title: '内网地址',
            dataIndex: 'gg',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '协议',
            dataIndex: 'hz',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '配置进度',
            dataIndex: 'jd',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '流量状态',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="安全" unCheckedChildren="危险" />,
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
                title="策略组配置"
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
