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
       id: 'SJ-YJ-FX-0032',
       hj:'是',
       mc:'默认',
       bs:'88',
       bcy:'是',
       state: 1,
    },
    {
        id: 'SJ-YJ-FX-0049',
        hj:'否',
        mc:'自动分析操作',
        bs:'100',
        bcy:'否',
        state: 1,
     },
     {
        id: 'SJ-YJ-FX-0036',
        hj:'是',
        mc:'点击分析操作',
        bs:'69',
        bcy:'是',
        state: 1,
     },
     {
        id: 'SJ-YJ-FX-0047',
        hj:'人工操作',
        mc:'默认',
        bs:'100',
        bcy:'否',
        state: 1,
     },
     {
        id: 'SJ-YJ-FX-0022',
        hj:'是',
        mc:'默认分析操作',
        bs:'89',
        bcy:'否',
        state: 1,
     },
     {
        id: 'SJ-YJ-FX-0047',
        hj:'是',
        mc:'点击分析操作',
        bs:'86',
        bcy:'是',
        state: 1,
     },
     {
        id: 'SJ-YJ-FX-0036',
        hj:'否',
        mc:'默认',
        bs:'80',
        bcy:'否',
        state: 1,
     },
     {
        id: 'SJ-YJ-FX-0012',
        hj:'是',
        mc:'点击分析操作',
        bs:'69',
        bcy:'否',
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
            title: '编号',
            dataIndex: 'id',
        },
        {
            title: '自动分析',
            dataIndex: 'hj',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '分析设置',
            dataIndex: 'mc',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
            
        },
        {
            title: '完成预警分析',
            dataIndex: 'bcy',
            render: (text) => <Tag color="PURPLE">{text}</Tag>,
        },
        {
            title: '分析进度',
            dataIndex: 'bs',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
       
        {
            title: '数据预警',
            dataIndex: 'jl',
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
                title="预警分析设置"
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
