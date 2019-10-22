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
       id: '渝C9SJ21',
       mc:'单联轴单轮',
       gg:'5420',
       hz:'否',
       yy:'300',
       jd:20,
       state: 1,
    },
    {
        id: '渝C8SJ22',
        mc:'三联轴单轮',
        gg:'5420',
        hz:'否',
        yy:'100',
        jd:10,
        state: 1,
     },
     {
        id: '渝C1J23',
        mc:'双联轴单轮',
        gg:'5120',
        hz:'是',
        yy:'200',
        jd:20,
        state: 1,
     },
     {
        id: '渝C1SJ24',
        mc:'三联轴双轮',
        gg:'2360',
        hz:'否',
        yy:'300',
        jd:10,
        state: 1,
     },
     {
        id: '渝C3SJ25',
        mc:'三联轴单轮',
        gg:'4800',
        hz:'否',
        yy:'200',
        jd:30,
        state: 1,
     },
     {
        id: '渝C2SJ26',
        mc:'单轴双轮',
        gg:'4200',
        hz:'否',
        yy:'100',
        jd:20,
        state: 1,
     },
     {
        id: '渝C1SJ27',
        mc:'双联轴双轮',
        gg:'6500',
        hz:'否',
        yy:'600',
        jd:20,
        state: 1,
     },
     {
        id: '渝C0SJ28',
        mc:'单轴单轮',
        gg:'5700',
        hz:'是',
        yy:'300',
        jd:30,
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
            title: '车牌号',
            dataIndex: 'id',
        },
        {
            title: '轴型',
            dataIndex: 'mc',
            render: (text) => <Tag color="#AA2222">{text}</Tag>,
        },
        {
            title: '车货总重（KG）',
            dataIndex: 'gg',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '是否计重完成',
            dataIndex: 'hz',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '总费用',
            dataIndex: 'yy',
            render: (text) => <Tag color="#AA2222">{text}</Tag>,
        },
        
        {
            title: '超重费用',
            dataIndex: 'jd',
            render: (text) => <Tag color="#AA2222">{text}</Tag>,
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
                title="计重收费"
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
