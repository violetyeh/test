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
       id:'ZJ-001',
       cf:'快递储物柜',
       jc:'菜鸟驿站',
       dw:'取件二维码',
       jg:'36',
       jx:'42',
       status: '启用',
    },
    {
        id:'ZJ-002',
        cf:'超市储物柜',
        jc:'永辉超市',
        dw:'条形码小票',
        jg:'61',
        jx:'52',
        status: '启用',
     },
     {
        id:'ZJ-003',
        cf:'超市储物柜',
        jc:'新世纪超市',
        dw:'条形码小票',
        jg:'28',
        jx:'91',
        status: '启用',
     },
     {
        id:'ZJ-004',
        cf:'快递储物柜',
        jc:'小区',
        dw:'取件编码',
        jg:'47',
        jx:'63',
        status: '启用',
     },
     {
         id:'ZJ-005',
         cf:'快递储物柜',
         jc:'菜鸟驿站',
         dw:'取件编码',
         jg:'15',
         jx:'38',
         status: '启用',
      },
      {
         id:'ZJ-006',
         cf:'超市储物柜',
         jc:'永辉超市',
         dw:'条形码小票',
         jg:'29',
         jx:'54',
         status: '启用',
      },
      {
        id:'ZJ-007',
        cf:'快递储物柜',
        jc:'菜鸟驿站',
        dw:'二维码',
        jg:'36',
        jx:'34',
        status: '启用',
     },
     {
         id:'ZJ-008',
         cf:'快递储物柜',
         jc:'小区',
         dw:'取件编码',
         jg:'53',
         jx:'84',
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
            title: '设备标识',
            dataIndex: 'cf',
        },
        {
            title: '储物柜地址',
            dataIndex: 'jc',
        },
        {
            title: '开柜标识',
            dataIndex: 'dw',
            render: (text) => <Tag color="red">{text}</Tag>,
        },

        {
            title: '储物柜占用率（%）',
            dataIndex: 'jg',
            render: (text) => <Progress percent={text} status="active" />,
        },
        {
            title: '物品取走率（%）',
            dataIndex: 'jx',
            render: (text) => <Progress percent={text} status="active" />,
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
                title="储物柜管理"
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
