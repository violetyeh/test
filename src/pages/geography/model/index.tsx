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
       id:'CDCH01',
       cf:'晚班',
       jc:'出口',
       dw:'王家沟4收费站',
       jg:'01',
       jx:'记账卡',
       status: '启用',
    },
    {
        id:'CDCH02',
        cf:'早班',
        jc:'入口',
        dw:'丁家1收费站',
        jg:'02',
        jx:'公务卡',
        status: '启用',
     },
     {
        id:'CDCH03',
        cf:'晚班',
        jc:'出口',
        dw:'王家沟3收费站',
        jg:'03',
        jx:'记账卡',
        status: '启用',
     },
     {
        id:'CDCH04',
        cf:'中班',
        jc:'出口',
        dw:'李家沟1收费站',
        jg:'04',
        jx:'储值卡',
        status: '启用',
     },
     {
         id:'CDCH05',
         cf:'早班',
         jc:'入口',
         dw:'王家沟2收费站',
         jg:'05',
         jx:'公务卡',
         status: '启用',
      },
      {
         id:'CDCH06',
         cf:'晚班',
         jc:'入口',
         dw:'丁家2收费站',
         jg:'06',
         jx:'公务卡',
         status: '启用',
      },
      {
        id:'CDCH07',
        cf:'中班',
        jc:'入口',
        dw:'陈家湾收费站',
        jg:'07',
        jx:'记账卡',
        status: '启用',
     },
     {
         id:'CDCH08',
         cf:'早班',
         jc:'出口',
         dw:'王家沟1收费站',
         jg:'08',
         jx:'储值卡',
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
            title: '车道消息序号',
            dataIndex: 'id',
        },
        {
            title: '班次',
            dataIndex: 'cf',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        
        {
            title: '收费站名称',
            dataIndex: 'dw',
            render: (text) => <Tag color="yellow">{text}</Tag>,
        },
        {
            title: '出入口',
            dataIndex: 'jc',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },

        {
            title: '车道号',
            dataIndex: 'jg',
        },
        {
            title: '卡类型',
            dataIndex: 'jx',

        },
        {
            title: '是否启用',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked />,
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
                title="收费记录查询"
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
