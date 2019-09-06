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
        id: 'YJ-63JJ',
        date: '2019年8月28日21:48:17',
        type: '车距过近报警',
        status: '启用',
        pinlv: '渝A52B6',
        process: '孙晔',
    },
    {
        id: 'YJ-0191',
        date: '2019年8月29日20:37:12',
        type: '车道偏离报警',
        status: '启用',
        pinlv: '渝A23M6',
        process: '方木宁',
    },
    {
        id: 'YJ-2SI1',
        date: '2019年8月30日08:12:05',
        type: '超速报警',
        status: '启用',
        pinlv: '沪C66A6',
        process: '江云',
    },
    {
        id: 'YJ-01IOS',
        date: '2019年8月31日09:02:56',
        type: '前向碰撞报警',
        status: '启用',
        pinlv: '津B25B3',
        process: '方雅',
    },
    {
        id: 'YS-IW9s1',
        date: '2019年8月31日11:08:24',
        type: '疲劳驾驶报警',
        status: '启用',
        pinlv: '京E110MK',
        process: '孟慧业',
    },
    {
        id: 'YJ-80SJ',
        date: '2019年8月31日14:11:36',
        type: '超速报警',
        status: '启用',
        pinlv: '京NLU686',
        process: '钱来科',
    },
    {
        id: 'YJ-8S0J',
        date: '2019年8月26日10:56:21',
        type: '疲劳驾驶报警',
        status: '启用',
        pinlv: '冀C666A',
        process: '赵云峰',
    },
    {
        id: 'YJ-72IK',
        date: '2019年8月27日06:23:03',
        type: '前向碰撞报警',
        status: '启用',
        pinlv: '冀C63K6',
        process: '王梦洁',
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
            title: '车牌号码',
            dataIndex: 'pinlv',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '预警时间',
            dataIndex: 'date',
        },
        {
            title: '预警类型',
            dataIndex: 'type',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '驾驶人',
            dataIndex: 'process',
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
                title="安全预警管理"
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
