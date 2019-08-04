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
        id: 'JCSJAA36',
        mingcheng:'阴离子合成洗涤剂(mg/L)',
        hg:100,
        jcy:'陈静婉',
        state: 1,
     },
     {
        id: 'JCSJAA37',
        mingcheng:'高锰酸盐指数(mg/L)',
        hg:98,
        jcy:'王天乐',
        state: 1,
     },
     {
        id: 'JCSJAA38',
        mingcheng:'亚硝酸盐(以N计)(mg/L)',
        hg:76,
        jcy:'陈真',
        state: 1,
     },
    {
        id: 'JCSJAA31',
        mingcheng:'色(度)）',
        hg:98,
        jcy:'陈州',
        state: 1,
     },
     {
         id: 'JCSJAA32',
         mingcheng:'总硬度(以CaCO3,计)(mg/L)',
         hg:100,
         jcy:'李梦琪',
         state: 1,
      },
    {
        id: 'JCSJAA33',
        mingcheng:'溶解性总固体(mg/L)',
        hg:100,
        jcy:'刘媛媛',
        state: 1,
     },
     {
        id: 'JCSJAA34',
        mingcheng:'硫酸盐(mg/L)',
        hg:85,
        jcy:'李思思',
        state: 1,
     },
     {
        id: 'JCSJAA35',
        mingcheng:'挥发性酚类(以苯酚计)(mg/L)',
        hg:90,
        jcy:'葛春',
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
            dataIndex: 'id',
        },
        {
            title: '标准值项目',
            dataIndex: 'mingcheng',
            render: (Text) => <Tag color="#ff0000">{Text}</Tag>,
        },
        {
            title: '监测员',
            dataIndex: 'jcy',
            render: (text) => <Tag color="#AA8888">{text}</Tag>,
        },
        {
            title: '合格率',
            dataIndex: 'hg',
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
                title="监测数据管理"
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
