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
        id: 'JDJL-0201',
        sp:'工程进度监理#ZXJL00',
        shijian:'完成方案设计',
        biaozhun:'60',
        process: 63,
        status: '启用',
    },
    {
        id: 'JDJL-0202',
        sp:'工程进度监理#ZXJL02',
        shijian:'取得施工许可证',
        biaozhun:'70',
        process: 54,
        status: '启用',
    },
    {
        id: 'JDJL-0203',
        sp:'工程进度监理#ZXJL01',
        shijian:'完成初步设计',
        biaozhun:'50',
        process: 100,
        status: '启用',
    },
    {
        id: 'JDJL-0204',
        sp:'工程进度监理#ZXJL05',
        shijian:'完成竣工备案',
        biaozhun:'60',
        process: 5,
        status: '启用',
    },
    {
        id: 'JDJL-0205',
        sp:'工程进度监理#ZXJL01',
        shijian:'完成方案设计',
        biaozhun:'200',
        process: 16,
        status: '启用',
    },
    {
        id: 'JDJL-0206',
        sp:'工程进度监理#ZXJL03',
        shijian:'项目开工',
        biaozhun:'360',
        process: 0,
        status: '启用',
    },
    {
        id: 'JDJL-0207',
        sp:'工程进度监理#ZXJL05',
        shijian:'取得施工许可证',
        biaozhun:'150',
        process: 100,
        status: '启用',
    },
    {
        id: 'JDJL-0208',
        sp:'工程进度监理#ZXJL03',
        shijian:'项目开工',
        biaozhun:'100',
        process: 30,
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
            title: '工程',
            dataIndex: 'sp',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '关键节点',
            dataIndex: 'shijian',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '工期（天）',
            dataIndex: 'biaozhun',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '工程进度',
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
                title="进度监理管理"
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
