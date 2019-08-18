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
        fl:'http://www.yiersan.com',
        mc:'银行账号',
        ma:'行为审计',
        nl:'刘文',
        status:'27',
    },
    {
        id: 'ZD20021',
        fl:'http://www.liuba.com',
        mc:'淘宝密码',
        ma:'行为审计',
        nl:'赵媛',
        status:'100',
    },
    {
        id: 'ZD20037',
        fl:'http://www.qijiu.com',
        mc:'淫秽字词',
        ma:'信息违规检测',
        nl:'刘冰',
        status:'71',
    },
    {
        id: 'ZD20035',
        fl:'http://www.yisan.com',
        mc:'远程登录',
        ma:'行为审计',
        nl:'汪峰',
        status:'99',
    },
    {
        id: 'ZD20064',
        fl:'http://www.wuliu.com',
        mc:'传销暴力',
        ma:'信息违规检测',
        nl:'陈云',
        status:'39',
    },
    {
        id: 'ZD20078',
        fl:'http://www.ersansi.com',
        mc:'炒股信息',
        ma:'行为审计',
        nl:'王安',
        status:'100',
    },
    {
        id: 'ZD20021',
        fl:'http://www.qq.com',
        mc:'qq聊天',
        ma:'信息违规检测',
        nl:'张文芳',
        status:'78',
    },
    {
        id: 'ZD20035',
        fl:'http://www.xiao.com',
        mc:'文件传输',
        ma:'行为审计',
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
            title: '运维监控网址',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '运维监控内容',
            dataIndex: 'mc',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: '备注',
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
                title="运维监控管理"
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
