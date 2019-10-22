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
        id: 'CAR01221',
        fl:'小汽车',
        mc:'IOID125',
        ma:'渝A10Y88',
        nl:'2',
    },
    {
        id: 'CAR01235',
        fl:'小汽车',
        mc:'IOID142',
        ma:'渝A10101',
        nl:'5',
    },
    {
        id: 'CAR01238',
        fl:'面包车',
        mc:'IOID236',
        ma:'渝A10198',
        nl:'3',
    },
    {
        id: 'CAR01221',
        fl:'大货车',
        mc:'IOID254',
        ma:'渝A10154',
        nl:'5',
    },
    {
        id: 'CAR01237',
        fl:'面包车',
        mc:'IOID156',
        ma:'渝A10B98',
        nl:'2',
    },
    {
        id: 'CAR01235',
        fl:'面包车',
        mc:'IOID233',
        ma:'渝A10200',
        nl:'3',
    },
    {
        id: 'CAR01264',
        fl:'小汽车',
        mc:'IOID205',
        ma:'渝A10154',
        nl:'5',
    },
    {
        id: 'CAR01278',
        fl:'大货车',
        mc:'IOID168',
        ma:'渝A10132',
        nl:'5',
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
            title: '车道号',
            dataIndex: 'id',
        },
       
        {
            title: '车辆数量',
            dataIndex: 'nl',
        },
        
        
        {
            title: '卡号',
            dataIndex: 'mc',
        },
        {
            title: '车牌号',
            dataIndex: 'ma',
        },
        {
            title: '车型',
            dataIndex: 'fl',
        },

        {
            title: '车道模式',
            dataIndex: 'status',
            render: (text) => <Switch checkedChildren="关闭" unCheckedChildren="开启"  defaultChecked/>,
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
                title="收费站车道管理"
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
