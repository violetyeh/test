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
        id: 'ZYFL064',
        xm:'宠物图片',
        jg:'恐怖电影',
        dw:'有声小说',
        pd:'2019年7月14日',
        state: '启用',
    },
    {
        id: 'ZYFL065',
        xm:'风景图片',
        jg:'拍摄视频',
        dw:'英语听力',
        pd:'2019年6月14日',
        state: '启用',
    },
    {
        id: 'ZYFL066',
        xm:'自拍图片',
        jg:'MV',
        dw:'广播剧',
        pd:'2019年7月12日',
        state: '启用',
    },
    {
        id: 'ZYFL067',
        xm:'人物图片',
        jg:'搞笑电影',
        dw:'张杰',
        pd:'2019年7月06日',
        state: '启用',
    },
    {
        id: 'ZYFL068',
        xm:'家人照片',
        jg:'国外电影',
        dw:'林俊杰',
        pd:'2019年7月04日',
        state: '启用',
    },
    {
        id: 'ZYFL061',
        xm:'旅游照片',
        jg:'僵尸电影',
        dw:'周杰伦',
        pd:'2019年7月09日',
        state: '启用',
    },
    {
        id: 'ZYFL062',
        xm:'朋友照片',
        jg:'最新电视剧',
        dw:'录音',
        pd:'2019年7月10日',
        state: '启用',
    },
    {
        id: 'ZYFL063',
        xm:'游戏截图',
        jg:'韩剧',
        dw:'电话录音',
        pd:'2019年7月07日',
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
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '图片库',
            dataIndex: 'xm',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '视频库',
            dataIndex: 'jg',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '音频库',
            dataIndex: 'dw',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '最后修改日期',
            dataIndex: 'pd',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
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
                title="资源分类管理"
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
