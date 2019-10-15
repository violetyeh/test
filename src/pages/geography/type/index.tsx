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
       id: 'ZXX032',
       hj:'冷冻箱',
       mc:'40',
       bs:'120',
       bcy:'2019年9月5日',
       state: 1,
    },
    {
        id: 'ZXX049',
        hj:'重箱',
        mc:'20',
        bs:'80',
        bcy:'2019年9月4日',
        state: 1,
     },
     {
        id: 'ZXX036',
        hj:'空箱',
        mc:'45',
        bs:'74',
        bcy:'2019年9月3日',
        state: 1,
     },
     {
        id: 'ZXX047',
        hj:'危险品',
        mc:'40',
        bs:'56',
        bcy:'2019年9月2日',
        state: 1,
     },
     {
        id: 'ZXX022',
        hj:'冷冻箱',
        mc:'20',
        bs:'110',
        bcy:'2019年9月1日',
        state: 1,
     },
     {
        id: 'ZXX047',
        hj:'危险品',
        mc:'45',
        bs:'74',
        bcy:'2019年9月7日',
        state: 1,
     },
     {
        id: 'ZXX036',
        hj:'重箱',
        mc:'40',
        bs:'86',
        bcy:'2019年9月8日',
        state: 1,
     },
     {
        id: 'ZXX012',
        hj:'空箱',
        mc:'20',
        bs:'112',
        bcy:'2019年9月6日',
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
            title: '尺寸',
            dataIndex: 'mc',
            render: (text) => <Tag color="green">{text}</Tag>,
            
        },
        {
            title: '类型',
            dataIndex: 'hj',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        
        {
            title: '进口总数',
            dataIndex: 'bs',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '靠泊日期',
            dataIndex: 'bcy',
            render: (text) => <Tag color="purple">{text}</Tag>,
        },
        {
            title: '是否中转',
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
                title="卸船箱数"
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
