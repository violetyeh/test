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
       id: 'WD0021',
       zhonglei:'葫芦岛食品厂',
       mingcheng:'很多食品',
       songjian:'是',
       shengchan:'3',
       chandi:'否',
       riqi:'2019年7月09日',
       state: 1,
    },
    {
        id: 'WD0022',
        zhonglei:'安阳灯泡厂',
        mingcheng:'各种型号的灯泡',
        songjian:'否',
        shengchan:'6',
        chandi:'是',
        riqi:'2019年7月06日',
        state: 1,
     },
     {
        id: 'WD0023',
        zhonglei:'华太电池厂',
        mingcheng:'各种号码的电池',
        songjian:'否',
        shengchan:'2',
        chandi:'否',
        riqi:'2019年6月11日',
        state: 1,
     },
     {
        id: 'WD0024',
        zhonglei:'华龙方便面厂',
        mingcheng:'很多方便面品种',
        songjian:'是',
        shengchan:'1',
        chandi:'是',
        riqi:'2019年6月30日',
        state: 1,
     },
     {
        id: 'WD0025',
        zhonglei:'葫芦岛食品厂',
        mingcheng:'很多食品',
        songjian:'是',
        shengchan:'5',
        chandi:'是',
        riqi:'2019年7月01日',
        state: 1,
     },
     {
        id: 'WD0026',
        zhonglei:'葫芦岛食品厂',
        mingcheng:'很多食品',
        songjian:'否',
        shengchan:'4',
        chandi:'是',
        riqi:'2019年7月13日',
        state: 1,
     },
     {
        id: 'WD0027',
        zhonglei:'好滋味食品厂',
        mingcheng:'很多小食品',
        songjian:'否',
        shengchan:'3',
        chandi:'否',
        riqi:'2019年7月11日',
        state: 1,
     },
     {
        id: 'WD0028',
        zhonglei:'华龙方便面厂',
        mingcheng:'很多方便面品种',
        songjian:'是',
        shengchan:'7',
        chandi:'是',
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
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '客户名称',
            dataIndex: 'zhonglei',
            render: (text) => <Tag color="black">{text}</Tag>,
        },
        {
            title: '备注信息',
            dataIndex: 'mingcheng',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '是否老客户',
            dataIndex: 'songjian',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '业务来往次数',
            dataIndex: 'shengchan',
        },
        {
            title: '是否为可发展客户',
            dataIndex: 'chandi',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '首次交易日期',
            dataIndex: 'riqi',
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
                title="客户管理"
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
