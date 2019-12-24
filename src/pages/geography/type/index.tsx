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
       mc:'检查玻璃体',
       bs:'正常眼',
       bcy:'2019年12月5日',
       state: 1,
    },
    {
        id: 'TZ00049',
        hj:'王梦洁',
        mc:'检查脉络膜',
        bs:'致密白内障',
        bcy:'2019年12月4日',
        state: 1,
     },
     {
        id: 'TZ00036',
        hj:'江云云',
        mc:'检查视神经',
        bs:'无晶体眼',
        bcy:'2019年12月3日',
        state: 1,
     },
     {
        id: 'TZ00047',
        hj:'刘艳',
        mc:'检查视网膜',
        bs:'正常眼',
        bcy:'2019年12月2日',
        state: 1,
     },
     {
        id: 'TZ00022',
        hj:'王梦洁',
        mc:'检查视神经',
        bs:'致密白内障',
        bcy:'2019年12月1日',
        state: 1,
     },
     {
        id: 'TZ00047',
        hj:'赵玲玲',
        mc:'检查视网膜',
        bs:'无晶体眼',
        bcy:'2019年12月7日',
        state: 1,
     },
     {
        id: 'TZ00036',
        hj:'张凤',
        mc:'检查脉络膜',
        bs:'致密白内障',
        bcy:'2019年12月8日',
        state: 1,
     },
     {
        id: 'TZ00012',
        hj:'赵玲玲',
        mc:'检查玻璃体',
        bs:'正常眼',
        bcy:'2019年12月6日',
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
            title: '检查类型',
            dataIndex: 'mc',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
            
        },
        {
            title: '检查人',
            dataIndex: 'hj',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        
        {
            title: 'A超结果',
            dataIndex: 'bs',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '通知时间',
            dataIndex: 'bcy',
            render: (text) => <Tag color="purple">{text}</Tag>,
        },
        {
            title: '检查完成',
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
                title="荧光造影信息"
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
