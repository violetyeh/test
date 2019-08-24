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
       id: 'BJ-NUMBER-01',
       zhonglei:'粮食收购许可申请',
       mingcheng:'马额镇土地局',
       songjian:'同意',
       shengchan:'孟娜',
       chandi:'不许可',
       riqi:'2019年7月09日',
       state: 1,
    },
    {
        id: 'BJ-NUMBER-02',
        zhonglei:'老年优待证申请',
        mingcheng:'三原县政府',
        songjian:'不同意',
        shengchan:'刘海波',
        chandi:'不受理',
        riqi:'2019年7月06日',
        state: 1,
     },
     {
        id: 'BJ-NUMBER-03',
        zhonglei:'政府投资项目审批申请',
        mingcheng:'马额镇土地局',
        songjian:'不同意',
        shengchan:'石桂艳',
        chandi:'不受理',
        riqi:'2019年6月11日',
        state: 1,
     },
     {
        id: 'BJ-NUMBER-04',
        zhonglei:'政府投资项目审批申请',
        mingcheng:'马额镇土地局',
        songjian:'同意',
        shengchan:'李琦',
        chandi:'不许可',
        riqi:'2019年6月30日',
        state: 1,
     },
     {
        id: 'BJ-NUMBER-05',
        zhonglei:'粮食收购许可申请',
        mingcheng:'马东村村委',
        songjian:'同意',
        shengchan:'陈云杰',
        chandi:'不许可',
        riqi:'2019年7月01日',
        state: 1,
     },
     {
        id: 'BJ-NUMBER-06',
        zhonglei:'粮食收购许可申请',
        mingcheng:'三原县土地局',
        songjian:'不同意',
        shengchan:'张玲',
        chandi:'不许可',
        riqi:'2019年7月13日',
        state: 1,
     },
     {
        id: 'BJ-NUMBER-07',
        zhonglei:'烟花爆竹经营许可申请',
        mingcheng:'三原县政府',
        songjian:'不同意',
        shengchan:'江米意',
        chandi:'不许可',
        riqi:'2019年7月11日',
        state: 1,
     },
     {
        id: 'BJ-NUMBER-08',
        zhonglei:'烟花爆竹经营许可申请',
        mingcheng:'三原县土地局',
        songjian:'同意',
        shengchan:'王思琪',
        chandi:'不受理',
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
            title: '办件号',
            dataIndex: 'id',
        },
        {
            title: '事项名称',
            dataIndex: 'zhonglei',
            render: (text) => <Tag color="black">{text}</Tag>,
        },
        {
            title: '所属部门',
            dataIndex: 'mingcheng',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '意见',
            dataIndex: 'songjian',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '监察负责人',
            dataIndex: 'shengchan',
        },
        {
            title: '异常状态',
            dataIndex: 'chandi',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '督办日期',
            dataIndex: 'riqi',
        },
        {
            title: '督办状态',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="已督办" unCheckedChildren="未督办" />,
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
                title="综合监察"
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
