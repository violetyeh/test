import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Card, Switch, Divider, message, Badge, Tag, Progress } from "antd";
import Search from "./Search";
import Save from "./Save";
import styles from "../style.less";

interface ModelProps {

}

interface ModelState {
    saveVisible: boolean,
    data: any[],
    currentItem: any,
}

const mockData = [
    {
        id: 'http://localhost:8001/',
        sp:'0',
        shijian:'2',
        biaozhun:'10',
        jiance:'12',
        process: 88,
        status: '启用',
    },
    {
        id: 'http://localhost:8000/',
        sp:'2',
        shijian:'4',
        biaozhun:'6',
        jiance:'12',
        process: 99,
        status: '启用',
    },
    {
        id: 'http://localhost:8003/',
        sp:'1',
        shijian:'0',
        biaozhun:'13',
        jiance:'14',
        process: 5,
        status: '启用',
    },
    {
        id: 'http://localhost:8002/',
        sp:'5',
        shijian:'2',
        biaozhun:'8',
        jiance:'15',
        process: 95,
        status: '启用',
    },
    {
        id: 'http://localhost:8001/',
        sp:'1',
        shijian:'7',
        biaozhun:'3',
        jiance:'11',
        process: 100,
        status: '启用',
    },
    {
        id: 'http://localhost:8003/',
        sp:'3',
        shijian:'9',
        biaozhun:'6',
        jiance:'18',
        process: 60,
        status: '启用',
    },
    {
        id: 'http://localhost:8000/',
        sp:'5',
        shijian:'10',
        biaozhun:'5',
        jiance:'20',
        process: 40,
        status: '启用',
    },
    {
        id: 'http://localhost:8001/',
        sp:'3',
        shijian:'7',
        biaozhun:'6',
        jiance:'16',
        process: 30,
        status: '启用',
    },
   
    
]

class Model extends Component<ModelProps, ModelState>{
    state: ModelState = {
        saveVisible: false,
        data: mockData,
        currentItem: {},
    }

    columns: ColumnProps<any>[] = [
        {
            title: '位置',
            dataIndex: 'id',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '损坏盘数',
            dataIndex: 'sp',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '游离盘数',
            dataIndex: 'shijian',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '热备盘数',
            dataIndex: 'biaozhun',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '成员盘数',
            dataIndex: 'jiance',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        
        {
            title: '存储占比空间',
            dataIndex: 'process',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },

        {
            title: '是否启用',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="启用" unCheckedChildren="禁用" />,
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
                title="磁盘统计信息数据"
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

export default Model;
