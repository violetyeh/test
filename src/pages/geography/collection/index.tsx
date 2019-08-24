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
        id: 'STJ-ZT-NM-0021',
        fl:'00E74S5S5A6Z',
        mc:'205 . 205 . 255 .07',
        ma:'255 . 255 . 255 .107',
        cpu:'67',
        nc:'34',
        io:'12',
    },
    {
        id: 'STJ-ZT-NM-0035',
        fl:'00E6F4D5S8E7',
        mc:'205 . 205 . 255 .05',
        ma:'255 . 255 . 255 .105',
        cpu:'56',
        nc:'39',
        io:'24',
    },
    {
        id: 'STJ-ZT-NM-0038',
        fl:'00E1A2A3X5D5',
        mc:'205 . 205 . 255 .33',
        ma:'255 . 255 . 255 .133',
        cpu:'27',
        nc:'16',
        io:'24',
    },
    {
        id: 'STJ-ZT-NM-0021',
        fl:'00E8A9Z6X5A2',
        mc:'200 . 200 . 255 .02',
        ma:'255 . 255 . 255 .102',
        cpu:'36',
        nc:'22',
        io:'17',
    },
    {
        id: 'STJ-ZT-NM-0037',
        fl:'00E5Z4A6D5S5',
        mc:'200 . 200 . 255 .42',
        ma:'255 . 255 . 255 .142',
        cpu:'15',
        nc:'24',
        io:'6',
    },
    {
        id: 'STJ-ZT-NM-0035',
        fl:'00EC5V6D4S5A',
        mc:'200 . 200 . 255 .35',
        ma:'255 . 255 . 255 .635',
        cpu:'25',
        nc:'12',
        io:'3',
    },
    {
        id: 'STJ-ZT-NM-0064',
        fl:'56ZZX2DS1W5D',
        mc:'200 . 200 . 255 .33',
        ma:'255 . 255 . 255 .733',
        cpu:'36',
        nc:'2',
        io:'13',
    },
    {
        id: 'STJ-ZT-NM-0078',
        fl:'00E0423GD52S',
        mc:'200 . 200 . 255 .55',
        ma:'255 . 255 . 255 .255',
        cpu:'10',
        nc:'34',
        io:'5',
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
            title: '虚拟序列号',
            dataIndex: 'fl',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '集群IP',
            dataIndex: 'mc',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '子网掩码',
            dataIndex: 'ma',
        },
        {
            title: 'CPU',
            dataIndex: 'cpu',
            render: (text) => <Progress percent={text} status="active" />,
        },
        {
            title: '内存',
            dataIndex: 'nc',
            render: (text) => <Progress percent={text} status="active" />,
        },
        {
            title: 'I/O繁忙度',
            dataIndex: 'io',
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
                title="实体机状态管理"
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
