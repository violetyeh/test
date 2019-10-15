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
        id: 'GDAO-006',
        mc:' 电能表',
        gg:' 自动',
        hz:' 16',
        jd:' 允许',
        state: 1,
     },
     {
        id: 'GDAO-007',
        mc:' DWS-8088',
        gg:' 自动',
        hz:' 10',
        jd:' 允许',
        state: 1,
     },
     {
        id: 'GDAO-008',
        mc:' MODEN',
        gg:' 遥控',
        hz:' 13',
        jd:' 允许',
        state: 1,
     }, 
    {
       id: 'GDAO-001',
       mc:' DMS-TRA',
       gg:' 遥控',
       hz:' 17',
       jd:' 禁止',
       state: 1,
    },
    {
        id: 'GDAO-002',
        mc:' 电能表',
        gg:' 自动',
        hz:' 15',
        jd:' 允许',
        state: 1,
     },
     {
        id: 'GDAO-003',
        mc:' DMS-TRA',
        gg:' 自动',
        hz:'  12',
        jd:' 允许',
        state: 1,
     },
     {
        id: 'GDAO-004',
        mc:' MODEN',
        gg:' 手动',
        hz:' 1',
        jd:' 禁止',
        state: 1,
     },
     {
        id: 'GDAO-005',
        mc:' DWS-8088',
        gg:' 遥控',
        hz:' 21',
        jd:' 允许',
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
            title: '设备名称',
            dataIndex: 'mc',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '转换开关',
            dataIndex: 'gg',
        },
        {
            title: '通道',
            dataIndex: 'hz',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '通道告警',
            dataIndex: 'jd',
        },
        {
            title: '输出状态',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="输出" unCheckedChildren="未输出" />,
        },
        {
            title: '设备自动巡检',
            dataIndex: 'jk',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >自动</Checkbox>
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
                title="设备管理"
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
