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
        id:'WL-XINXI-096',
        cf:'DSI41',
        dw:'20',
        xs:'2',
        jg:'南线',
        jx:'混凝土',
        process:'54',
        status: '启用',
     },
     {
       id:'WL-XINXI-097',
       cf:'DSI08',
       dw:'23',
       xs:'3',
       jg:'东线',
       jx:'混凝土',
       process:'99',
       status: '启用',
    },
    {
        id:'WL-XINXI-098',
        cf:'DSI12',
        dw:'19',
        xs:'1',
        jg:'南线',
        jx:'玄武岩',
        process:'46',
        status: '启用',
     },
    {
       id:'WL-XINXI-091',
       cf:'DSI28',
       dw:'20',
       xs:'0',
       jg:'东线',
       jx:'玄武岩',
       process:'100',
       status: '启用',
    },
    {
        id:'WL-XINXI-092',
        cf:'DSI36',
        dw:'27',
        xs:'2',
        jg:'西线',
        jx:'玄武岩',
        process:'88',
        status: '启用',
     },
     {
        id:'WL-XINXI-093',
        cf:'DSI115',
        dw:'34',
        xs:'1',
        jg:'东线',
        jx:'混凝土',
        process:'79',
        status: '启用',
     },
     {
        id:'WL-XINXI-094',
        cf:'DSI025',
        dw:'15',
        xs:'0',
        jg:'西线',
        jx:'混凝土',
        process:'46',
        status: '启用',
     },
     {
         id:'WL-XINXI-095',
         cf:'DSI63',
         dw:'26',
         xs:'2',
         jg:'东线',
         jx:'玄武岩',
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
            title: '施工单位',
            dataIndex: 'cf',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '工程名称',
            dataIndex: 'jg',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '物料类型',
            dataIndex: 'jx',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '压碎值（%）',
            dataIndex: 'dw',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '吸水率（%）',
            dataIndex: 'xs',
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
                title="物料检测"
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
