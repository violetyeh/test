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
        id: '1',
        mingcheng:'猪肉（肉类）',
        hg:98,
        jcy:'陈州',
        state: 1,
     },
     {
         id: '2',
         mingcheng:'兔肉（肉类）',
         hg:100,
         jcy:'李梦琪',
         state: 1,
      },
    {
        id: '3',
        mingcheng:'茄子（蔬菜）',
        hg:100,
        jcy:'刘媛媛',
        state: 1,
     },
     {
        id: '4',
        mingcheng:'白菜（蔬菜）',
        hg:85,
        jcy:'李思思',
        state: 1,
     },
     {
        id: '5',
        mingcheng:'胡萝卜（蔬菜）',
        hg:90,
        jcy:'葛春',
        state: 1,
     },
     {
        id: '6',
        mingcheng:'鱼肉（肉类）',
        hg:100,
        jcy:'陈静婉',
        state: 1,
     },
     {
        id: '7',
        mingcheng:'鸭肉（肉类）',
        hg:98,
        jcy:'王天乐',
        state: 1,
     },
     {
        id: '8',
        mingcheng:'鸡肉（肉类）',
        hg:76,
        jcy:'陈真',
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
            title: '样品名称',
            dataIndex: 'mingcheng',
            render: (text) => <Tag color="#AA8888">{text}</Tag>,
        },
        {
            title: '检测员',
            dataIndex: 'jcy',
            render: (Text) => <Tag color="#ff0000">{Text}</Tag>
        },
        {
            title: '合格率',
            dataIndex: 'hg',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '合格情况',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="合格" unCheckedChildren="不合格" />,
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
                title="检测分析数据管理"
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
