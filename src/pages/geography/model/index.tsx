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
       cf:'物资仓库',
       jc:'15*10',
       dw:'钢管',
       jg:'36',
       jx:'42',
       status: '启用',
    },
    {
        id:'ZJ-002',
        cf:'备件仓库',
        jc:'10*15',
        dw:'钉子',
        jg:'61',
        jx:'52',
        status: '启用',
     },
     {
        id:'ZJ-003',
        cf:'备件仓库',
        jc:'12*8',
        dw:'石板',
        jg:'28',
        jx:'91',
        status: '启用',
     },
     {
        id:'ZJ-004',
        cf:'物资仓库',
        jc:'15*8',
        dw:'木料',
        jg:'47',
        jx:'63',
        status: '启用',
     },
     {
         id:'ZJ-005',
         cf:'物资仓库',
         jc:'13*10',
         dw:'钢板',
         jg:'15',
         jx:'38',
         status: '启用',
      },
      {
         id:'ZJ-006',
         cf:'备件仓库',
         jc:'12*10',
         dw:'螺丝',
         jg:'29',
         jx:'54',
         status: '启用',
      },
      {
        id:'ZJ-007',
        cf:'物资仓库',
        jc:'15*10',
        dw:'钢材',
        jg:'36',
        jx:'34',
        status: '启用',
     },
     {
         id:'ZJ-008',
         cf:'物资仓库',
         jc:'10*10',
         dw:'零件',
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
            title: '仓库类型',
            dataIndex: 'cf',
        },
        {
            title: '货位排放',
            dataIndex: 'jc',
        },
        {
            title: '货物属性',
            dataIndex: 'dw',
            render: (text) => <Tag color="red">{text}</Tag>,
        },

        {
            title: '仓库占用率（%）',
            dataIndex: 'jg',
            render: (text) => <Progress percent={text} status="active" />,
        },
        {
            title: '物资存入率（%）',
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
                title="仓储管理"
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
