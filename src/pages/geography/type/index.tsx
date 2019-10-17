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
       id: 'ID9SJ21',
       mc:'居民用水',
       gg:'5',
       hz:'否',
       yy:'3',
       jd:2,
       state: 1,
    },
    {
        id: 'ID8SJ22',
        mc:'工业用水',
        gg:'3.7',
        hz:'是',
        yy:'1',
        jd:1,
        state: 1,
     },
     {
        id: 'ID1J23',
        mc:'工业用水',
        gg:'3.7',
        hz:'是',
        yy:'2',
        jd:2,
        state: 1,
     },
     {
        id: 'ID1SJ24',
        mc:'居民用水',
        gg:'3.7',
        hz:'是',
        yy:'3',
        jd:1,
        state: 1,
     },
     {
        id: 'ID3SJ25',
        mc:'工业用水',
        gg:'6',
        hz:'否',
        yy:'2',
        jd:1,
        state: 1,
     },
     {
        id: 'ID2SJ26',
        mc:'居民用水',
        gg:'3.7',
        hz:'是',
        yy:'1',
        jd:2,
        state: 1,
     },
     {
        id: 'ID1SJ27',
        mc:'工业用水',
        gg:'3.7',
        hz:'是',
        yy:'1',
        jd:2,
        state: 1,
     },
     {
        id: 'ID0SJ28',
        mc:'居民用水',
        gg:'3.7',
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
            title: '水费编号',
            dataIndex: 'id',
        },
        {
            title: '水费类型名称',
            dataIndex: 'mc',
            render: (text) => <Tag color="#AA2222">{text}</Tag>,
        },
        {
            title: '基本水价',
            dataIndex: 'gg',
        },
        {
            title: '是否正常',
            dataIndex: 'hz',
        },
        {
            title: '排污费',
            dataIndex: 'yy',
        },
        
        {
            title: '附加费',
            dataIndex: 'jd',
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
                title="水费管理"
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
