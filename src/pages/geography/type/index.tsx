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
       id: '1',
       mc:'三鲜馄饨',
       gg:'660.00',
       hz:'1800.00',
       yy:'65.00',
       zhi:'1.43%',
       wc:'3.00',
       jd:98,
       state: 1,
    },
    {
        id: '2',
        mc:'猪肉（瘦）',
        gg:'1660.00',
        hz:'800.00',
        yy:'65.00',
        zhi:'1.43%',
        wc:'3.00',
        jd:100,
        state: 1,
     },
     {
        id: '3',
        mc:'苹果',
        gg:'660.00',
        hz:'1700.00',
        yy:'657.00',
        zhi:'2.43%',
        wc:'3.00',
        jd:56,
        state: 1,
     },
     {
        id: '4',
        mc:'纯牛奶',
        gg:'760.00',
        hz:'1870.00',
        yy:'65.00',
        zhi:'1.03%',
        wc:'3.00',
        jd:74,
        state: 1,
     },
     {
        id: '5',
        mc:'可口可乐',
        gg:'660.00',
        hz:'1800.00',
        yy:'65.00',
        zhi:'3.43%',
        wc:'3.00',
        jd:95,
        state: 1,
     },
     {
        id: '6',
        mc:'冰淇淋',
        gg:'660.00',
        hz:'1800.00',
        yy:'65.00',
        zhi:'3.49%',
        wc:'3.00',
        jd:76,
        state: 1,
     },
     {
        id: '7',
        mc:'3+2饼干',
        gg:'660.00',
        hz:'1800.00',
        yy:'65.00',
        zhi:'1.43%',
        wc:'3.00',
        jd:100,
        state: 1,
     },
     {
        id: '8',
        mc:'黄桃罐头',
        gg:'660.00',
        hz:'1800.00',
        yy:'65.00',
        zhi:'2.05%',
        wc:'3.00',
        jd:88,
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
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '产品名称',
            dataIndex: 'mc',
            render: (text) => <Tag color="#AA2222">{text}</Tag>,
        },
        {
            title: '产品规格',
            dataIndex: 'gg',
        },
        {
            title: '营养汇总',
            dataIndex: 'hz',
        },
        {
            title: '每百克营养',
            dataIndex: 'yy',
        },
        {
            title: 'NRV值',
            dataIndex: 'zhi',
        },
        {
            title: '允许误差',
            dataIndex: 'wc',
        },
        {
            title: '检测结果进度',
            dataIndex: 'jd',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '合格情况',
            dataIndex: 'status',
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
                title="营养标签分析数据管理"
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
