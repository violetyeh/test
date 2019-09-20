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
        id: 'ZTGD00121',
        fl:'A1 594×841',
        mc:'虚线(ACAD_ISO02W100)',
        ma:'1：5',
        bf:'尺寸界线',
        sf:'14mm',
        state: '启用',
    },
    {
        id: 'ZTGD00135',
        fl:'A3 210×297',
        mc:'双点长划线(ACAD_ISO05W100)',
        ma:'1：20',
        bf:'尺寸起止线',
        sf:'14mm',
        state: '启用',
    },
    {
        id: 'ZTGD00138',
        fl:'A1 594×841',
        mc:'虚线(ACAD_ISO02W100)',
        ma:'1：10',
        bf:'尺寸界线',
        sf:'14mm',
        state: '启用',
    },
    {
        id: 'ZTGD00121',
        fl:'A3 210×297',
        mc:'单点长划线(ACAD_ISO04W100)',
        ma:'1：60 ',
        bf:'尺寸线',
        sf:'10mm',
        state: '启用',
    },
    {
        id: 'ZTGD00137',
        fl:'A1 594×841',
        mc:'实线（continuous或Bylayer或Byblock）',
        ma:'1：200',
        bf:'尺寸起止线',
        sf:'7mm',
        state: '启用',
    },
    {
        id: 'ZTGD00135',
        fl:'A2 420×594',
        mc:'单点长划线(ACAD_ISO04W100)',
        ma:'1：150',
        bf:'尺寸线',
        sf:'5mm',
        state: '启用',
    },
    {
        id: 'ZTGD00164',
        fl:'A3 210×297',
        mc:'虚线(ACAD_ISO02W100)',
        ma:'1：100',
        bf:'尺寸起止线',
        sf:'3.5mm',
        state: '启用',
    },
    {
        id: 'ZTGD00178',
        fl:'A2 420×594',
        mc:'实线（continuous或Bylayer或Byblock）',
        ma:'1：50',
        bf:'尺寸线',
        sf:'2.5mm',
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
            title: '图纸幅面标准',
            dataIndex: 'fl',
            render: (text) => <Tag color="#108ee9">{text}</Tag>,
        },
        {
            title: '深化图线型',
            dataIndex: 'mc',
            render: (text) => <Tag color="#f08ee9">{text}</Tag>,
        },
        {
            title: '绘图常用比例',
            dataIndex: 'ma',
        },
        {
            title: '尺寸类别',
            dataIndex: 'bf',
           
        },
        {
            title: '文字字高',
            dataIndex: 'sf',
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
                title="制图规定"
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
