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
       id: 'YM02132',
       hj:'是',
       mc:'默认',
       bs:'88%',
       bcy:'是',
       state: 1,
    },
    {
        id: 'YM02149',
        hj:'否',
        mc:'自动分析操作',
        bs:'100%',
        bcy:'否',
        state: 1,
     },
     {
        id: 'YM02136',
        hj:'是',
        mc:'点击分析操作',
        bs:'69%',
        bcy:'是',
        state: 1,
     },
     {
        id: 'YM02147',
        hj:'人工操作',
        mc:'默认',
        bs:'100%',
        bcy:'否',
        state: 1,
     },
     {
        id: 'YM02122',
        hj:'是',
        mc:'默认分析操作',
        bs:'89%',
        bcy:'否',
        state: 1,
     },
     {
        id: 'YM02147',
        hj:'是',
        mc:'点击分析操作',
        bs:'86%',
        bcy:'是',
        state: 1,
     },
     {
        id: 'YM02136',
        hj:'否',
        mc:'默认',
        bs:'80%',
        bcy:'否',
        state: 1,
     },
     {
        id: 'YM02112',
        hj:'是',
        mc:'点击分析操作',
        bs:'69%',
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
            title: '大数据自动采集',
            dataIndex: 'hj',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '分析设置',
            dataIndex: 'mc',
            render: (text) => <Tag color="green">{text}</Tag>,
            
        },
        {
            title: '采集分析进度',
            dataIndex: 'bs',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '采集是否完成',
            dataIndex: 'bcy',
            render: (text) => <Tag color="purple">{text}</Tag>,
        },
        {
            title: '数据采集',
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
                title="数据采集设置"
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
