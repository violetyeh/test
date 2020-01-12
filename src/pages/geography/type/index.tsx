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
       id: 'TZ00032',
       hj:'赵玲玲',
       mc:'PID程序2474',
       bs:'自动分离',
       bcy:'2020年01月5日',
       state: 1,
    },
    {
        id: 'TZ00049',
        hj:'王梦洁',
        mc:'PID程序4951',
        bs:'手动分离',
        bcy:'2020年01月4日',
        state: 1,
     },
     {
        id: 'TZ00036',
        hj:'江云云',
        mc:'PID程序5241',
        bs:'自动分离',
        bcy:'2020年01月3日',
        state: 1,
     },
     {
        id: 'TZ00047',
        hj:'刘艳',
        mc:'PID程序3625',
        bs:'自动分离',
        bcy:'2020年01月2日',
        state: 1,
     },
     {
        id: 'TZ00022',
        hj:'王梦洁',
        mc:'PID程序1245',
        bs:'自动分离',
        bcy:'2020年01月1日',
        state: 1,
     },
     {
        id: 'TZ00047',
        hj:'赵玲玲',
        mc:'PID程序6547',
        bs:'手动分离',
        bcy:'2020年01月7日',
        state: 1,
     },
     {
        id: 'TZ00036',
        hj:'张凤',
        mc:'PID程序3324',
        bs:'手动分离',
        bcy:'2020年01月8日',
        state: 1,
     },
     {
        id: 'TZ00012',
        hj:'赵玲玲',
        mc:'PID程序0214',
        bs:'自动分离',
        bcy:'2020年01月6日',
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
            title: '程序名称',
            dataIndex: 'mc',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
            
        },
        {
            title: '管理人',
            dataIndex: 'hj',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        
        {
            title: '分离控制',
            dataIndex: 'bs',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '程序启动时间',
            dataIndex: 'bcy',
            render: (text) => <Tag color="purple">{text}</Tag>,
        },
        {
            title: '程序完成',
            dataIndex: 'jl',
            render: () => <Switch checkedChildren="否" unCheckedChildren="是" />,
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
                title="程序管理"
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
