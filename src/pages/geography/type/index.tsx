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
       id: 'GC1500330132',
       hj:'流通',
       mc:'五花腊肉',
       bs:'湖南',
       bcy:'湖北',
       state: 1,
    },
    {
        id: 'GC1500330149',
        hj:'流通',
        mc:'土家瘦肉',
        bs:'湖南',
        bcy:'湖北',
        state: 1,
     },
     {
        id: 'GC1500330136',
        hj:'流通',
        mc:'农家鸡肉',
        bs:'湖南',
        bcy:'湖北',
        state: 1,
     },
     {
        id: 'GC1500330147',
        hj:'流通',
        mc:'农家白菜',
        bs:'浙江',
        bcy:'湖北',
        state: 1,
     },
     {
        id: 'GC1500330122',
        hj:'流通',
        mc:'猪肉',
        bs:'湖南',
        bcy:'湖北',
        state: 1,
     },
     {
        id: 'GC1500330147',
        hj:'流通',
        mc:'兔肉',
        bs:'湖南',
        bcy:'湖北',
        state: 1,
     },
     {
        id: 'GC1500330136',
        hj:'流通',
        mc:'鸭肉',
        bs:'湖南',
        bcy:'湖北',
        state: 1,
     },
     {
        id: 'GC1500330112',
        hj:'流通',
        mc:'鱼肉',
        bs:'湖南',
        bcy:'湖北',
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
            title: '采样编号',
            dataIndex: 'id',
        },
        {
            title: '抽样环节',
            dataIndex: 'hj',
            render: (text) => <Tag color="#AA2222">{text}</Tag>,
        },
        {
            title: '样品名称',
            dataIndex: 'mc',
            
        },
        {
            title: '标示生产企业省份',
            dataIndex: 'bs',
        },
        {
            title: '被抽样单位省份',
            dataIndex: 'bcy',
        },
        {
            title: '检验结论',
            dataIndex: 'jl',
            render: () => <Switch checkedChildren="合格" unCheckedChildren="不合格" />,
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
                title="审核处置管理"
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
