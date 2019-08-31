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
        id: 'JLGC-01',
        sp:'施工监理工程00',
        shijian:'桩基',
        biaozhun:'备案中',
        process: 63,
        status: '启用',
    },
    {
        id: 'JLGC-02',
        sp:'施工监理工程02',
        shijian:'基坑',
        biaozhun:'备案中',
        process: 54,
        status: '启用',
    },
    {
        id: 'JLGC-03',
        sp:'施工监理工程01',
        shijian:'基础',
        biaozhun:'已备案',
        process: 100,
        status: '启用',
    },
    {
        id: 'JLGC-04',
        sp:'施工监理工程05',
        shijian:'主体',
        biaozhun:'备案中',
        process: 5,
        status: '启用',
    },
    {
        id: 'JLGC-05',
        sp:'施工监理工程01',
        shijian:'装饰装修',
        biaozhun:'备案中',
        process: 16,
        status: '启用',
    },
    {
        id: 'JLGC-06',
        sp:'施工监理工程03',
        shijian:'施工准备',
        biaozhun:'未备案',
        process: 0,
        status: '启用',
    },
    {
        id: 'JLGC-07',
        sp:'施工监理工程05',
        shijian:'基坑',
        biaozhun:'已备案',
        process: 100,
        status: '启用',
    },
    {
        id: 'JLGC-08',
        sp:'施工监理工程03',
        shijian:'施工准备',
        biaozhun:'备案中',
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
            title: '编号',
            dataIndex: 'id',
        },
        {
            title: '单位工程',
            dataIndex: 'sp',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '当前阶段',
            dataIndex: 'shijian',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '备案情况',
            dataIndex: 'biaozhun',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '备案进度',
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
                title="施工监理管理"
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
