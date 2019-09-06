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
       id: '科目一报审',
       zhonglei:'C2',
       mingcheng:'已审核',
       songjian:'否',
       shengchan:'孟娜',
       chandi:'女',
       riqi:'2019年7月09日',
       state: 1,
    },
    {
        id: '科目二报审',
        zhonglei:'C1',
        mingcheng:'待批',
        songjian:'是',
        shengchan:'刘海波',
        chandi:'男',
        riqi:'2019年7月06日',
        state: 1,
     },
     {
        id: '科目三报审',
        zhonglei:'C1',
        mingcheng:'待批',
        songjian:'是',
        shengchan:'石桂艳',
        chandi:'男',
        riqi:'2019年6月11日',
        state: 1,
     },
     {
        id: '科目一报审',
        zhonglei:'C1',
        mingcheng:'已审核',
        songjian:'否',
        shengchan:'李琦',
        chandi:'女',
        riqi:'2019年6月30日',
        state: 1,
     },
     {
        id: '科目二报审',
        zhonglei:'C2',
        mingcheng:'待批',
        songjian:'否',
        shengchan:'陈云杰',
        chandi:'女',
        riqi:'2019年7月01日',
        state: 1,
     },
     {
        id: '科目三报审',
        zhonglei:'C2',
        mingcheng:'已审核',
        songjian:'是',
        shengchan:'张玲',
        chandi:'女',
        riqi:'2019年7月13日',
        state: 1,
     },
     {
        id: '科目一报审',
        zhonglei:'C1',
        mingcheng:'已审核',
        songjian:'是',
        shengchan:'江米意',
        chandi:'女',
        riqi:'2019年7月11日',
        state: 1,
     },
     {
        id: '科目二报审',
        zhonglei:'C1',
        mingcheng:'待批',
        songjian:'否',
        shengchan:'王思琪',
        chandi:'男',
        riqi:'2019年7月14日',
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
            title: '申请类型',
            dataIndex: 'id',
        },
        {
            title: '学驾类型',
            dataIndex: 'zhonglei',
            render: (text) => <Tag color="black">{text}</Tag>,
        },
       
        {
            title: '是否应急',
            dataIndex: 'songjian',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '学员姓名',
            dataIndex: 'shengchan',
        },
        {
            title: '性别',
            dataIndex: 'chandi',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '申请日期',
            dataIndex: 'riqi',
        },

        {
            title: '核实状态',
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
                title="培训记录申请"
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
