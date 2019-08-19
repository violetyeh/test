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
       id: 'SJ-JF-0121',
       mc:'普通电脑',
       gg:'3',
       hz:'75',
       yy:'+3',
       jd:98,
       state: 1,
    },
    {
        id: 'SJ-JF-0122',
        mc:'电竞用电脑',
        gg:'5',
        hz:'8',
        yy:'-1',
        jd:100,
        state: 1,
     },
     {
        id: 'SJ-JF-0123',
        mc:'电竞用电脑',
        gg:'5',
        hz:'17',
        yy:'0',
        jd:56,
        state: 1,
     },
     {
        id: 'SJ-JF-0124',
        mc:'普通电脑',
        gg:'3',
        hz:'77',
        yy:'+9',
        jd:74,
        state: 1,
     },
     {
        id: 'SJ-JF-0125',
        mc:'电竞用电脑',
        gg:'5',
        hz:'60',
        yy:'-2',
        jd:95,
        state: 1,
     },
     {
        id: 'SJ-JF-0126',
        mc:'包房电脑',
        gg:'10',
        hz:'75',
        yy:'+1',
        jd:76,
        state: 1,
     },
     {
        id: 'SJ-JF-0127',
        mc:'电竞用电脑',
        gg:'5',
        hz:'75',
        yy:'+6',
        jd:100,
        state: 1,
     },
     {
        id: 'SJ-JF-0128',
        mc:'普通电脑',
        gg:'3',
        hz:'80',
        yy:'+3',
        jd:88,
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
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '电脑类别',
            dataIndex: 'mc',
            render: (text) => <Tag color="#AA2222">{text}</Tag>,
        },
        {
            title: '计费（小时/元）',
            dataIndex: 'gg',
        },
        {
            title: '上机实时数量',
            dataIndex: 'hz',
        },
        {
            title: '每小时用户变化量(人数)',
            dataIndex: 'yy',
        },
        
        {
            title: '上机占比',
            dataIndex: 'jd',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="空闲中" unCheckedChildren="上机中" />,
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
                title="订单计费管理"
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
