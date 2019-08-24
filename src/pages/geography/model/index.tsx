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
        hj: '库存数据',
        dw:'预警提示音',
        ren:'Stock-02',
        riqi:'新闻内容页面',
        qk:'王宇',
        process: 100,
        
    },
    {
        hj: '销售数据',
        dw:'发送预警短信',
        ren:'sale-02',
        riqi:'网页内容页面',
        qk:'孟念',
        process: 61,
        
    },
    {
        hj: '库存数据',
        dw:'弹出预警信息',
        ren:'Stock-01',
        riqi:'链接内容页面',
        qk:'文雯',
        process: 74,
        
    },
    {
        hj: '销售数据',
        dw:'发送预警短信',
        ren:'sale-03',
        riqi:'资料内容页面',
        qk:'林树',
        process: 34,
        
    },
    {
        hj: '收入数据',
        dw:'预警提示音',
        ren:'money-01',
        riqi:'资料内容页面',
        qk:'凌加',
        process: 42,
        
    },
    {
        hj: '销售数据',
        dw:'弹出预警信息',
        ren:'sale-01',
        riqi:'链接内容页面',
        qk:'张明',
        process: 66,
        
    },
    {
        hj: '库存数据',
        dw:'预警提示音',
        ren:'Stock-03',
        riqi:'新闻内容页面',
        qk:'钱明',
        process: 78,
        
    },
    {
        hj: '收入数据',
        dw:'弹出预警信息',
        ren:'money-02',
        riqi:'网页内容页面',
        qk:'李大发',
        process: 56,
        
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
            title: '预警状态',
            dataIndex: 'status',
            render: (text) => <Switch checkedChildren="未预警" unCheckedChildren="预警中" />,
        },
        {
            title: '数据类别',
            dataIndex: 'hj',
        },
        {
            title: '预警方式',
            dataIndex: 'dw',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '数据表名',
            dataIndex: 'ren',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

      
        {
            title: '预警管理员',
            dataIndex: 'qk',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '预警进度',
            dataIndex: 'process',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
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
                title="数据预警管理"
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
