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
        id:'湛江南站',
        cf:'40',
        jc:'3',
        dw:'姜宏宇',
        jg:'2019年9月7日15:01:52',
        jx:'100',
        zhi:'渝C11A60',
        status: '启用',
     },
    {
       id:'镇江南站',
       cf:'50',
       jc:'2',
       dw:'刘凯杰',
       jg:'2019年9月7日15:01:32',
       jx:'91',
       zhi:'渝C20184',
       status: '启用',
    },
    {
        id:'成都西站',
        cf:'30',
        jc:'0',
        dw:'孟凡',
        jg:'2019年9月7日15:02:24',
        jx:'100',
        zhi:'川C35Z60',
        status: '启用',
     },
     {
        id:'长沙北站',
        cf:'45',
        jc:'2',
        dw:'陈子玉',
        jg:'2019年9月7日15:02:18',
        jx:'100',
        zhi:'湘C45120',
        status: '启用',
     },
     {
        id:'重庆南站',
        cf:'30',
        jc:'1',
        dw:'孟岩',
        jg:'2019年9月7日15:02:13',
        jx:'96',
        zhi:'渝C11524',
        status: '启用',
     },
     {
         id:'湛江南站',
         cf:'30',
         jc:'0',
         dw:'王俊峰',
         jg:'2019年9月7日15:02:07',
         jx:'100',
         zhi:'渝C33630',
         status: '启用',
      },
    {
        id:'湛江西站',
        cf:'30',
        jc:'0',
        dw:'何峰',
        jg:'2019年9月7日15:02:02',
        jx:'55',
        zhi:'渝C96V20',
        status: '启用',
     },
     {
       id:'湛江北站',
       cf:'25',
       jc:'0',
       dw:'陈俊州',
       jg:'2019年9月7日15:01:58',
       jx:'96',
       zhi:'渝C23B84',
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
            title: '线路',
            dataIndex: 'id',
        },
        {
            title: '报班车辆',
            dataIndex: 'zhi',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '驾驶员',
            dataIndex: 'dw',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '准载座位',
            dataIndex: 'cf',
        },
        {
            title: '免票儿童',
            dataIndex: 'jc',
        },
        {
            title: '出站时间',
            dataIndex: 'jg',
            render: (text) => <Tag color="RED">{text}</Tag>,
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
