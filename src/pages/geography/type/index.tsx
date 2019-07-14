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
       bcy:'高品质',
       state: 1,
    },
    {
        id: 'YM02149',
        hj:'否',
        mc:'自动显示菜单',
        bs:'100%',
        bcy:'低品质',
        state: 1,
     },
     {
        id: 'YM02136',
        hj:'是',
        mc:'点击显示菜单',
        bs:'默认',
        bcy:'高品质',
        state: 1,
     },
     {
        id: 'YM02147',
        hj:'人工操作',
        mc:'默认',
        bs:'100%',
        bcy:'低品质',
        state: 1,
     },
     {
        id: 'YM02122',
        hj:'是',
        mc:'默认显示菜单',
        bs:'120%',
        bcy:'低品质',
        state: 1,
     },
     {
        id: 'YM02147',
        hj:'是',
        mc:'点击显示菜单',
        bs:'110%',
        bcy:'高品质',
        state: 1,
     },
     {
        id: 'YM02136',
        hj:'否',
        mc:'默认',
        bs:'80%',
        bcy:'低品质',
        state: 1,
     },
     {
        id: 'YM02112',
        hj:'是',
        mc:'点击显示菜单',
        bs:'默认',
        bcy:'低品质',
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
            title: '自动播放',
            dataIndex: 'hj',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '完整菜单',
            dataIndex: 'mc',
            render: (text) => <Tag color="green">{text}</Tag>,
            
        },
        {
            title: '视窗模式',
            dataIndex: 'bs',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '品质',
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
                title="页面数据设置"
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
