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
        fl:'7e+006',
        mc:'20度0.00分E',
        ma:'63度0.00分E',
        cpu:'105度0.00分E',
        nc:'24度0.00分E',
        io:'6',
    },
    {
        id: 'STJ-ZT-NM-0035',
        fl:'7e+006',
        mc:'20度0.00分E',
        ma:'160度0.00分E',
        cpu:'25度0.00分E',
        nc:'102度0.00分E',
        io:'3',
    },
    {
        id: 'STJ-ZT-NM-0064',
        fl:'7e+005',
        mc:'145度0.00分E',
        ma:'30度0.00分E',
        cpu:'36度0.00分E',
        nc:'12度0.00分E',
        io:'13',
    },
    {
        id: 'STJ-ZT-NM-0078',
        fl:'7e+004',
        mc:'90度0.00分E',
        ma:'120度0.00分E',
        cpu:'10度0.00分E',
        nc:'134度0.00分E',
        io:'5',
    },
    {
        id: 'STJ-ZT-NM-0021',
        fl:'6e+005',
        mc:'120度0.00分E',
        ma:'130度0.00分E',
        cpu:'67度0.00分E',
        nc:'34度0.00分E',
        io:'12',
    },
    {
        id: 'STJ-ZT-NM-0035',
        fl:'7e+006',
        mc:'20度0.00分E',
        ma:'63度0.00分E',
        cpu:'56度0.00分E',
        nc:'39度0.00分E',
        io:'24',
    },
    {
        id: 'STJ-ZT-NM-0038',
        fl:'7e+007',
        mc:'30度0.00分E',
        ma:'148度0.00分E',
        cpu:'27度0.00分E',
        nc:'16度0.00分E',
        io:'24',
    },
    {
        id: 'STJ-ZT-NM-0021',
        fl:'7e+006',
        mc:'99度0.00分E',
        ma:'180度0.00分E',
        cpu:'45度0.00分E',
        nc:'0度0.00分E',
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
            title: '原始比例尺',
            dataIndex: 'fl',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '左边边界',
            dataIndex: 'mc',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '右边边界',
            dataIndex: 'ma',
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '上边边界',
            dataIndex: 'cpu', 
            render: (text) => <Tag color="red">{text}</Tag>,
        },
        {
            title: '下边边界',
            dataIndex: 'nc', 
            render: (text) => <Tag color="red">{text}</Tag>,
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
                title="海图图库管理"
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
