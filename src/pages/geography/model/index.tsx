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
        id: 'PZ000BS0023',
        pinlv: '唯一性',
        date: '文档内容',
        model: 'RD-MIS 需求规格',
        type: 'RDMIS 配置数据获取2019-08-11',
        process: 87,
        status: '启用',
    },
    {
        id: 'PZ000BS0036',
        pinlv: '可追溯性',
        date: '版本号',
        model: 'RD-MIS 概要设计',
        type: 'RDMIS 配置数据获取2019-07-04',
        process: 65,
        status: '启用',
    },
    {
        id: 'PZ000BS0015',
        pinlv: '容易记忆',
        date: '文档内容',
        model: 'RD-MIS 概要设计',
        type: 'RDMIS 配置数据获取2019-08-10',
        process: 71,
        status: '启用',
    },
    {
        id: 'PZ000BS0024',
        pinlv: '标识方法统一',
        date: '版本号',
        model: 'RD-MIS 概要设计',
        type: 'RDMIS 配置数据获取2019-08-02',
        process: 72,
        status: '启用',
    },
    {
        id: 'PZ000BS0039',
        pinlv: '容易区分不同配置项',
        date: '文档内容',
        model: 'RD-MIS 测试计划',
        type: 'RDMIS 配置数据获取2019-08-16',
        process: 13,
        status: '启用',
    },
    {
        id: 'PZ000BS0040',
        pinlv: '唯一性',
        date: '文档内容',
        model: 'RD-MIS 概要设计',
        type: 'RDMIS 配置数据获取2019-08-17',
        process: 44,
        status: '启用',
    },
    {
        id: 'PZ000BS0011',
        pinlv: '可追溯性',
        date: '项目名',
        model: 'RD-MIS 测试计划',
        type: 'RDMIS 配置数据获取2019-08-19',
        process: 38,
        status: '启用',
    },
    {
        id: 'PZ000BS0014',
        pinlv: '统一性',
        date: '组名',
        model: 'RD-MIS 概要设计',
        type: 'RDMIS 配置数据获取2019-08-19',
        process: 56,
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
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '配置原则',
            dataIndex: 'pinlv',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '配置标识信息',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '标识项目信息',
            dataIndex: 'model',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '标识撰写时间',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '配置大数据获取率',
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
                title="配置标识管理"
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
