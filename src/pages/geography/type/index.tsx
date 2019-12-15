import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Progress, Tooltip, Tag, Checkbox } from "antd";
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
        id: 'WLJK63125',
        mc:'大规模集中农村居民点',
        gg:'影像YINGX#8',
        hz:'1600',
        jd:95,
        state: 1,
        zd:'0.00',
        zdd:'1.00',
     },
    {
        id: 'WLJK63126',
        mc:'地基',
        gg:'影像YINGX#1',
        hz:'1300',
        jd:76,
        state: 1,
        zd:'1.00',
        zdd:'3.00',
     },
     {
        id: 'WLJK63127',
        mc:'建筑物',
        gg:'影像YINGX#2',
        hz:'1500',
        jd:100,
        state: 1,
        zd:'1.00',
        zdd:'2.00',
     },
     {
        id: 'WLJK63128',
        mc:'构筑物',
        gg:'影像YINGX#3',
        hz:'1600',
        jd:88,
        state: 1,
        zd:'2.00',
        zdd:'3.00',
     }, 
    {
       id: 'WLJK63121',
       mc:'广场',
       gg:'影像YINGX#4',
       hz:'1400',
       jd:98,
       state: 1,
       zd:'0.00',
       zdd:'2.00',
    },
    {
        id: 'WLJK63122',
        mc:'公园',
        gg:'影像YINGX#5',
        hz:'1500',
        jd:100,
        state: 1,
        zd:'1.00',
        zdd:'2.00',
     },
     {
        id: 'WLJK63123',
        mc:'住宅小区',
        gg:'影像YINGX#6',
        hz:' 1300',
        jd:56,
        state: 1,
        zd:'0.00',
        zdd:'1.00',
     },
     {
        id: 'WLJK63124',
        mc:'机场',
        gg:'影像YINGX#7',
        hz:'1200',
        jd:74,
        state: 1,
        zd:'1.00',
        zdd:'2.00',
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
            title: '提取状态',
            dataIndex: 'jz',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >提取中</Checkbox>
                </Fragment>
            ),
        },
       
        {
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '影像名称',
            dataIndex: 'gg',
        },
        {
            title: '影像类型',
            dataIndex: 'mc',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
       
       
        {
            title: '提取进度',
            dataIndex: 'jd',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '绑定状态',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="绑定" unCheckedChildren="未绑定" />,
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
                title="数据提取"
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
