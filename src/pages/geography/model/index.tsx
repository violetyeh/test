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
        id:'Z13B02',
        cf:'30',
        jc:'0',
        dw:'孟凡',
        jg:'0',
        jx:'100',
        zhi:'渝C35Z60',
        status: '启用',
     },
     {
        id:'K43B03',
        cf:'45',
        jc:'40',
        dw:'陈子玉',
        jg:'40',
        jx:'100',
        zhi:'渝C45120',
        status: '启用',
     },
     {
        id:'Z10014',
        cf:'30',
        jc:'16',
        dw:'赵坤开',
        jg:'16',
        jx:'96',
        zhi:'渝C11524',
        status: '启用',
     },
     {
         id:'G10B05',
         cf:'30',
         jc:'0',
         dw:'王俊峰',
         jg:'0',
         jx:'100',
         zhi:'渝C33630',
         status: '启用',
      },
    {
        id:'K43B06',
        cf:'30',
        jc:'0',
        dw:'何峰',
        jg:'30',
        jx:'55',
        zhi:'渝C96V20',
        status: '启用',
     },
     {
       id:'K43B07',
       cf:'25',
       jc:'0',
       dw:'陈俊州',
       jg:'25',
       jx:'96',
       zhi:'渝C23B84',
       status: '启用',
    },
    {
        id:'J23B08',
        cf:'40',
        jc:'38',
        dw:'姜宏宇',
        jg:'38',
        jx:'100',
        zhi:'渝C11A60',
        status: '启用',
     },
    {
       id:'G10B01',
       cf:'50',
       jc:'2',
       dw:'刘凯杰',
       jg:'2',
       jx:'91',
       zhi:'渝C20184',
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
            title: '状态',
            dataIndex: 'jz',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >未安检</Checkbox>
                </Fragment>
            ),
        },
        {
            title: '车次',
            dataIndex: 'id',
        },
        {
            title: '驾驶员',
            dataIndex: 'dw',
        },
        {
            title: '准载座位',
            dataIndex: 'cf',
        },
        {
            title: '已检人数',
            dataIndex: 'jc',
        },
        {
            title: '实载人数',
            dataIndex: 'jg',
        },
        {
            title: '乘客安检进度',
            dataIndex: 'jx', 
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
                title="报班车辆"
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
