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
        id: '科目三',
        zhonglei:'学A132B9',
        mingcheng:'非计费模式',
        songjian:'宋教练',
        shengchan:'张玲',
        chandi:'28',
        riqi:'2019年7月13日',
        state: 1,
     },
     {
        id: '科目二',
        zhonglei:'学A10201',
        mingcheng:'非计费模式',
        songjian:'宋教练',
        shengchan:'江米意',
        chandi:'25',
        riqi:'2019年7月11日',
        state: 1,
     },
     {
        id: '科目二',
        zhonglei:'学A102BV',
        mingcheng:'计费模式',
        songjian:'李教练',
        shengchan:'王思琪',
        chandi:'20',
        riqi:'2019年7月14日',
        state: 1,
     },
    {
       id: '科目二',
       zhonglei:'学A10999',
       mingcheng:'非计费模式',
       songjian:'李教练',
       shengchan:'孟娜',
       chandi:'25',
       riqi:'2019年7月09日',
       state: 1,
    },
    {
        id: '科目二',
        zhonglei:'学A1078V',
        mingcheng:'计费模式',
        songjian:'宋教练',
        shengchan:'刘海波',
        chandi:'22',
        riqi:'2019年7月06日',
        state: 1,
     },
     {
        id: '科目三',
        zhonglei:'学A102B1',
        mingcheng:'计费模式',
        songjian:'宋教练',
        shengchan:'石桂艳',
        chandi:'21',
        riqi:'2019年6月11日',
        state: 1,
     },
     {
        id: '科目二',
        zhonglei:'学A10234',
        mingcheng:'非计费模式',
        songjian:'李教练',
        shengchan:'李琦',
        chandi:'25',
        riqi:'2019年6月30日',
        state: 1,
     },
     {
        id: '科目二',
        zhonglei:'学A15678',
        mingcheng:'计费模式',
        songjian:'李教练',
        shengchan:'陈云杰',
        chandi:'26',
        riqi:'2019年7月01日',
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
            title: '训练科目',
            dataIndex: 'id',
        },
        {
            title: '教练车牌号',
            dataIndex: 'zhonglei',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
       
        {
            title: '当前教练',
            dataIndex: 'songjian',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '当前驾驶员',
            dataIndex: 'shengchan',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '计时',
            dataIndex: 'chandi',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '开始时间',
            dataIndex: 'riqi',
        },

        {
            title: '当前模式',
            dataIndex: 'mingcheng',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
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
                title="车辆训练监控"
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
