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
        hj: 'SPAQ食品添加剂安全检验',
        dw:'食品安全局',
        ren:'食品检验部门',
        riqi:'2019年7月04日',
        bm:'监察局',
        qk:'暂停生产',
        process: 34,
        
    },
    {
        hj: 'SPAQ食品添加剂安全检验',
        dw:'食品安全局',
        ren:'食品检验部门',
        riqi:'2019年7月05日',
        bm:'监察局',
        qk:'封存问题食品',
        process: 42,
        
    },
    {
        hj: 'SPAQ食品添加剂安全检验',
        dw:'食品安全局',
        ren:'食品检验部门',
        riqi:'2019年7月06日',
        bm:'监察局',
        qk:'暂停生产',
        process: 66,
        
    },
    {
        hj: 'SPAQ食品添加剂安全检验',
        dw:'食品安全局',
        ren:'食品检验部门',
        riqi:'2019年7月07日',
        bm:'监察局',
        qk:'暂停生产',
        process: 78,
        
    },
    {
        hj: 'SPAQ食品添加剂安全检验',
        dw:'食品安全局',
        ren:'食品检验部门',
        riqi:'2019年7月08日',
        bm:'监察局',
        qk:'封存不合格食品',
        process: 56,
        
    },
    {
        hj: 'SPAQ食品添加剂安全检验',
        dw:'食品安全局',
        ren:'食品检验部门',
        riqi:'2019年7月12日',
        bm:'监察局',
        qk:'暂停生产',
        process: 100,
        
    },
    {
        hj: 'SPAQ食品添加剂安全检验',
        dw:'食品安全局',
        ren:'食品检验部门',
        riqi:'2019年7月02日',
        bm:'监察局',
        qk:'封存不合格食品',
        process: 61,
        
    },
    {
        hj: 'SPAQ食品添加剂安全检验',
        dw:'食品安全局',
        ren:'食品检验部门',
        riqi:'2019年7月03日',
        bm:'监察局',
        qk:'封存问题食品',
        process: 74,
        
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
            title: '检验项目名称',
            dataIndex: 'hj',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '添加剂检验部门',
            dataIndex: 'dw',
        },
        {
            title: '添加剂检验负责部门',
            dataIndex: 'ren',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '添加剂检验日期',
            dataIndex: 'riqi',
        },
        {
            title: '负责核查处置部门',
            dataIndex: 'bm',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '食品控制情况',
            dataIndex: 'qk',
        },
        {
            title: '检测分析进度',
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
                title="添加剂分析设置"
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
