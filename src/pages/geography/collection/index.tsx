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
        id: 'http://localhost:8000/',
        tongdao:'12',
        touguang:'279.40',
        duizhao:'明星照片',
        shijian:'否',
        state: '启用',
    },
    {
        id: 'http://localhost:8002/',
        tongdao:'6',
        touguang:'365.50',
        duizhao:'教学资源',
        shijian:'是',
        state: '启用',
    },
    {
        id: 'http://localhost:8001/',
        tongdao:'5',
        touguang:'200.60',
        duizhao:'电影',
        shijian:'否',
        state: '启用',
    },
    {
        id: 'http://localhost:8000/',
        tongdao:'16',
        touguang:'375.60',
        duizhao:'英语听力',
        shijian:'是',
        state: '启用',
    },
    {
        id: 'http://localhost:8003/',
        tongdao:'3',
        touguang:'193.50',
        duizhao:'电影',
        shijian:'否',
        state: '启用',
    },
    {
        id: 'http://localhost:8002/',
        tongdao:'3',
        touguang:'200.00',
        duizhao:'教学资源',
        shijian:'否',
        state: '启用',
    },
    {
        id: 'http://localhost:8001/',
        tongdao:'10',
        touguang:'300.00',
        duizhao:'音乐',
        shijian:'是',
        state: '启用',
    },
    {
        id: 'http://localhost:8000/',
        tongdao:'11',
        touguang:'342.52',
        duizhao:'教学资源',
        shijian:'是',
        state: '启用',
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
            title: '位置',
            dataIndex: 'id',
        },
        {
            title: '资源大小（GB）',
            dataIndex: 'tongdao',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '容量（GB）',
            dataIndex: 'touguang',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '资源类型',
            dataIndex: 'duizhao',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '是否可存储',
            dataIndex: 'shijian',
            render: (text) => <Tag color="#ff5555">{text}</Tag>,
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
                title="分布式存储资源管理"
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
