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
        hj: '链接型',
        dw:'www.lianjie.com',
        ren:'明玉',
        riqi:'链接内容页面',
        qk:'张明',
        process: 66,
        
    },
    {
        hj: '新闻型',
        dw:'www.xinwen.com',
        ren:'刘茵茵',
        riqi:'新闻内容页面',
        qk:'钱明',
        process: 78,
        
    },
    {
        hj: '网页型',
        dw:'www.wangye.com',
        ren:'赵湾',
        riqi:'网页内容页面',
        qk:'李大发',
        process: 56,
        
    },
    {
        hj: '新闻型',
        dw:'www.xinwen.com',
        ren:'刘威',
        riqi:'新闻内容页面',
        qk:'王宇',
        process: 100,
        
    },
    {
        hj: '网页型',
        dw:'www.wangye.com',
        ren:'孟浩',
        riqi:'网页内容页面',
        qk:'孟念',
        process: 61,
        
    },
    {
        hj: '链接型',
        dw:'www.lianjie.com',
        ren:'唐宇',
        riqi:'链接内容页面',
        qk:'文雯',
        process: 74,
        
    },
    {
        hj: '资料下载',
        dw:'www.ziliao.com',
        ren:'李白白',
        riqi:'资料内容页面',
        qk:'林树',
        process: 34,
        
    },
    {
        hj: '资料下载',
        dw:'www.ziliao.com',
        ren:'明楼',
        riqi:'资料内容页面',
        qk:'凌加',
        process: 42,
        
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
            title: '状态',
            dataIndex: 'status',
            render: (text) => <Switch checkedChildren="启用" unCheckedChildren="禁用" />,
        },
        {
            title: '数据信息类型',
            dataIndex: 'hj',
        },
        {
            title: '数据链接地址',
            dataIndex: 'dw',
        },
        {
            title: '数据采集负责人员',
            dataIndex: 'ren',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '数据详细页面',
            dataIndex: 'riqi',
        },
        {
            title: '数据分析负责人员',
            dataIndex: 'qk',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '采集进度',
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
                title="数据详细管理"
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
