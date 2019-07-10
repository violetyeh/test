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
        id: 'YID8S0J',
        date: '姜宇',
        model: '广告标识',
        type: '线上推广',
        status: '启用',
        pinlv: 'A29166视频推广渠道',
        process: 23,
    },
    {
        id: 'YID72IK',
        date: '孟凡',
        model: '广告招代理',
        type: '线上推广',
        status: '启用',
        pinlv: 'A29153广告推广渠道',
        process: 54,
    },
    {
        id: 'YID63JJ',
        date: '陈瑶瑶',
        model: '广告招代理',
        type: '线上推广',
        status: '启用',
        pinlv: 'A29192广告推广渠道',
        process: 44,
    },
    {
        id: 'YIDS0191',
        date: '陈光学',
        model: '广告招标',
        type: '线上推广',
        remark: '同多X，Y坐标，将地和物通过点、线、面方式进行表达',
        status: '启用',
        pinlv: 'AE1292微信推广渠道',
        process: 30,
    },
    {
        id: 'YIDS2SI1',
        date: '杜维',
        model: '广告展会',
        type: '线上推广',
        remark: '用方格来模拟实体',
        status: '启用',
        pinlv: 'AQ2837微信公众号推广渠道',
        process: 88,
    },
    {
        id: 'YIDS01IOS',
        date: '陈鹏屹',
        model: '广告活动',
        type: '线下推广',
        status: '启用',
        pinlv: 'AY72829线下推广渠道',
        process: 90,
    },
    {
        id: 'YSIW9s1',
        date: '张磊',
        model: '广告监测',
        type: '线上推广',
        status: '启用',
        pinlv: 'A1910百度推广渠道',
        process: 70,
    },
    {
        id: 'YID80SJ',
        date: '陈芙蓉',
        model: '广告招代理',
        type: '线上推广',
        status: '启用',
        pinlv: 'A29192广告推广渠道',
        process: 67,
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
            title: '广告渠道名称',
            dataIndex: 'pinlv',
        },
        {
            title: '渠道负责人',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '广告行业',
            dataIndex: 'model',
        },
        {
            title: '推广类型',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '推广进度',
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
                title="广告推广渠道管理"
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
