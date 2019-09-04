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
        id: 'YSD108S0J',
        date: '2019年8月26日10:56:21',
        type: '浙江',
        status: '启用',
        pinlv: '冀C666A',
        process: '湖北',
        name:'赵媛',
    },
    {
        id: 'YSD1072IK',
        date: '2019年8月27日06:23:03',
        type: '湖南',
        status: '启用',
        pinlv: '冀C63K6',
        process: '浙江',
        name:'姜娜楠',
    },
    {
        id: 'YSD1063JJ',
        date: '2019年8月28日21:48:17',
        type: '重庆',
        status: '启用',
        pinlv: '渝A52B6',
        process: '湖南',
        name:'江南',
    },
    {
        id: 'YSD100191',
        date: '2019年8月29日20:37:12',
        type: '重庆',
        status: '启用',
        pinlv: '渝A23M6',
        process: '广东',
        name:'孟杰',
    },
    {
        id: 'YSD102SI1',
        date: '2019年8月30日08:12:05',
        type: '上海',
        status: '启用',
        pinlv: '沪C66A6',
        process: '重庆',
        name:'王强',
    },
    {
        id: 'YSD1001IOS',
        date: '2019年8月31日09:02:56',
        type: '北京',
        status: '启用',
        pinlv: '津B25B3',
        process: '上海',
        name:'赵刚',
    },
    {
        id: 'YSD10W9s1',
        date: '2019年8月31日11:08:24',
        type: '重庆',
        status: '启用',
        pinlv: '京E110MK',
        process: '云南',
        name:'陈梦',
    },
    {
        id: 'YSD1080SJ',
        date: '2019年8月31日14:11:36',
        type: '上海',
        status: '启用',
        pinlv: '京NLU686',
        process: '广州',
        name:'王三',
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
            title: '运输单编号',
            dataIndex: 'id',
        },
        {
            title: '车牌号码',
            dataIndex: 'pinlv',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '运输时间',
            dataIndex: 'date',
        },
        {
            title: '出发地',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '目的地',
            dataIndex: 'process',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '收货人姓名',
            dataIndex: 'name',
            render: (text) => <Tag color="RED">{text}</Tag>,
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
                title="管理运输业务数据"
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
