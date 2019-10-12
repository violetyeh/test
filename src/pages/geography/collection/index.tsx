import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Tag, Checkbox } from "antd";
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
        id: 'AQGZE-00035',
        fl:'13520',
        mc:'达州金山顺街4号',
        ma:'砖混',
        nl:'恋园小区商住楼',
    },
    {
        id: 'AQGZE-00064',
        fl:'500',
        mc:'春熙路12号',
        ma:'框剪',
        nl:'天大综合楼工程',
    },
    {
        id: 'AQGZE-00078',
        fl:'3000',
        mc:'成都市黄田坝',
        ma:'框剪',
        nl:'132厂加工厂房',
    },
    {
        id: 'AQGZE-00021',
        fl:'24000',
        mc:'成都二环路西三段',
        ma:'砖混',
        nl:'锦城名都',
    },
    {
        id: 'AQGZE-00035',
        fl:'120',
        mc:'广安市庆华镇',
        ma:'砖混',
        nl:'锦绣游泳池工程',
    },
    {
        id: 'AQGZE-00038',
        fl:'31000',
        mc:'成都市建设路1号',
        ma:'框剪',
        nl:'万科金域南湾',
    },
    {
        id: 'AQGZE-00021',
        fl:'120',
        mc:'双流县双华路',
        ma:'框剪',
        nl:'景峰公寓工程',
    },
    {
        id: 'AQGZE-00037',
        fl:'2800',
        mc:'四川省南充市人民北路',
        ma:'砖混',
        nl:'南充1号楼',
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
            title: '工程名称',
            dataIndex: 'nl',
        },
        
        
        {
            title: '工程地址',
            dataIndex: 'mc',
        },
        {
            title: '建筑结构类型',
            dataIndex: 'ma',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '工程面积（m²）',
            dataIndex: 'fl',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },

        {
            title: '监理状态',
            dataIndex: 'status',
            render: (text) => <Switch checkedChildren="完成" unCheckedChildren="未完成" />,
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
                title="监理现场管理"
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
