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
       id: 'ticketNO00032',
       hj:'合川',
       mc:'busNO19',
       bs:'江津',
       bcy:'2019年9月5日',
       state: 1,
    },
    {
        id: 'ticketNO00049',
        hj:'永川',
        mc:'busNO18',
        bs:'合川',
        bcy:'2019年9月4日',
        state: 1,
     },
     {
        id: 'ticketNO00036',
        hj:'江津',
        mc:'busNO17',
        bs:'永川',
        bcy:'2019年9月3日',
        state: 1,
     },
     {
        id: 'ticketNO00047',
        hj:'长沙',
        mc:'busNO16',
        bs:'成都',
        bcy:'2019年9月2日',
        state: 1,
     },
     {
        id: 'ticketNO00022',
        hj:'重庆',
        mc:'busNO15',
        bs:'长沙',
        bcy:'2019年9月1日',
        state: 1,
     },
     {
        id: 'ticketNO00047',
        hj:'蒲元',
        mc:'busNO14',
        bs:'成都',
        bcy:'2019年9月7日',
        state: 1,
     },
     {
        id: 'ticketNO00036',
        hj:'汶川',
        mc:'busNO13',
        bs:'广谱',
        bcy:'2019年9月8日',
        state: 1,
     },
     {
        id: 'ticketNO00012',
        hj:'重庆',
        mc:'busNO12',
        bs:'成都',
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
            title: '车票编号',
            dataIndex: 'id',
        },
        {
            title: '汽车编号',
            dataIndex: 'mc',
            render: (text) => <Tag color="green">{text}</Tag>,
            
        },
        {
            title: '起始城市',
            dataIndex: 'hj',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        
        {
            title: '到达城市',
            dataIndex: 'bs',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '购票日期',
            dataIndex: 'bcy',
            render: (text) => <Tag color="purple">{text}</Tag>,
        },
        {
            title: '是否过期',
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
                title="车票信息管理"
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
