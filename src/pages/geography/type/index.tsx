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
        mc:'配置方案0',
        gg:'2',
        hz:'1020（MB）',
        jd:'60G',
        state: 1,
        sl:'6',
     },
     {
        id: 'NET-007',
        mc:'配置方案1',
        gg:'1',
        hz:'512（MB）',
        jd:'50G',
        state: 1,
        sl:'3',
     },
     {
        id: 'NET-008',
        mc:'配置方案2',
        gg:'2',
        hz:'200（MB）',
        jd:'80G',
        state: 1,
        sl:'2',
     }, 
    {
       id: 'NET-001',
       mc:'配置方案3',
       gg:'1',
       hz:'1082（MB）',
       jd:'120G',
       state: 1,
       sl:'5',
    },
    {
        id: 'NET-002',
        mc:'配置方案4',
        gg:'3',
        hz:'512（MB）',
        jd:'100G',
        state: 1,
        sl:'6',
     },
     {
        id: 'NET-003',
        mc:'配置方案5',
        gg:'1',
        hz:'262（MB）',
        jd:'50G',
        state: 1,
        sl:'3',
     },
     {
        id: 'NET-004',
        mc:'配置方案6',
        gg:'2',
        hz:'168（MB）',
        jd:'55G',
        state: 1,
        sl:'2',
     },
     {
        id: 'NET-005',
        mc:'配置方案7',
        gg:'1',
        hz:'192（MB）',
        jd:'50G',
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
            title: '方案名称',
            dataIndex: 'mc',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: 'CPU(个)',
            dataIndex: 'gg',
        },
        {
            title: '内存（MB）',
            dataIndex: 'hz',
        },
        {
            title: '硬盘（G）',
            dataIndex: 'jd',
        },
        {
            title: '网卡（个）',
            dataIndex: 'sl',
        },
        {
            title: '配置状态',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="配置成功" unCheckedChildren="配置失败" />,
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
                title="云主机配置管理"
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
