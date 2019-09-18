import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Progress, Tooltip, Tag, Checkbox } from "antd";
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
        id: 'GDAO-006',
        mc:' 自动布管',
        gg:' 定义管径',
        hz:' 16',
        jd:' 输出材料表',
        state: 1,
     },
     {
        id: 'GDAO-007',
        mc:' 交互布管',
        gg:' 定义井地面标高',
        hz:' 10',
        jd:' 输出图例表',
        state: 1,
     },
     {
        id: 'GDAO-008',
        mc:' 定给水管',
        gg:' 定义管高',
        hz:' 13',
        jd:' 输出平面图',
        state: 1,
     }, 
    {
       id: 'GDAO-001',
       mc:' 自动布管',
       gg:' 定义井地面标高',
       hz:' 17',
       jd:' 输出图例表',
       state: 1,
    },
    {
        id: 'GDAO-002',
        mc:' 定给水管',
        gg:' 定义管径',
        hz:' 15',
        jd:' 输出平面图',
        state: 1,
     },
     {
        id: 'GDAO-003',
        mc:' 定给水管',
        gg:' 定义管高',
        hz:'  12',
        jd:' 输出材料表',
        state: 1,
     },
     {
        id: 'GDAO-004',
        mc:' 交互布管',
        gg:' 定义井地面标高',
        hz:' 1',
        jd:' 输出图例表',
        state: 1,
     },
     {
        id: 'GDAO-005',
        mc:' 自动布管',
        gg:' 定义管径',
        hz:' 21',
        jd:' 输出材料表',
        state: 1,
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
            title: '自动获取图纸',
            dataIndex: 'jk',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >自动</Checkbox>
                </Fragment>
            ),
        },
        {
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '平面布置',
            dataIndex: 'mc',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '竖向设计',
            dataIndex: 'gg',
        },
        {
            title: '设计工程图纸需要（张）',
            dataIndex: 'hz',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '成果输出',
            dataIndex: 'jd',
        },
        {
            title: '输出状态',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="输出" unCheckedChildren="未输出" />,
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
                title="工程量统计"
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
