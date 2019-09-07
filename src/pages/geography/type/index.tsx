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
       id: 'ZZ-JC-0021',
       mc:'2019-09-01',
       gg:'未过期',
       hz:'未过期',
       yy:'不合格',
       jd:88,
       state: 1,
    },
    {
        id: 'ZZ-JC-0022',
        mc:'2019-09-02',
        gg:'已过期',
        hz:'未过期',
        yy:'合格',
        jd:100,
        state: 1,
     },
     {
        id: 'ZZ-JC-0023',
        mc:'2019-09-07',
        gg:'未过期',
        hz:'未过期',
        yy:'合格',
        jd:92,
        state: 1,
     },
     {
        id: 'ZZ-JC-0026',
        mc:'2019-09-06',
        gg:'未过期',
        hz:'未过期',
        yy:'合格',
        jd:72,
        state: 1,
     },
     {
        id: 'ZZ-JC-0027',
        mc:'2019-09-07',
        gg:'未过期',
        hz:'未过期',
        yy:'不合格',
        jd:62,
        state: 1,
     },
     {
        id: 'ZZ-JC-0028',
        mc:'2019-09-06',
        gg:'已过期',
        hz:'已过期',
        yy:'合格',
        jd:93,
        state: 1,
     },
     {
        id: 'ZZ-JC-0024',
        mc:'2019-09-09',
        gg:'已过期',
        hz:'已过期',
        yy:'不合格',
        jd:91,
        state: 1,
     },
     {
        id: 'ZZ-JC-0025',
        mc:'2019-09-08',
        gg:'未过期',
        hz:'未过期',
        yy:'不合格',
        jd:83,
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
            title: '检查时间',
            dataIndex: 'mc',
        },
        {
            title: '交强险',
            dataIndex: 'gg',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '商运险',
            dataIndex: 'hz',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '承运人险',
            dataIndex: 'yy',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        
        {
            title: '检查进度',
            dataIndex: 'jd', 
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
                title="证照检查信息"
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
