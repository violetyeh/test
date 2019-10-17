import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Card, Switch, Divider, message, Badge, Tag, Progress, Checkbox } from "antd";
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
       id:'BC01',
       cf:'24',
       jc:'22',
       dw:'小区',
       jg:'2',
       jx:'91',
       zhi:'渝C20184',
       status: '启用',
       mc:'80.5',
       nl:'30以下',
       dbz:'3.5',
    },
    {
        id:'BC02',
        cf:'30',
        jc:'30',
        dw:'工地',
        jg:'25',
        jx:'100',
        zhi:'渝C35Z60',
        status: '启用',
        mc:'计算中',
        nl:'40',
        dbz:'3.3',
     },
     {
        id:'BC03',
        cf:'18',
        jc:'18',
        dw:'小区',
        jg:'3',
        jx:'100',
        zhi:'渝C45120',
        status: '启用',
        mc:'70',
        nl:'35',
        dbz:'3.5',
     },
     {
        id:'BC04',
        cf:'30',
        jc:'29',
        dw:'工地',
        jg:'15',
        jx:'96',
        zhi:'渝C11524',
        status: '启用',
        mc:'计算中',
        nl:'30以下',
        dbz:'3.8',
     },
     {
         id:'BC05',
         cf:'25',
         jc:'25',
         dw:'小区',
         jg:'1',
         jx:'100',
         zhi:'渝C33630',
         status: '启用',
         mc:'147',
         nl:'42',
         dbz:'3.5',
      },
      {
         id:'BC06',
         cf:'18',
         jc:'10',
         dw:'工地',
         jg:'8',
         jx:'55',
         zhi:'渝C96V20',
         status: '启用',
         mc:'69',
         nl:'30以下',
         dbz:'3.7',
      },
      {
        id:'BC07',
        cf:'25',
        jc:'24',
        dw:'小区',
        jg:'2',
        jx:'96',
        zhi:'渝C23B84',
        status: '启用',
        mc:'74',
        nl:'30以下',
        dbz:'3.8',
     },
     {
         id:'BC08',
         cf:'24',
         jc:'24',
         dw:'小区',
         jg:'3',
         jx:'100',
         zhi:'渝C11A60',
         status: '启用',
         nl:'30以下',
         dbz:'3.5',
         mc:'100.5',
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
            title: '卡号',
            dataIndex: 'id',
        },
        {
            title: '用户地址',
            dataIndex: 'dw',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        
        {
            title: '用水人数',
            dataIndex: 'jg',
        },
        {
            title: '用水率',
            dataIndex: 'jx', 
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
       
        {
            title: '购买量（立方）',
            dataIndex: 'nl',
        },
        {
            title: '单价',
            dataIndex: 'dbz',
        },
        {
            title: '总金额（元）',
            dataIndex: 'mc',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
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
                title="用水管理"
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
