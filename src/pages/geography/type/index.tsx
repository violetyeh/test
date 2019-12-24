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
        id: '图像类别三',
        zhonglei:'TX132B9',
        mingcheng:'非计费模式',
        songjian:'宋医生',
        shengchan:'张玲',
        chandi:'白内障',
        riqi:'2019年12月13日',
        state: 1,
     },
     {
        id: '图像类别二',
        zhonglei:'TX10201',
        mingcheng:'非计费模式',
        songjian:'宋医生',
        shengchan:'江米意',
        chandi:'青光眼 ',
        riqi:'2019年12月11日',
        state: 1,
     },
     {
        id: '图像类别二',
        zhonglei:'TX102BV',
        mingcheng:'计费模式',
        songjian:'李医生',
        shengchan:'王思琪',
        chandi:'白内障',
        riqi:'2019年12月14日',
        state: 1,
     },
    {
       id: '图像类别二',
       zhonglei:'TX10999',
       mingcheng:'非计费模式',
       songjian:'李医生',
       shengchan:'孟娜',
       chandi:'红眼病',
       riqi:'2019年12月09日',
       state: 1,
    },
    {
        id: '图像类别二',
        zhonglei:'TX1078V',
        mingcheng:'计费模式',
        songjian:'宋医生',
        shengchan:'刘海波',
        chandi:'青光眼',
        riqi:'2019年12月06日',
        state: 1,
     },
     {
        id: '图像类别三',
        zhonglei:'TX102B1',
        mingcheng:'计费模式',
        songjian:'宋医生',
        shengchan:'石桂艳',
        chandi:'斜视手术',
        riqi:'2019年12月11日',
        state: 1,
     },
     {
        id: '图像类别二',
        zhonglei:'TX10234',
        mingcheng:'非计费模式',
        songjian:'李医生',
        shengchan:'李琦',
        chandi:'青光眼',
        riqi:'2019年12月24日',
        state: 1,
     },
     {
        id: '图像类别二',
        zhonglei:'TX15678',
        mingcheng:'计费模式',
        songjian:'李医生',
        shengchan:'陈云杰',
        chandi:'斜视手术',
        riqi:'2019年12月01日',
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
            title: '编号',
            dataIndex: 'zhonglei',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '图像类别',
            dataIndex: 'id',
        },
        
       
        {
            title: '当前评估人',
            dataIndex: 'songjian',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '当前病人',
            dataIndex: 'shengchan',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '评估结果',
            dataIndex: 'chandi',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '开始时间',
            dataIndex: 'riqi',
        },

        {
            title: '当前模式',
            dataIndex: 'mingcheng',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
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
                title="影像图像信息"
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
