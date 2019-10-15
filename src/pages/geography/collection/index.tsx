import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag } from "antd";
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
        id: 'CK035',
        fl:'存物中',
        mc:'海安',
        ma:'工余料仓库',
        nl:'汪峰',
        dbz:'其它物资',
    },
    {
        id: 'CK064',
        fl:'存物中',
        mc:'海门',
        ma:'综合仓库',
        nl:'陈云',
        dbz:'工程物资',
    },
    {
        id: 'CK078',
        fl:'空闲中',
        mc:'崇川区',
        ma:'备品备件库',
        nl:'王安',
        dbz:'其它物资',
    },
    {
        id: 'CK021',
        fl:'存物中',
        mc:'海安',
        ma:'工余料仓库',
        nl:'张三石',
        dbz:'工程物资',
    },
    {
        id: 'CK035',
        fl:'空闲中',
        mc:'崇川区',
        ma:'崇川区仓库',
        nl:'王芳',
        dbz:'其它物资',
    },
    {
        id: 'CK038',
        fl:'存物中',
        mc:'海安',
        ma:'工余料仓库',
        nl:'刘文',
        dbz:'工程物资',
    },
    {
        id: 'CK021',
        fl:'存物中',
        mc:'海门',
        ma:'综合仓库',
        nl:'赵媛',
        dbz:'其它物资',
    },
    {
        id: 'CK037',
        fl:'空闲中',
        mc:'海安',
        ma:'备品备件库',
        nl:'刘冰',
        dbz:'工程物资',
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
            title: '仓库状态',
            dataIndex: 'status',
            render: (text) => <Switch checkedChildren="启用" unCheckedChildren="禁用" />,
          },
        {
            title: '仓库编号',
            dataIndex: 'id',
        },
       
       
        {
            title: '仓库名称',
            dataIndex: 'ma',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '仓库状态',
            dataIndex: 'fl',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '仓库地址',
            dataIndex: 'mc',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: ' 管理员',
            dataIndex: 'nl',
        },
        {
            title: '物料类型',
            dataIndex: 'dbz',
            render: (text) => <Tag color="red">{text}</Tag>,
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
                title="仓库管理"
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
