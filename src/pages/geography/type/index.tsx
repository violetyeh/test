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
       zhonglei:'动物肉食品',
       mingcheng:'兔肉',
       songjian:'湖南动物源食品单位',
       shengchan:'湖南动物源食品生产单位',
       chandi:'湖南',
       riqi:'2019年7月11日',
       state: 1,
    },
    {
        id: '2',
        zhonglei:'动物制品',
        mingcheng:'火腿肠',
        songjian:'湖南动物源食品单位',
        shengchan:'湖南动物源食品生产单位',
        chandi:'湖南',
        riqi:'2019年7月11日',
        state: 1,
     },
     {
        id: '3',
        zhonglei:'添加动物源食品',
        mingcheng:'鸭肉',
        songjian:'湖南动物源食品单位',
        shengchan:'湖南动物源食品生产单位',
        chandi:'湖南',
        riqi:'2019年7月11日',
        state: 1,
     },
     {
        id: '4',
        zhonglei:'添加动物源食品',
        mingcheng:'猪肉',
        songjian:'湖南动物源食品单位',
        shengchan:'湖南动物源食品生产单位',
        chandi:'湖南',
        riqi:'2019年7月11日',
        state: 1,
     },
     {
        id: '5',
        zhonglei:'动物肉食品',
        mingcheng:'鱼肉',
        songjian:'湖南动物源食品单位',
        shengchan:'湖南动物源食品生产单位',
        chandi:'湖南',
        riqi:'2019年7月11日',
        state: 1,
     },
     {
        id: '6',
        zhonglei:'动物肉食品',
        mingcheng:'羊肉',
        songjian:'湖南动物源食品单位',
        shengchan:'湖南动物源食品生产单位',
        chandi:'湖南',
        riqi:'2019年7月11日',
        state: 1,
     },
     {
        id: '7',
        zhonglei:'添加动物源食品',
        mingcheng:'羊肉串',
        songjian:'湖南动物源食品单位',
        shengchan:'湖南动物源食品生产单位',
        chandi:'湖南',
        riqi:'2019年7月11日',
        state: 1,
     },
     {
        id: '8',
        zhonglei:'动物肉食品',
        mingcheng:'鸡肉',
        songjian:'湖南动物源食品单位',
        shengchan:'湖南动物源食品生产单位',
        chandi:'湖南',
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
            title: '动物源食品种类',
            dataIndex: 'zhonglei',
        },
        {
            title: '动物源食品名称',
            dataIndex: 'mingcheng',
            render: (text) => <Tag color="#AA2222">{text}</Tag>,
        },
        {
            title: '分析单位',
            dataIndex: 'songjian',
            render: (text) => <Tag color="#2db7f5">{text}</Tag>,
        },
        {
            title: '动物源食品生产单位',
            dataIndex: 'shengchan',
        },
        {
            title: '动物源食品产地',
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
                title="动物源食品分析数据管理"
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
