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
       mc:'不能把易燃易爆等危险品携带上车。',
       bs:'G6001',
       bcy:'2019年9月5日',
       state: 1,
    },
    {
        id: 'TZ00049',
        hj:'王梦洁',
        mc:'特别注意检查自己的行李',
        bs:'G9998',
        bcy:'2019年9月4日',
        state: 1,
     },
     {
        id: 'TZ00036',
        hj:'江云云',
        mc:'不要在车厢连接处逗留',
        bs:'C1023',
        bcy:'2019年9月3日',
        state: 1,
     },
     {
        id: 'TZ00047',
        hj:'刘艳',
        mc:'不要再车厢里来回穿行',
        bs:'C1058',
        bcy:'2019年9月2日',
        state: 1,
     },
     {
        id: 'TZ00022',
        hj:'王梦洁',
        mc:'不能将废弃物扔出窗外，以免砸伤他人。',
        bs:'D5041',
        bcy:'2019年9月1日',
        state: 1,
     },
     {
        id: 'TZ00047',
        hj:'赵玲玲',
        mc:'乘车时，不要将头、手伸出窗外',
        bs:'Z5064',
        bcy:'2019年9月7日',
        state: 1,
     },
     {
        id: 'TZ00036',
        hj:'张凤',
        mc:'不能乱动车厢内的紧急制动阀和各种仪表，以免导致事故发生。',
        bs:'Z5073',
        bcy:'2019年9月8日',
        state: 1,
     },
     {
        id: 'TZ00012',
        hj:'赵玲玲',
        mc:'倒热水时不要过满，以免列车晃动热水溅出后烫伤人。',
        bs:'T4901',
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
            title: '通知编号',
            dataIndex: 'id',
        },
        {
            title: '通知事件',
            dataIndex: 'mc',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
            
        },
        {
            title: '播报人',
            dataIndex: 'hj',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        
        {
            title: '车次',
            dataIndex: 'bs',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '通知时间',
            dataIndex: 'bcy',
            render: (text) => <Tag color="purple">{text}</Tag>,
        },
        {
            title: '通报完成',
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
                title="乘车常识通报管理"
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
