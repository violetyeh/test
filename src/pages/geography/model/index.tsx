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
        id: 'CER0000007',
        sp:'督办事项',
        shijian:'政府投资项目审批申请',
        biaozhun:'2019年8月16日',
        jiance:'吴启拉',
        process: 60,
        status: '启用',
    },
    {
        id: 'CER0000008',
        sp:'待办事项',
        shijian:'会计资格从业证书核发申请',
        biaozhun:'2019年8月15日',
        jiance:'赵元乐',
        process: 40,
        status: '启用',
    },
    {
        id: 'CER0000009',
        sp:'已办事项',
        shijian:'老年优待证申请',
        biaozhun:'2019年8月24日',
        jiance:'王可媛',
        process: 30,
        status: '启用',
    },
    {
        id: 'CER0000002',
        sp:'受理任务',
        shijian:'粮食收购许可申请',
        biaozhun:'2019年8月21日',
        jiance:'郑峰',
        process: 88,
        status: '启用',
    },
    {
        id: 'CER0000003',
        sp:'待办事项',
        shijian:'烟花爆竹经营许可申请 ',
        biaozhun:'2019年8月20日',
        jiance:'王媛',
        process: 99,
        status: '启用',
    },
    {
        id: 'CER0000004',
        sp:'已办事项',
        shijian:'社区活动开展资格申请',
        biaozhun:'2019年8月19日',
        jiance:'刘琦歌',
        process: 5,
        status: '启用',
    },
    {
        id: 'CER0000005',
        sp:'督办事项',
        shijian:'节假日规定申请',
        biaozhun:'2019年8月18日',
        jiance:'李武雨',
        process: 95,
        status: '启用',
    },
    {
        id: 'CER0000006',
        sp:'受理任务',
        shijian:'经济规范政策',
        biaozhun:'2019年8月17日',
        jiance:'王可可',
        process: 100,
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
            title: '分类',
            dataIndex: 'sp',
            render: (text) => <Tag color="black">{text}</Tag>,
        },
        {
            title: '事项名称',
            dataIndex: 'shijian',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '提交日期',
            dataIndex: 'biaozhun',
        },
        {
            title: '申请人',
            dataIndex: 'jiance',
            render: (text) => <Tag color="BROWN">{text}</Tag>,
        },
        {
            title: '事项办理进度',
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
                title="事项办理"
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
