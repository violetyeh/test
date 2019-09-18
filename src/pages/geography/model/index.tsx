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
        id:'XX6',
        cf:'对规划街坊、地块建筑容量控制规定',
        dw:'对规划街坊及地块建筑限高的一般规定',
        jg:'15',
        jx:'对规划用地在细分的管理规定（规划街坊、地块划分）',
        status: '启用',
     },
     {
       id:'XX7',
       cf:'对规划街坊人口容量和密度的规定',
       dw:'对主要道路交叉口周边和沿路建筑高度的控制规定',
       jg:'5',
       jx:'对土地使用兼容性和何种用地适建性的规定',
       status: '启用',
    },
    {
        id:'XX8',
        cf:'对规划街坊、地块建筑密度控制规定',
        dw:'对涉及优秀历史建筑区域内建筑高度的控制规定',
        jg:'8',
        jx:'对规划用地在细分的管理规定（规划街坊、地块划分）',
        status: '启用',
     },
    {
       id:'XX1',
       cf:'对规划街坊和地块容量和密度变更调整的规定',
       dw:'对其他待定地区的建筑高度的控制规定',
       jg:'11',
       jx:'对土地使用的规定',
       status: '启用',
    },
    {
        id:'XX2',
        cf:'对规划街坊、地块建筑密度控制规定',
        dw:'对建筑后退的道路红线的控制规定',
        jg:'15',
        jx:'对规划用地在细分的管理规定（规划街坊、地块划分）',
        status: '启用',
     },
     {
        id:'XX3',
        cf:'对规划街坊人口容量和密度的规定',
        dw:'对建筑后退地块边界的控制规定',
        jg:'25',
        jx:'对土地使用的规定',
        status: '启用',
     },
     {
        id:'XX4',
        cf:'对规划街坊和地块容量和密度变更调整的规定',
        dw:'对建筑单体面宽的控制规定',
        jg:'15',
        jx:'对土地使用兼容性和何种用地适建性的规定',
        status: '启用',
     },
     {
         id:'XX5',
         cf:'对规划街坊、地块建筑容量控制规定',
         dw:'对建筑间距的控制规定',
         jg:'20',
         jx:'对土地使用的规定',
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
            title: '土地使用规划控制',
            dataIndex: 'jx',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '建筑容量规划控制',
            dataIndex: 'cf',
        },
        {
            title: '建筑建造规划控制',
            dataIndex: 'dw',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '编制数量',
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
                title="规划通则"
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
