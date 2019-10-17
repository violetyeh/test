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
        date: '0-2.5Mpa',
        model: '0.20',
        type: '第一控制压力或下限压力设定值',
        status: '启用',
        pinlv: '当前压力设定值',
        process: 23,
    },
    {
        id: 'YID72IK',
        date: '0-2.5Mpa',
        model: '0.30',
        type: '第二控制压力、消防压力或动压设定值',
        status: '启用',
        pinlv: '第二压力设定值',
        process: 54,
    },
    {
        id: 'YID63JJ',
        date: '1-15',
        model: '1',
        type: '1-1#泵变频,2-2#泵变频,3-一变一工,4-补水泄压,5-开关控制',
        status: '启用',
        pinlv: '泵工作方式',
        process: 44,
    },
    {
        id: 'YIDS0191',
        date: '0.1-5秒',
        model: '0.2',
        type: '用于两泵、三泵和四泵循环软启动时，设定变频切换到工频的时间',
        status: '启用',
        pinlv: '变频→工频时间设定',
        process: 30,
    },
    {
        id: 'YIDS2SI1',
        date: '1-250秒',
        model: '20',
        type: '多泵启动时，欠压加泵的时间',
        status: '启用',
        pinlv: '欠压加泵时间',
        process: 88,
    },
    {
        id: 'YIDS01IOS',
        date: '1-250秒',
        model: '15',
        type: '多泵运行时，超压减泵的时间',
        status: '启用',
        pinlv: '超压减泵时间',
        process: 90,
    },
    {
        id: 'YSIW9s1',
        date: '1-2',
        model: '1',
        type: '1---0-10V   2---0-5V ',
        status: '启用',
        pinlv: '输出电压选择',
        process: 70,
    },
    {
        id: 'YID80SJ',
        date: '1-2',
        model: '1',
        type: '1---0-5V    2--- 1-5V(4-20mA) ',
        status: '启用',
        pinlv: '传感器信号类型',
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
            title: '参数说明',
            dataIndex: 'pinlv',
        },
        {
            title: '数据范围',
            dataIndex: 'date',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '出厂默认值',
            dataIndex: 'model',
        },
        {
            title: '参数说明',
            dataIndex: 'type',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '控制进度',
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
                title="控制器参数"
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
