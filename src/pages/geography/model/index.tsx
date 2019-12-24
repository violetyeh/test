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
        id: 'PG007',
        sp:'刘思杰',
        shijian:'400微秒',
        biaozhun:'2019年8月16日 13:23',
        jiance:'750',
        process: 60,
        status: '启用',
    },
    {
        id: 'PG008',
        sp:'孙梦雨',
        shijian:'350微秒',
        biaozhun:'2019年8月15日 15:42',
        jiance:'800',
        process: 40,
        status: '启用',
    },
    {
        id: 'PG009',
        sp:'王孙怡',
        shijian:'150微秒',
        biaozhun:'2019年8月24日 10:32',
        jiance:'850',
        process: 30,
        status: '启用',
    },
    {
        id: 'PG002',
        sp:'赵思言',
        shijian:'300微秒',
        biaozhun:'2019年8月21日 06:21',
        jiance:'700',
        process: 88,
        status: '启用',
    },
    {
        id: 'PG003',
        sp:'李媛媛',
        shijian:'200微秒 ',
        biaozhun:'2019年8月20日 07:28',
        jiance:'750',
        process: 99,
        status: '启用',
    },
    {
        id: 'PG004',
        sp:'齐天雷',
        shijian:'250微秒',
        biaozhun:'2019年8月19日 14:57',
        jiance:'800',
        process: 5,
        status: '启用',
    },
    {
        id: 'PG005',
        sp:'吴磊',
        shijian:'200微秒',
        biaozhun:'2019年8月18日 18:14',
        jiance:'750',
        process: 95,
        status: '启用',
    },
    {
        id: 'PG006',
        sp:'赵倩',
        shijian:'150微秒',
        biaozhun:'2019年8月17日 16:02',
        jiance:'700',
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
            title: '被扫描人',
            dataIndex: 'sp',
        },
        {
            title: '曝光延时',
            dataIndex: 'shijian',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '曝光时间',
            dataIndex: 'biaozhun',
        },
        {
            title: '近视数据库增益参数',
            dataIndex: 'jiance',
            render: (text) => <Tag color="BROWN">{text}</Tag>,
        },
        {
            title: '扫描进度',
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
                title="扫描仪参数"
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
