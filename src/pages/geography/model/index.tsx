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
       id:'JF-DD-0891',
       cf:'240分钟',
       jc:'10',
       dw:'Machine0105',
       jg:'00-01-6C-Q9-A6-14',
       jx:'198.01.17..0',
       zhi:'84',
       status: '启用',
    },
    {
        id:'JF-DD-0892',
        cf:'300分钟',
        jc:'15',
        dw:'Machine0106',
        jg:'10-01-F6-06-A6-19',
        jx:'197.80.01.5',
        zhi:'60',
        status: '启用',
     },
     {
        id:'JF-DD-0893',
        cf:'180分钟',
        jc:'10',
        dw:'Machine0107',
        jg:'10-01-6C-06-M2-25',
        jx:'119.05.17.1',
        zhi:'20',
        status: '启用',
     },
     {
        id:'JF-DD-0894',
        cf:'60分钟',
        jc:'15',
        dw:'Machine0103',
        jg:'10-01-6C-06-R6-45',
        jx:'119.07.17.0',
        zhi:'4',
        status: '启用',
     },
     {
         id:'JF-DD-0895',
         cf:'120分钟',
         jc:'5',
         dw:'Machine0108',
         jg:'10-01-6C-K6-A6-96',
         jx:'119.86.17.10',
         zhi:'30',
         status: '启用',
      },
      {
         id:'JF-DD-0896',
         cf:'180分钟',
         jc:'10',
         dw:'Machine0102',
         jg:'10-01-6C-P3-A6-2O',
         jx:'119.86.17.1',
         zhi:'20',
         status: '启用',
      },
      {
        id:'JF-DD-0897',
        cf:'240分钟',
        jc:'15',
        dw:'Machine0109',
        jg:'00-01-6C-9A-A6-17',
        jx:'119.86.17.17.',
        zhi:'84',
        status: '启用',
     },
     {
         id:'JF-DD-0898',
         cf:'300分钟',
         jc:'10',
         dw:'Machine0101',
         jg:'00-01-6C-9K-A6-14 ',
         jx:'119.86.17.15',
         zhi:'60',
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
            title: '机器名',
            dataIndex: 'dw',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '预约时间',
            dataIndex: 'cf',
        },
        {
            title: '通知预约结束时间（分钟）',
            dataIndex: 'jc',
        },
        {
            title: '网卡地址',
            dataIndex: 'jg',
        },
        {
            title: 'IP地址',
            dataIndex: 'jx',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
        {
            title: '用户余额（元）',
            dataIndex: 'zhi',
            render: (text) => <Tag color="#f50000">{text}</Tag>,
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
                title="订单数据设置"
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
