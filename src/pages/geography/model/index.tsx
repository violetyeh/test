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
        id: 'CLGL9s1',
        date: '是',
        type: '疲劳驾驶',
        status: '启用',
        pinlv: '京E110MK',
        process: '小型越野车',
    },
    {
        id: 'CLGL80SJ',
        date: '否',
        type: '未违反交通规则',
        status: '启用',
        pinlv: '京NLU686',
        process: '大型汽车',
    },
    {
        id: 'CLGL8S0J',
        date: '是',
        type: '逆向行驶',
        status: '启用',
        pinlv: '冀C666A',
        process: '小型汽车',
    },
    {
        id: 'CLGL72IK',
        date: '是',
        type: '醉酒驾驶',
        status: '启用',
        pinlv: '冀C63K6',
        process: '小型汽车',
    },
    {
        id: 'CLGL63JJ',
        date: '是',
        type: '肇事逃逸',
        status: '启用',
        pinlv: '渝A52B6',
        process: '面包车',
    },
    {
        id: 'CLGL191',
        date: '否',
        type: '未违反交通规则',
        status: '启用',
        pinlv: '渝A23M6',
        process: '大货车',
    },
    {
        id: 'CLGL2SI1',
        date: '是',
        type: '超速',
        status: '启用',
        pinlv: '沪C66A6',
        process: '小型越野车',
    },
    {
        id: 'CLGL1IOS',
        date: '是',
        type: '醉酒驾驶',
        status: '启用',
        pinlv: '津B25B3',
        process: '小型汽车',
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
        },
        {
            title: '是否黑名单',
            dataIndex: 'date',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '黑名单原因',
            dataIndex: 'type',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '号码种类',
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
                title="车辆管理"
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
