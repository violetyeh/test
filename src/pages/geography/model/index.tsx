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
        id:'JLYW16',
        cf:'DSI41工程监理',
        dw:'0.20',
        xs:'92',
        jg:'卫南风',
        jx:'02341526341',
        process:'54',
        status: '启用',
     },
     {
       id:'JLYW17',
       cf:'DSI08工程监理',
       dw:'1.23',
       xs:'63',
       jg:'张明',
       jx:'02341478541',
       process:'99',
       status: '启用',
    },
    {
        id:'JLYW18',
        cf:'DSI12工程监理',
        dw:'0.19',
        xs:'71',
        jg:'王安',
        jx:'02341465263',
        process:'46',
        status: '启用',
     },
    {
       id:'JLYW11',
       cf:'DSI28工程监理',
       dw:'1.20',
       xs:'80',
       jg:'张敏',
       jx:'02341413665',
       process:'100',
       status: '启用',
    },
    {
        id:'JLYW12',
        cf:'DSI36工程监理',
        dw:'1.27',
        xs:'100',
        jg:'刘希',
        jx:'02345214123',
        process:'88',
        status: '启用',
     },
     {
        id:'JLYW13',
        cf:'DSI115工程监理',
        dw:'0.34',
        xs:'91',
        jg:'汪月',
        jx:'02342563214',
        process:'79',
        status: '启用',
     },
     {
        id:'JLYW14',
        cf:'DSI025工程监理',
        dw:'1.5',
        xs:'90',
        jg:'刘凯',
        jx:'02342536847',
        process:'46',
        status: '启用',
     },
     {
         id:'JLYW15',
         cf:'DSI63工程监理',
         dw:'0.26',
         xs:'72',
         jg:'谢意',
         jx:'02341413997',
         process:'23',
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
            title: '业务名称',
            dataIndex: 'cf',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '监理工程师',
            dataIndex: 'jg',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '监理联系电话',
            dataIndex: 'jx',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '监理费浮动率（%）',
            dataIndex: 'dw',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '监理进度',
            dataIndex: 'xs',
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
                title="监理业务管理"
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
