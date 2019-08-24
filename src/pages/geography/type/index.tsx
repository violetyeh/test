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
       id: 'DUIDENG-00032',
       hj:'vpc-50f5o6 yx(test04|10.0.0.0/19)',
       mc:'华南地区（广州）',
       bs:'其它账号',
       bcy:'1201k/s',
       state: 1,
    },
    {
        id: 'DUIDENG-00049',
        hj:'vpc-oiejnydh(test03|192.168.0.0/20)',
        mc:'华北地区（北京）',
        bs:'我的账号',
        bcy:'无上限',
        state: 1,
     },
     {
        id: 'DUIDENG-00036',
        hj:'vpc-50f5o6 yx(test04|10.0.0.0/19)',
        mc:'华南地区（广州）',
        bs:'我的账号',
        bcy:'1201k/s',
        state: 1,
     },
     {
        id: 'DUIDENG-00047',
        hj:'vpc-bu3ei113(test02|172.16.0.0/20)',
        mc:'华北地区（北京）',
        bs:'其它账号',
        bcy:'无上限',
        state: 1,
     },
     {
        id: 'DUIDENG-00022',
        hj:'vpc-50f5o6 yx(test04|10.0.0.0/19)',
        mc:'西南地区（重庆）',
        bs:'我的账号',
        bcy:'无上限',
        state: 1,
     },
     {
        id: 'DUIDENG-00047',
        hj:'vpc-oiejnydh(test03|192.168.0.0/20)',
        mc:'华南地区（广州）',
        bs:'其它账号',
        bcy:'1201k/s',
        state: 1,
     },
     {
        id: 'DUIDENG-00036',
        hj:'vpc-bu3ei113(test02|172.16.0.0/20)',
        mc:'华东地区（上海）',
        bs:'其它账号',
        bcy:'无上限',
        state: 1,
     },
     {
        id: 'DUIDENG-00012',
        hj:'vpc-oiejnydh(test03|192.168.0.0/20)',
        mc:'西南地区（成都）',
        bs:'我的账号',
        bcy:'无上限',
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
            title: '本端地域',
            dataIndex: 'mc',
            render: (text) => <Tag color="green">{text}</Tag>,
            
        },
        {
            title: '本端网络',
            dataIndex: 'hj',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        
        {
            title: '对端账号',
            dataIndex: 'bs',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '带宽上限',
            dataIndex: 'bcy',
            render: (text) => <Tag color="purple">{text}</Tag>,
        },
        {
            title: '计费模式',
            dataIndex: 'jl',
            render: () => <Switch checkedChildren="免费" unCheckedChildren="收费" />,
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
                title="对等连接"
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
