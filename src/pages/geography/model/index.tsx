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
        id:'SJCT006',
        cf:'管线设计41',
        dw:'1000000：1',
        jg:'658.24',
        jx:'726.32',
        status: '启用',
     },
     {
       id:'SJCT007',
       cf:'管线设计08',
       dw:'10000：1',
       jg:'523.24',
       jx:'631.14',
       status: '启用',
    },
    {
        id:'SJCT008',
        cf:'管线设计12',
        dw:'1000000：1',
        jg:'325.12',
        jx:'457.58',
        status: '启用',
     },
    {
       id:'SJCT001',
       cf:'管线设计28',
       dw:'10000：1',
       jg:'529.74',
       jx:'610.10',
       status: '启用',
    },
    {
        id:'SJCT002',
        cf:'管线设计36',
        dw:'1000000：1',
        jg:'632.58',
        jx:'789.24',
        status: '启用',
     },
     {
        id:'SJCT003',
        cf:'管线设计115',
        dw:'1000000：1',
        jg:'365.47',
        jx:'469.54',
        status: '启用',
     },
     {
        id:'SJCT004',
        cf:'管线设计025',
        dw:'100000：1',
        jg:'526.35',
        jx:'634.27',
        status: '启用',
     },
     {
         id:'SJCT005',
         cf:'管线设计63',
         dw:'1000000：1',
         jg:'236.35',
         jx:'314.52',
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
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '工程名',
            dataIndex: 'cf',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '测绘坐标X',
            dataIndex: 'jg',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '测绘坐标Y',
            dataIndex: 'jx',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '出图比例',
            dataIndex: 'dw',
            render: (text) => <Tag color="magenta">{text}</Tag>,
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
                title="管道设计"
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
