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
        hj: '生产',
        dw:'接触材料分析单位',
        ren:'食品生产单位',
        riqi:'2019年7月12日',
        bm:'监察局',
        qk:'暂停生产',
        process: 100,
        
    },
    {
        hj: '生产',
        dw:'接触材料分析单位',
        ren:'农产品生产单位',
        riqi:'2019年7月02日',
        bm:'监察局',
        qk:'封存不合格食品',
        process: 61,
        
    },
    {
        hj: '生产',
        dw:'接触材料分析单位',
        ren:'食品生产单位',
        riqi:'2019年7月03日',
        bm:'监察局',
        qk:'封存问题食品',
        process: 74,
        
    },
    {
        hj: '生产',
        dw:'接触材料分析单位',
        ren:'食品生产单位',
        riqi:'2019年7月04日',
        bm:'监察局',
        qk:'暂停生产',
        process: 34,
        
    },
    {
        hj: '生产',
        dw:'接触材料分析单位',
        ren:'食品生产单位',
        riqi:'2019年7月05日',
        bm:'监察局',
        qk:'封存问题食品',
        process: 42,
        
    },
    {
        hj: '生产',
        dw:'接触材料分析单位',
        ren:'食品生产单位',
        riqi:'2019年7月06日',
        bm:'监察局',
        qk:'暂停生产',
        process: 66,
        
    },
    {
        hj: '生产',
        dw:'接触材料分析单位',
        ren:'食品生产单位',
        riqi:'2019年7月07日',
        bm:'监察局',
        qk:'暂停生产',
        process: 78,
        
    },
    {
        hj: '生产',
        dw:'接触材料分析单位',
        ren:'食品生产单位',
        riqi:'2019年7月08日',
        bm:'监察局',
        qk:'封存不合格食品',
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
            title: '处置环节',
            dataIndex: 'hj',
        },
        {
            title: '填报单位',
            dataIndex: 'dw',
        },
        {
            title: '填报人',
            dataIndex: 'ren',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '收到检验报告日期',
            dataIndex: 'riqi',
        },
        {
            title: '负责核查处置部门',
            dataIndex: 'bm',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '产品控制情况',
            dataIndex: 'qk',
            render: (text) => <Tag color="#f50">{text}</Tag>,
        },
        {
            title: '分析进度',
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
                title="材料分析设置"
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
