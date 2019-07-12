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
       id: 'J01132',
       hj:'添加剂占比检验',
       mc:'薯片',
       bs:'速食品加工生产企业',
       bcy:'浙江',
       state: 1,
    },
    {
        id: 'J01149',
        hj:'添加剂占比检验',
        mc:'果冻',
        bs:'速食品加工生产企业',
        bcy:'浙江',
        state: 1,
     },
     {
        id: 'J01136',
        hj:'添加剂占比检验',
        mc:'农家鸡肉罐头',
        bs:'速食品加工生产企业',
        bcy:'浙江',
        state: 1,
     },
     {
        id: 'J01147',
        hj:'添加剂占比检验',
        mc:'黄桃罐头',
        bs:'果冻加工生产企业',
        bcy:'浙江',
        state: 1,
     },
     {
        id: 'J01122',
        hj:'添加剂占比检验',
        mc:'猪肉罐头',
        bs:'速食品加工生产企业',
        bcy:'浙江',
        state: 1,
     },
     {
        id: 'J01147',
        hj:'添加剂占比检验',
        mc:'兔肉罐头',
        bs:'速食品加工生产企业',
        bcy:'浙江',
        state: 1,
     },
     {
        id: 'J01136',
        hj:'添加剂占比检验',
        mc:'鸭肉罐头',
        bs:'速食品加工生产企业',
        bcy:'浙江',
        state: 1,
     },
     {
        id: 'J01112',
        hj:'添加剂占比检验',
        mc:'鱼肉罐头',
        bs:'速食品加工生产企业',
        bcy:'浙江',
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
            title: '检验过程',
            dataIndex: 'hj',
            render: (text) => <Tag color="#AA2222">{text}</Tag>,
        },
        {
            title: '食品名称',
            dataIndex: 'mc',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '生产企业',
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
                title="添加剂处置管理"
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
