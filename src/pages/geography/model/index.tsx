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
        id: 'YIDS0191',
        lx: '二氧化硫检测',
        ren: '王思卡',
        js: '机器检测',
        process: 58,
        status: '启用',
    },
    {
        id: 'YIDS0123',
        lx: '过氧化氢检测',
        ren: '李乐',
        js: '机器检测',
        process: 79,
        status: '启用',
    },
    {
        id: 'YIDS0186',
        lx: '亚硝酸盐检测',
        ren: '赵钱',
        js: '人工检测',
        process: 66,
        status: '启用',
       
    },
    {
        id: 'YIDS0175',
        lx: '二氧化硫检测',
        ren: '王思卡',
        js: '机器检测',
        process: 14,
        status: '启用',
       
    },
    {
        id: 'YIDS0146',
        lx: '甲醇检测',
        ren: '王思卡',
        js: '机器检测',
        process: 47,
        status: '启用',
       
    },
    {
        id: 'YIDS0153',
        lx: '二氧化硫检测',
        ren: '王思卡',
        js: '机器检测',
        process: 83,
        status: '启用',
       
    },
    {
        id: 'YIDS0178',
        lx: '二氧化硫检测',
        ren: '王思卡',
        js: '机器检测',
        process: 85,
        status: '启用',
       
    },
    {
        id: 'YIDS0145',
        lx: '二氧化硫检测',
        ren: '王思卡',
        js: '机器检测',
        process: 65,
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
            title: '检测类型',
            dataIndex: 'lx',
        },
        {
            title: '检测负责人',
            dataIndex: 'ren',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '检测技术类型',
            dataIndex: 'js',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '检测进度',
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
                title="检测设置管理"
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
