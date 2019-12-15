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
        id: 'WXNR000021',
        fl:'房 屋 建 筑',
        mc:'位于道路、城市、村镇内部或周边，一般与数据库范围内原有建筑特征一致',
        ma:'26.00',
        nl:'张文芳',
    },
    {
        id: 'WXNR000035',
        fl:'工 厂 建 筑',
        mc:'位于城镇周边有配套道路，普遍具有大面积彩钢瓦厂房及硬化地面，个别内部具备烟囱、大型机械设备等特征',
        ma:'25.00',
        nl:'王芳',
    },
    {
        id: 'WXNR000038',
        fl:'公 园 建 设',
        mc:'城镇周边一般具备配套湖泊、河流、道路等，绿化程度较高整体建设规划范围面积较大',
        ma:'27.00',
        nl:'刘文',
    },
    {
        id: 'WXNR000021',
        fl:'养 殖 工 棚',
        mc:'位于道路旁边交通便利，一般为白色瓦房或彩钢瓦建筑屋顶呈现一定坡度，偶尔有黑色排气孔，使用非透光材料',
        ma:'26.00',
        nl:'赵媛',
    },
    {
        id: 'WXNR000037',
        fl:'桥 梁',
        mc:'位于地形低洼区域、河流、海上包括铁路桥、公路桥等',
        ma:'25.00',
        nl:'刘冰',
    },
    {
        id: 'WXNR000035',
        fl:'道 路',
        mc:'仅提取成规模道路，具备一定宽度，重点是连接建制镇级别以上公路，对于村村通道路、山区道路、临时碾压道路、机耕道等不提取',
        ma:'26.00',
        nl:'汪峰',
    },
    {
        id: 'WXNR000064',
        fl:'硬 化 地 面',
        mc:'大范围硬化地面，配套道路非常便利，地形平整面积广阔（适用于停车场、货运站）',
        ma:'30.00',
        nl:'陈云',
    },
    {
        id: 'WXNR000078',
        fl:'养 殖 水 塘',
        mc:'位于湖泊、河流形状规则一般临近有配套小型房屋建筑',
        ma:'25.00',
        nl:'王安',
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
            title: '分类',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '认定标准',
            dataIndex: 'mc',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        
        {
            title: '负责人',
            dataIndex: 'nl',
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
                title="图斑类型"
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
