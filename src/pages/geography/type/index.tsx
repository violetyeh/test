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
       id: 'VG10651',
       zc:'local 7 local 9',
       zhonglei:'0',
       mingcheng:'3',
       songjian:'1',
       shengchan:'2',
       chandi:'1.91T',
       process:50,
    },
    {
        id: 'VG10652',
        zc:'local 0 local 2 local 8',
        zhonglei:'3',
        mingcheng:'5',
        songjian:'1',
        shengchan:'7',
        chandi:'2.28T',
        process:70,
     },
     {
        id: 'VG10653',
        zc:'local 0 local 3 local 6',
        zhonglei:'1',
        mingcheng:'3',
        songjian:'6',
        shengchan:'5',
        chandi:'1.19T',
        process:90,
     },
     {
        id: 'VG10654',
        zc:'local 0 local 2 ',
        zhonglei:'2',
        mingcheng:'0',
        songjian:'6',
        shengchan:'8',
        chandi:'0.96T',
        process:99,
     },
     {
        id: 'VG10655',
        zc:'local 2 local 8',
        zhonglei:'3',
        mingcheng:'7',
        songjian:'2',
        shengchan:'4',
        chandi:'3.06T',
        process:50,
     },
     {
        id: 'VG10656',
        zc:'local 1 local 6 local 5',
        zhonglei:'5',
        mingcheng:'5',
        songjian:'3',
        shengchan:'6',
        chandi:'2.28T',
        process:60,
     },
     {
        id: 'VG10657',
        zc:' local 6 local 5',
        zhonglei:'0',
        mingcheng:'2',
        songjian:'6',
        shengchan:'3',
        chandi:'2.26T',
        process:43,
     },
     {
        id: 'VG10658',
        zc:'local 1  local 5',
        zhonglei:'3',
        mingcheng:'0',
        songjian:'3',
        shengchan:'9',
        chandi:'3.30T',
        process:22,
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
            title: '卷组名',
            dataIndex: 'id',
            render: (text) => <Tag color="#FF7777">{text}</Tag>,
        },
        {
            title: '磁盘组成',
            dataIndex: 'zc',
            render: (text) => <Tag color="#FF0000">{text}</Tag>,
        },
        {
            title: '所属控制器',
            dataIndex: 'zhonglei',
        },
        {
            title: '阵列个数',
            dataIndex: 'mingcheng',
        },
        {
            title: '逻辑卷个数',
            dataIndex: 'songjian',
        },
        {
            title: '快照计划个数',
            dataIndex: 'shengchan',
        },
        {
            title: '总空间',
            dataIndex: 'chandi',
            render: (text) => <Tag color="#AA2222">{text}</Tag>,
        },
        
        {
            title: '空间利用率',
            dataIndex: 'process',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
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
                title="卷组详细信息"
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
