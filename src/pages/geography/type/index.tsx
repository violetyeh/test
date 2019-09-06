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
       id: 'PL-9SJ21',
       mc:'2019-09-06',
       gg:'残疾座',
       hz:'否',
       yy:'3',
       jd:2,
       state: 1,
    },
    {
        id: 'PL-8SJ22',
        mc:'2019-09-07',
        gg:'二人座',
        hz:'否',
        yy:'1',
        jd:1,
        state: 1,
     },
     {
        id: 'PL-1J23',
        mc:'2019-09-07',
        gg:'靠卫生间',
        hz:'是',
        yy:'2',
        jd:2,
        state: 1,
     },
     {
        id: 'PL-1SJ24',
        mc:'2019-09-09',
        gg:'带桌板',
        hz:'否',
        yy:'3',
        jd:1,
        state: 1,
     },
     {
        id: 'PL-3SJ25',
        mc:'2019-09-08',
        gg:'三人座',
        hz:'否',
        yy:'2',
        jd:3,
        state: 1,
     },
     {
        id: 'PL-2SJ26',
        mc:'2019-09-06',
        gg:'二人座',
        hz:'否',
        yy:'1',
        jd:2,
        state: 1,
     },
     {
        id: 'PL-1SJ27',
        mc:'2019-09-07',
        gg:'靠过道',
        hz:'否',
        yy:'6',
        jd:2,
        state: 1,
     },
     {
        id: 'PL-0SJ28',
        mc:'2019-09-06',
        gg:'靠窗',
        hz:'是',
        yy:'3',
        jd:3,
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
            title: '票号',
            dataIndex: 'id',
        },
        {
            title: '出发时间',
            dataIndex: 'mc',
            render: (text) => <Tag color="#AA2222">{text}</Tag>,
        },
        {
            title: '座位属性',
            dataIndex: 'gg',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '是否已发车',
            dataIndex: 'hz',
        },
        {
            title: '购买票数',
            dataIndex: 'yy',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        
        {
            title: '手续费',
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
                title="票务信息管理"
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
