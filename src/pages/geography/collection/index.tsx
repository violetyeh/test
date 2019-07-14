import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag, Progress } from "antd";
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
        id: 'URLGL0231',
        mc:'节点31',
        bm:'15',
        px:'1',
        lj:'http://www.lianjie.com',
        nr:'文章',
        status:96,
    },
    {
        id: 'URLGL0232',
        mc:'节点03',
        bm:'11',
        px:'6',
        lj:'http://www.ceshi.com',
        nr:'相册',
        status:88,
    },
    {
        id: 'URLGL0233',
        mc:'节点06',
        bm:'07',
        px:'3',
        lj:'http://www.shice.com',
        nr:'视频',
        status:74,
    },
    {
        id: 'URLGL0234',
        mc:'节点12',
        bm:'09',
        px:'5',
        lj:'http://www.yiersan.com',
        nr:'链接',
        status:16,
    },
    {
        id: 'URLGL0235',
        mc:'节点24',
        bm:'07',
        px:'3',
        lj:'http://www.sanersan.com',
        nr:'文章',
        status:54,
    },
    {
        id: 'URLGL0236',
        mc:'节点23',
        bm:'05',
        px:'2',
        lj:'http://www.liuqiba.com',
        nr:'相册',
        status:71,
    },
    {
        id: 'URLGL0237',
        mc:'节点07',
        bm:'12',
        px:'1',
        lj:'http://www.bajiushi.com',
        nr:'视频',
        status:64,
    },
    {
        id: 'URLGL0238',
        mc:'节点06',
        bm:'15',
        px:'2',
        lj:'http://www.shiyier.com',
        nr:'链接',
        status:59,
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
            title: '栏目名称',
            dataIndex: 'mc',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '上级编码',
            dataIndex: 'bm',
            
        },
        {
            title: '同级排序',
            dataIndex: 'px',
        },
        {
            title: '外部链接',
            dataIndex: 'lj',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: '内容类型',
            dataIndex: 'nr',
        },
        {
            title: '过滤进度',
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
                title="过滤内容栏目管理"
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
