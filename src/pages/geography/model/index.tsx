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
        id: 'ROOT-01',
        sp:'ROOT100',
        shijian:'Virtual Box',
        biaozhun:'BMC Server001',
        process: 63,
        status: '启用',
    },
    {
        id: 'ROOT-02',
        sp:'ROOT102',
        shijian:'Virtual Box',
        biaozhun:'BMC Server002',
        process: 54,
        status: '启用',
    },
    {
        id: 'ROOT-03',
        sp:'ROOT101',
        shijian:'Virtual PC',
        biaozhun:'BMC Server003',
        process: 10,
        status: '启用',
    },
    {
        id: 'ROOT-04',
        sp:'ROOT105',
        shijian:'VMware',
        biaozhun:'BMC Server004',
        process: 5,
        status: '启用',
    },
    {
        id: 'ROOT-05',
        sp:'ROOT101',
        shijian:'Virtual Box',
        biaozhun:'BMC Server005',
        process: 16,
        status: '启用',
    },
    {
        id: 'ROOT-06',
        sp:'ROOT103',
        shijian:'VMware',
        biaozhun:'BMC Server006',
        process: 60,
        status: '启用',
    },
    {
        id: 'ROOT-07',
        sp:'ROOT105',
        shijian:'Virtual PC',
        biaozhun:'BMC Server007',
        process: 40,
        status: '启用',
    },
    {
        id: 'ROOT-08',
        sp:'ROOT103',
        shijian:'KVM',
        biaozhun:'BMC Server008',
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
            title: '名称',
            dataIndex: 'id',
        },
        {
            title: '类型',
            dataIndex: 'sp',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '虚拟机平台',
            dataIndex: 'shijian',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: 'VM显示名称',
            dataIndex: 'biaozhun',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '存储占比',
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
                title="存储管理"
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
