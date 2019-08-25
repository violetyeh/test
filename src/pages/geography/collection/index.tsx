import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag, Checkbox, Progress } from "antd";
import styles from '../style.less';
import Search from "./Search";
import Save from "./Save";
import { Chart, View, Geom, Label } from "bizcharts";
import DataSet from '@antv/data-set';
import dituData from "./mockdata";


interface TypeProps {

}

interface TypeState {
    saveVisible: boolean;
    currentItem: any;
    data: any[];
}

const mockData = [
    {
        id: 'ZD20038',
        fl:'色情',
        mc:'GAME',
        ma:'日志黑名单',
        nl:'刘文',
        status:'27',
    },
    {
        id: 'ZD20021',
        fl:'不良言论',
        mc:'SHOPPING',
        ma:'机器黑名单',
        nl:'赵媛',
        status:'100',
    },
    {
        id: 'ZD20037',
        fl:'犯罪暴力',
        mc:'GAME',
        ma:'日志白名单',
        nl:'刘冰',
        status:'71',
    },
    {
        id: 'ZD20035',
        fl:'游戏电玩',
        mc:'SHOPPING',
        ma:'站点黑名单',
        nl:'汪峰',
        status:'99',
    },
    {
        id: 'ZD20064',
        fl:'封建迷信',
        mc:'GAME',
        ma:'机器白名单',
        nl:'陈云',
        status:'39',
    },
    {
        id: 'ZD20078',
        fl:'赌博',
        mc:'SHOPPING',
        ma:'站点黑名单',
        nl:'王安',
        status:'100',
    },
    {
        id: 'ZD20021',
        fl:'欺诈',
        mc:'SHOPPING',
        ma:'机器白名单',
        nl:'张文芳',
        status:'78',
    },
    {
        id: 'ZD20035',
        fl:'违法信息',
        mc:'GAMES',
        ma:'机器黑名单',
        nl:'王芳',
        status:'56',
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
            title: '是否禁止',
            dataIndex: 'jz',
            render: (text, record) => (
                <Fragment>
                  <Checkbox >禁止</Checkbox>
                </Fragment>
            ),
        },
        {
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '分类站点',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '自定义分类',
            dataIndex: 'mc',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: '黑白名单',
            dataIndex: 'ma',
            render: (text) => <Tag color="#ff0000">{text}</Tag>,
        },
       
        {
            title: '管理员',
            dataIndex: 'nl',
        },
        {
            title: '进度',
            dataIndex: 'status',
            render: (text) => <Progress percent={text} status="active" />,
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
        const { saveVisible, currentItem, data } = this.state;

        return (
            <PageHeaderWrapper
                title="全局控制"
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
            </PageHeaderWrapper >
        );
    }
}

export default Type;
