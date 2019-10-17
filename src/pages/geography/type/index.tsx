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
        id: 'JCSJAA36',
        mingcheng:'385（KV/h）',
        hg:100,
        jcy:'陈静婉',
        state: 0.41,
     },
     {
        id: 'JCSJAA37',
        mingcheng:'364（KV/h）',
        hg:98,
        jcy:'王天乐',
        state: 0.56,
     },
     {
        id: 'JCSJAA38',
        mingcheng:'354（KV/h）',
        hg:76,
        jcy:'陈真',
        state: 0.34,
     },
    {
        id: 'JCSJAA31',
        mingcheng:'415（KV/h）',
        hg:98,
        jcy:'陈州',
        state: 0.51,
     },
     {
         id: 'JCSJAA32',
         mingcheng:'268（KV/h）',
         hg:100,
         jcy:'李梦琪',
         state: 0.74,
      },
    {
        id: 'JCSJAA33',
        mingcheng:'384（KV/h）',
        hg:100,
        jcy:'刘媛媛',
        state: 0.35,
     },
     {
        id: 'JCSJAA34',
        mingcheng:'416（KV/h）',
        hg:85,
        jcy:'李思思',
        state: 0.58,
     },
     {
        id: 'JCSJAA35',
        mingcheng:'302（KV/h）',
        hg:90,
        jcy:'葛春',
        state: 0.46,
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
            title: '加压泵三相电流',
            dataIndex: 'mingcheng',
            render: (Text) => <Tag color="#ff0000">{Text}</Tag>,
        },
        {
            title: '监测员',
            dataIndex: 'jcy',
            render: (text) => <Tag color="#AA8888">{text}</Tag>,
        },
        
        {
            title: '吨水耗电量（KV/h）',
            dataIndex: 'state',
        },
        {
            title: '监测进度',
            dataIndex: 'hg',
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
                title="电量监测"
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
