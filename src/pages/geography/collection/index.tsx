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
        id: 'AQGZE-00038',
        fl:'基桩超声检测仪',
        mc:'地基基础',
        ma:'基装完整性',
        nl:'道路桥梁监测#JC320',
    },
    {
        id: 'AQGZE-00021',
        fl:'加速磨光机',
        mc:'集料',
        ma:'磨光值',
        nl:'道路桥梁监测#JC051',
    },
    {
        id: 'AQGZE-00037',
        fl:'钢筋位置测定仪',
        mc:'结构混凝土',
        ma:'钢筋位置及保护层厚度',
        nl:'道路桥梁监测#JC023',
    },
    {
        id: 'AQGZE-00035',
        fl:'钢筋位置测定仪',
        mc:'结构混凝土',
        ma:'钢筋位置及保护层厚度',
        nl:'道路桥梁监测#JC320',
    },
    {
        id: 'AQGZE-00064',
        fl:'加速磨光机',
        mc:'集料',
        ma:'磨光值',
        nl:'道路桥梁监测#JC051',
    },
    {
        id: 'AQGZE-00078',
        fl:'基桩超声检测仪',
        mc:'地基基桩',
        ma:'基装完整性',
        nl:'道路桥梁监测#JC051',
    },
    {
        id: 'AQGZE-00021',
        fl:'万能材料试验机',
        mc:'钢筋（含接头）',
        ma:'屈服强度，伸长度，抗拉强度',
        nl:'道路桥梁监测#JC023',
    },
    {
        id: 'AQGZE-00035',
        fl:'基桩超声检测仪',
        mc:'地基基桩',
        ma:'基装完整性',
        nl:'道路桥梁监测#JC051',
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
            title: '监测项目',
            dataIndex: 'nl',
            render: (text) => <Tag color="#000000">{text}</Tag>,
        },
        
        
        {
            title: '项目',
            dataIndex: 'mc',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '本次检测参数',
            dataIndex: 'ma',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '参数对应设备',
            dataIndex: 'fl',
            render: (text) => <Tag color="green">{text}</Tag>,
        },

        {
            title: '检测状态',
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
                title="监测参数设置"
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
