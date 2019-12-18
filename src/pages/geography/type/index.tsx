import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Progress, Tooltip, Tag } from "antd";
import styles from '../style.less';
import Search from "./Search";
import Save from "./Save";

interface TypeProps {

}

interface TypeState {
    saveVisible: boolean;
    data: any[];
    currentItem: any;
}

const mockData = [
    {
        id: 'SJ20101',
        time:'2020-01-01',
        type: '12:45',
        creator: '1号厅',
        status: 1,
      },
      {
        id: 'SJ20102',
        time:'2020-01-01',
        type: '10:30',
        creator: '6号厅',
        status: 1,
      },
      {
        id: 'SJ20103',
        time:'2020-01-02',
        type: '16:00',
        creator: '2号厅',
        status: 1,
      },
      {
        id: 'SJ20104',
        time:'2020-01-02',
        type: '15:30',
        creator: '3号厅',
        status: 1,
      },
      {
        id: 'SJ20105',
        time:'2020-01-03',
        type: '13:20',
        creator: '5号厅',
        status: 1,
      },
      {
        id: 'SJ20106',
        time:'2020-01-04',
        type: '11:45',
        creator: '2号厅',
        status: 1,
      },
      {
        id: 'SJ20107',
        time:'2020-01-03',
        type: '9:30',
        creator: '6号厅',
        status: 1,
      },
      {
        id: 'SJ20108',
        time:'2020-01-03',
        type: '13:20',
        creator: '4号厅',
        status: 1,
      },
]

class Type extends Component<TypeProps, TypeState>{

    state: TypeState = {
        saveVisible: false,
        data: mockData,
        currentItem: {},
    }

    columns: ColumnProps<any>[] = [
        {
            title: '数据编号',
            dataIndex: 'id',
          },
          {
            title: '电影放映日期',
            dataIndex: 'time',
          },
          {
            title: '开始时间',
            dataIndex: 'type',
            render: (text) => <Tag color="green">{text}</Tag>,
          },
          {
            title: '放映厅',
            dataIndex: 'creator',
            render: (text) => <Tag color="red">{text}</Tag>,
          },
          {
            title: '是否成功转发',
            dataIndex: 'status',
            render: (text) => <Switch checkedChildren="成功" unCheckedChildren="失败"  defaultChecked/>,
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
        console.log(record, 'res');
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
                title="放映管理"
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

export default Type;
