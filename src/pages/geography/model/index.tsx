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
       id:'YYCF0891',
       cf:'能量',
       jc:'nl',
       dw:'千焦（k）',
       jg:'0',
       jx:'17.000',
       zhi:'8400.00',
       status: '启用',
    },
    {
        id:'YYCF0892',
        cf:'脂肪',
        jc:'zf',
        dw:'克（g）',
        jg:'1',
        jx:'.500',
        zhi:'60.00',
        status: '启用',
     },
     {
        id:'YYCF0893',
        cf:'蛋白质',
        jc:'dbz',
        dw:'克（g）',
        jg:'1',
        jx:'.100',
        zhi:'20.00',
        status: '启用',
     },
     {
        id:'YYCF0894',
        cf:'叶酸',
        jc:'ys',
        dw:'千焦（k）',
        jg:'1',
        jx:'170.000',
        zhi:'400.00',
        status: '启用',
     },
     {
         id:'YYCF0895',
         cf:'泛酸',
         jc:'fs',
         dw:'克（g）',
         jg:'1',
         jx:'10.500',
         zhi:'30.00',
         status: '启用',
      },
      {
         id:'YYCF0896',
         cf:'蛋白质',
         jc:'dbz',
         dw:'克（g）',
         jg:'1',
         jx:'.100',
         zhi:'20.00',
         status: '启用',
      },
      {
        id:'YYCF0897',
        cf:'能量',
        jc:'nl',
        dw:'千焦（k）',
        jg:'0',
        jx:'17.000',
        zhi:'8400.00',
        status: '启用',
     },
     {
         id:'YYCF0898',
         cf:'脂肪',
         jc:'zf',
         dw:'克（g）',
         jg:'1',
         jx:'.500',
         zhi:'60.00',
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
            title: '能量和营养成分',
            dataIndex: 'cf',
        },
        {
            title: '简称',
            dataIndex: 'jc',
        },
        {
            title: '表达单位',
            dataIndex: 'dw',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },

        {
            title: '修约间隔',
            dataIndex: 'jg',
        },
        {
            title: '"0"界限值（每100g或100ml）',
            dataIndex: 'jx',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: 'NRV值',
            dataIndex: 'zhi',
            render: (text) => <Tag color="#f50">{text}</Tag>,
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
                title="能量与营养成分名称设置"
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
