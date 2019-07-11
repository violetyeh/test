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
       zhonglei:'四环素类药物',
       mingcheng:'四环素',
       songjian:'广州动物源食品单位',
       shengchan:'广州动物源食品生产单位',
       chandi:'广州',
       riqi:'2019年7月11日',
       state: 1,
    },
    {
        id: '2',
        zhonglei:'β受体激动剂类药物',
        mingcheng:'诺氟沙星',
        songjian:'广州动物源食品单位',
        shengchan:'广州动物源食品生产单位',
        chandi:'广州',
        riqi:'2019年7月11日',
        state: 1,
     },
     {
        id: '3',
        zhonglei:'喹诺酮类药物',
        mingcheng:'洛美沙星',
        songjian:'广州动物源食品单位',
        shengchan:'广州动物源食品生产单位',
        chandi:'广州',
        riqi:'2019年7月11日',
        state: 1,
     },
     {
        id: '4',
        zhonglei:'磺胺类药物',
        mingcheng:'磺胺邻二甲氧嘧啶',
        songjian:'广州动物源食品单位',
        shengchan:'广州动物源食品生产单位',
        chandi:'广州',
        riqi:'2019年7月11日',
        state: 1,
     },
     {
        id: '5',
        zhonglei:'四环素类药物',
        mingcheng:'磺胺对甲氧嘧啶',
        songjian:'广州动物源食品单位',
        shengchan:'广州动物源食品生产单位',
        chandi:'广州',
        riqi:'2019年7月11日',
        state: 1,
     },
     {
        id: '6',
        zhonglei:'四环素类药物',
        mingcheng:'磺胺二甲基噁唑',
        songjian:'广州动物源食品单位',
        shengchan:'广州动物源食品生产单位',
        chandi:'广州',
        riqi:'2019年7月11日',
        state: 1,
     },
     {
        id: '7',
        zhonglei:'喹诺酮类药物',
        mingcheng:'莱克多巴胺',
        songjian:'广州动物源食品单位',
        shengchan:'广州动物源食品生产单位',
        chandi:'广州',
        riqi:'2019年7月11日',
        state: 1,
     },
     {
        id: '8',
        zhonglei:'四环素类药物',
        mingcheng:'磺胺甲噁唑',
        songjian:'广州动物源食品单位',
        shengchan:'广州动物源食品生产单位',
        chandi:'广州',
        riqi:'2019年7月11日',
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
            title: '通道',
            dataIndex: 'id',
        },
        {
            title: '样品种类',
            dataIndex: 'zhonglei',
        },
        {
            title: '样品名称',
            dataIndex: 'mingcheng',
            render: (text) => <Tag color="#AA2222">{text}</Tag>,
        },
        {
            title: '送检单位',
            dataIndex: 'songjian',
            render: (text) => <Tag color="#2db7f5">{text}</Tag>,
        },
        {
            title: '样品生产单位',
            dataIndex: 'shengchan',
        },
        {
            title: '样品产地',
            dataIndex: 'chandi',
        },
        {
            title: '生产日期',
            dataIndex: 'riqi',
        },
        {
            title: '是否通过检测',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="是" unCheckedChildren="否" />,
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
                title="检测分析数据管理"
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
