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
        date: '156',
        model: '办公',
        type: '中山大道',
        status: '启用',
        pinlv: '大厦',
        process: 3,
    },
    {
        id: 'YIDS2SI1',
        date: '35',
        model: '居住',
        type: '民豪街',
        status: '启用',
        pinlv: '小区',
        process: 8,
    },
    {
        id: 'YIDS0122',
        date: '20',
        model: '休闲',
        type: '双星大道',
        status: '启用',
        pinlv: '广场',
        process: 3,
    },
    {
        id: 'YIDS2S12',
        date: '42',
        model: '学习',
        type: '双星大道',
        status: '启用',
        pinlv: '学校',
        process: 8,
    },
    {
        id: 'YIDS01IOS',
        date: '66',
        model: '医疗',
        type: '双星大道',
        status: '启用',
        pinlv: '医院',
        process: 9,
    },
    {
        id: 'YSIW9s1',
        date: '84',
        model: '通行',
        type: '璧渝路',
        status: '启用',
        pinlv: '大桥',
        process: 7,
    },
    {
        id: 'YID80SJ',
        date: '23',
        model: '居住',
        type: '六七大道',
        status: '启用',
        pinlv: '居民房',
        process: 6,
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
            title: '建筑名称',
            dataIndex: 'pinlv',
        },
        {
            title: '建筑高度（m）',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '建筑用途',
            dataIndex: 'model',
        },
        {
            title: '建筑位置',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '占比',
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
                title="面状居民地"
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
