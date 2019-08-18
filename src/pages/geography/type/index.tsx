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
       id: 'DWYSW0651',
       zhonglei:'汽车配件',
       mingcheng:'摇臂轴',
       songjian:'1600',
       shengchan:'加工零件生产单位',
       chandi:'重庆',
       riqi:'2019年7月09日',
       state: 1,
    },
    {
        id: 'DWYSW0652',
        zhonglei:'车床配件',
        mingcheng:'连杆瓦',
        songjian:'2000',
        shengchan:'物料生产单位',
        chandi:'湖南',
        riqi:'2019年7月06日',
        state: 1,
     },
     {
        id: 'DWYSW0653',
        zhonglei:'车床配件',
        mingcheng:'曲轴',
        songjian:'2365',
        shengchan:'零件生产单位',
        chandi:'江苏',
        riqi:'2019年6月11日',
        state: 1,
     },
     {
        id: 'DWYSW0654',
        zhonglei:'车床配件',
        mingcheng:'连杆',
        songjian:'3000',
        shengchan:'物料生产单位',
        chandi:'安徽',
        riqi:'2019年6月30日',
        state: 1,
     },
     {
        id: 'DWYSW0655',
        zhonglei:'汽车配件',
        mingcheng:'螺丝钉',
        songjian:'3000',
        shengchan:'零件生产单位',
        chandi:'上海',
        riqi:'2019年7月01日',
        state: 1,
     },
     {
        id: 'DWYSW0656',
        zhonglei:'汽车配件',
        mingcheng:'缸盖',
        songjian:'1500',
        shengchan:'加工零件生产单位',
        chandi:'湖北',
        riqi:'2019年7月13日',
        state: 1,
     },
     {
        id: 'DWYSW0657',
        zhonglei:'车床配件',
        mingcheng:'缸盖',
        songjian:'2000',
        shengchan:'物料生产单位',
        chandi:'湖南',
        riqi:'2019年7月11日',
        state: 1,
     },
     {
        id: 'DWYSW0658',
        zhonglei:'汽车配件',
        mingcheng:'油底壳',
        songjian:'2365',
        shengchan:'物料生产单位',
        chandi:'江苏',
        riqi:'2019年7月14日',
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
            title: '物料种类',
            dataIndex: 'zhonglei',
            render: (text) => <Tag color="#2db7f5">{text}</Tag>,
        },
        {
            title: '物料名称',
            dataIndex: 'mingcheng',
            render: (text) => <Tag color="#AA2222">{text}</Tag>,
        },
        {
            title: '合格目标数量',
            dataIndex: 'songjian',
        },
        {
            title: '物料生产单位',
            dataIndex: 'shengchan',
        },
        {
            title: '物料来源地',
            dataIndex: 'chandi',
        },
        {
            title: '生产日期',
            dataIndex: 'riqi',
        },
        {
            title: '是否达到生产目标',
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
                title="生产目标合格管理"
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
