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
        id: 'JSJC0307',
        sp:'眼角膜',
        shijian:'01:10:11',
        biaozhun:'16（km）',
        jiance:'吴启拉',
        process: 60,
        status: '启用',
    },
    {
        id: 'JSJC0308',
        sp:'眼膜炎',
        shijian:'00:14:58',
        biaozhun:'15（km）',
        jiance:'赵元乐',
        process: 40,
        status: '启用',
    },
    {
        id: 'JSJC0309',
        sp:'眼角膜',
        shijian:'00:16:52',
        biaozhun:'24（km）',
        jiance:'王可媛',
        process: 30,
        status: '启用',
    },
    {
        id: 'JSJC0302',
        sp:'眼球',
        shijian:'01:05:30',
        biaozhun:'21（km）',
        jiance:'郑峰',
        process: 88,
        status: '启用',
    },
    {
        id: 'JSJC0303',
        sp:'视力',
        shijian:'00:33:24 ',
        biaozhun:'20（km）',
        jiance:'王媛',
        process: 99,
        status: '启用',
    },
    {
        id: 'JSJC0304',
        sp:'眼膜炎',
        shijian:'00:30:24',
        biaozhun:'19（km）',
        jiance:'刘琦歌',
        process: 95,
        status: '启用',
    },
    {
        id: 'JSJC0305',
        sp:'眼球',
        shijian:'01:30:31',
        biaozhun:'18（km）',
        jiance:'李武雨',
        process: 95,
        status: '启用',
    },
    {
        id: 'JSJC0306',
        sp:'眼球',
        shijian:'01:00:23',
        biaozhun:'17（km）',
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
            title: '类别名称',
            dataIndex: 'sp',
        },
        {
            title: '测量评估用时',
            dataIndex: 'shijian',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
       
        {
            title: '评估人',
            dataIndex: 'jiance',
            render: (text) => <Tag color="BROWN">{text}</Tag>,
        },
        {
            title: '本次计费',
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
                title="检查类型设置"
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
