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
       id:'JKDH365214001',
       cf:'沈四高速',
       jc:'铁岭分中心',
       dw:'王家沟4收费站',
       jg:'ID0201',
       jx:'42',
       status: '启用',
    },
    {
        id:'JKDH365214002',
        cf:'丁家高速',
        jc:'璧渝分中心',
        dw:'丁家1收费站',
        jg:'ID0202',
        jx:'52',
        status: '启用',
     },
     {
        id:'JKDH365214003',
        cf:'沈四高速',
        jc:'铁岭分中心',
        dw:'王家沟3收费站',
        jg:'ID0203',
        jx:'91',
        status: '启用',
     },
     {
        id:'JKDH365214004',
        cf:'成渝高速',
        jc:'铁岭分中心',
        dw:'李家沟1收费站',
        jg:'ID0204',
        jx:'63',
        status: '启用',
     },
     {
         id:'JKDH365214005',
         cf:'沈四高速',
         jc:'铁岭分中心',
         dw:'王家沟2收费站',
         jg:'ID0205',
         jx:'38',
         status: '启用',
      },
      {
         id:'JKDH365214006',
         cf:'丁家高速',
         jc:'璧渝分中心',
         dw:'丁家2收费站',
         jg:'ID0206',
         jx:'54',
         status: '启用',
      },
      {
        id:'JKDH365214007',
        cf:'成渝高速',
        jc:'铁岭分中心',
        dw:'陈家湾收费站',
        jg:'ID0207',
        jx:'34',
        status: '启用',
     },
     {
         id:'JKDH365214008',
         cf:'沈四高速',
         jc:'铁岭分中心',
         dw:'王家沟1收费站',
         jg:'ID0208',
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
            title: '缴款单号',
            dataIndex: 'id',
        },
        {
            title: '网络名称',
            dataIndex: 'cf',
        },
        
        {
            title: '收费站名称',
            dataIndex: 'dw',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '分中心名称',
            dataIndex: 'jc',
        },

        {
            title: '收费员编号',
            dataIndex: 'jg',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '收费进度',
            dataIndex: 'jx',
            render: (text) => <Progress type="circle" percent={text} size="small" />,

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
                title="收费业务"
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
