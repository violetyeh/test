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
        id:'AMM-01206',
        cf:'[COVI00]右线COVI检测器',
        dw:'外加剂',
        jg:'15',
        jx:'#0 塘朗山隧道右线',
        status: '启用',
     },
     {
       id:'AMM-01207',
       cf:'[COVI01]右线COVI检测器',
       dw:'水泥',
       jg:'5',
       jx:'#1 塘朗山隧道右线',
       status: '启用',
    },
    {
        id:'AMM-01208',
        cf:'[COVI02]右线COVI检测器',
        dw:'岩石',
        jg:'8',
        jx:'#2 塘朗山隧道右线',
        status: '启用',
     },
    {
       id:'AMM-01201',
       cf:'[COVI03]右线COVI检测器',
       dw:'矿渣粉',
       jg:'11',
       jx:'#3 塘朗山隧道右线',
       status: '启用',
    },
    {
        id:'AMM-01202',
        cf:'[COVI03]左线COVI检测器',
        dw:'矿粉',
        jg:'15',
        jx:'#3 塘朗山隧道左线',
        status: '启用',
     },
     {
        id:'AMM-01203',
        cf:'[COVI02]左线COVI检测器',
        dw:'细集料',
        jg:'25',
        jx:'#2 塘朗山隧道左线',
        status: '启用',
     },
     {
        id:'AMM-01204',
        cf:'[COVI00]左线COVI检测器',
        dw:'粗集料',
        jg:'15',
        jx:'#0 塘朗山隧道左线',
        status: '启用',
     },
     {
         id:'AMM-01205',
         cf:'[COVI01]左线COVI检测器',
         dw:'土',
         jg:'20',
         jx:'#1 塘朗山隧道左线',
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
            title: '隧道',
            dataIndex: 'jx',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '设备',
            dataIndex: 'cf',
        },
        {
            title: '样品类型',
            dataIndex: 'dw',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '实际检测数量',
            dataIndex: 'jg',
            render: (text) => <Tag color="green">{text}</Tag>,
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
                title="检测数据管理"
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
