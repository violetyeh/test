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
        mc:'12',
        gg:'PILE#1',
        hz:'1300',
        jd:76,
        state: 1,
        zd:'10.00',
     },
     {
        id: 'WLJK63127',
        mc:'20',
        gg:'PILE#2',
        hz:'1500',
        jd:100,
        state: 1,
        zd:'30.00',
     },
     {
        id: 'WLJK63128',
        mc:'15',
        gg:'PILE#3',
        hz:'1600',
        jd:88,
        state: 1,
        zd:'22.00',
     }, 
    {
       id: 'WLJK63121',
       mc:'20',
       gg:'PILE#4',
       hz:'1400',
       jd:98,
       state: 1,
       zd:'25.00',
    },
    {
        id: 'WLJK63122',
        mc:'25',
        gg:'PILE#5',
        hz:'1500',
        jd:100,
        state: 1,
        zd:'21.00',
     },
     {
        id: 'WLJK63123',
        mc:'17',
        gg:'PILE#6',
        hz:' 1300',
        jd:56,
        state: 1,
        zd:'20.00',
     },
     {
        id: 'WLJK63124',
        mc:'16',
        gg:'PILE#7',
        hz:'1200',
        jd:74,
        state: 1,
        zd:'21.00',
     },
     {
        id: 'WLJK63125',
        mc:'25',
        gg:'PILE#8',
        hz:'1600',
        jd:95,
        state: 1,
        zd:'20.00',
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
            title: '施工节点',
            dataIndex: 'gg',
        },
        {
            title: '监理费（万元）',
            dataIndex: 'mc',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
       
        {
            title: '施工面积（m²）',
            dataIndex: 'hz',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '高（m）',
            dataIndex: 'zd',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
       
        {
            title: '管控进度',
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
                title="综合管控"
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
