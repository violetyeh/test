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
        id: 'CHUAN-006',
        mc:'HIABAI00',
        gg:'70.0m',
        hz:'10.0m',
        jd:'6.0m',
        state: 1,
        sl:'6',
     },
     {
        id: 'CHUAN-007',
        mc:'HIABAI01',
        gg:'100.0m',
        hz:'10.0m',
        jd:'5.0m',
        state: 1,
        sl:'3',
     },
     {
        id: 'CHUAN-008',
        mc:'HIABAI02',
        gg:'200.0m',
        hz:'50.0m',
        jd:'8.0m',
        state: 1,
        sl:'2',
     }, 
    {
       id: 'CHUAN-001',
       mc:'HIABAI03',
       gg:'130.0m',
       hz:'20.0m',
       jd:'12.0m',
       state: 1,
       sl:'5',
    },
    {
        id: 'CHUAN-002',
        mc:'HIABAI04',
        gg:'123',
        hz:'51.0m',
        jd:'10.0m',
        state: 1,
        sl:'6',
     },
     {
        id: 'CHUAN-003',
        mc:'HIABAI05',
        gg:'80.0m',
        hz:'26.0m',
        jd:'5.0m',
        state: 1,
        sl:'3',
     },
     {
        id: 'CHUAN-004',
        mc:'HIABAI06',
        gg:'66.0m',
        hz:'16.0m',
        jd:'5.0m',
        state: 1,
        sl:'2',
     },
     {
        id: 'CHUAN-005',
        mc:'HIABAI07',
        gg:'72.0m',
        hz:'19.0m',
        jd:'4.0m',
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
            title: '船名',
            dataIndex: 'mc',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '船长',
            dataIndex: 'gg',
        },
        {
            title: '船宽',
            dataIndex: 'hz',
        },
        {
            title: '吃水',
            dataIndex: 'jd',
        },
       
        {
            title: '状态',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="可用" unCheckedChildren="不可用" />,
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
                title="本船详细信息"
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
