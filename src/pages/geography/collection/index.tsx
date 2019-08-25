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
        id: 'STJ-ZT-NM-0037',
        fl:'机房TEST06',
        mc:'200 . 200 . 255 .42',
        ma:'电信',
        cpu:'15',
        nc:'24',
        io:'6',
    },
    {
        id: 'STJ-ZT-NM-0035',
        fl:'机房TEST01',
        mc:'200 . 200 . 255 .35',
        ma:'联通',
        cpu:'25',
        nc:'12',
        io:'3',
    },
    {
        id: 'STJ-ZT-NM-0064',
        fl:'机房TEST07',
        mc:'200 . 200 . 255 .33',
        ma:'移动',
        cpu:'36',
        nc:'2',
        io:'13',
    },
    {
        id: 'STJ-ZT-NM-0078',
        fl:'机房TEST08',
        mc:'200 . 200 . 255 .55',
        ma:'电信',
        cpu:'10',
        nc:'34',
        io:'5',
    },
    {
        id: 'STJ-ZT-NM-0021',
        fl:'机房TEST02',
        mc:'205 . 205 . 255 .07',
        ma:'电信',
        cpu:'67',
        nc:'34',
        io:'12',
    },
    {
        id: 'STJ-ZT-NM-0035',
        fl:'机房TEST03',
        mc:'205 . 205 . 255 .05',
        ma:'联通',
        cpu:'56',
        nc:'39',
        io:'24',
    },
    {
        id: 'STJ-ZT-NM-0038',
        fl:'机房TEST04',
        mc:'205 . 205 . 255 .33',
        ma:'电信',
        cpu:'27',
        nc:'16',
        io:'24',
    },
    {
        id: 'STJ-ZT-NM-0021',
        fl:'机房TEST05',
        mc:'200 . 200 . 255 .02',
        ma:'移动',
        cpu:'36',
        nc:'22',
        io:'17',
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
            title: '机房名称',
            dataIndex: 'fl',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '主控服务地址',
            dataIndex: 'mc',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '线路类型',
            dataIndex: 'ma',
        },
        {
            title: '物理存储容量',
            dataIndex: 'cpu', 
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '虚拟存储容量',
            dataIndex: 'nc', 
            render: (text) => <Progress type="circle" percent={text} size="small" />,
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
                title="集群管理"
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
