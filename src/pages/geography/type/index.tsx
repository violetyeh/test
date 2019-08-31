import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Progress, Tooltip, Tag } from "antd";
import styles from '../style.less';
import Search from "./Search";
import Save from "./Save";

interface TypeProps {

}

interface TypeState {
    saveVisible: boolean;
    data: any[];
    currentItem: any;
}

const mockData = [
    {
       id: 'VG10651',
       zc:'起重吊装工程',
       zhonglei:'采用非常规起重设备、方法，且单件起吊重量在100KN及以上的起吊工程',
       mingcheng:'很危险',
       shengchan:'admin',
       process:50,
    },
    {
        id: 'VG10652',
        zc:'其它',
        zhonglei:'采用新技术、新工艺、新材料但无相关技术标准的危险性大的工程',
        mingcheng:'很危险',
        shengchan:'violet',
        process:70,
     },
     {
        id: 'VG10653',
        zc:'安装拆卸工程',
        zhonglei:'采用非常规起重设备、方法',
        mingcheng:'一般危险',
        shengchan:'adminuser',
        process:90,
     },
     {
        id: 'VG10654',
        zc:'其它 ',
        zhonglei:'采用新技术、新工艺、新材料但无相关技术标准的危险性大的工程',
        mingcheng:'超过一定规模',
        shengchan:'test',
        process:99,
     },
     {
        id: 'VG10655',
        zc:'爆破工程',
        zhonglei:'采用爆破拆除的工程',
        mingcheng:'一般危险',
        shengchan:'admin',
        process:50,
     },
     {
        id: 'VG10656',
        zc:'拆除工程',
        zhonglei:'采用爆破拆除的工程',
        mingcheng:'超过一定规模',
        shengchan:'example',
        process:60,
     },
     {
        id: 'VG10657',
        zc:' 安装拆卸工程',
        zhonglei:'采用非常规起重设备、方法',
        mingcheng:'很危险',
        shengchan:'test',
        process:43,
     },
     {
        id: 'VG10658',
        zc:'起重吊装工程',
        zhonglei:'采用非常规起重设备、方法，且单件起吊重量在100KN及以上的起吊工程',
        mingcheng:'超过一定规模',
        shengchan:'admin',
        process:22,
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
            title: '编号',
            dataIndex: 'id',
        },
        {
            title: '类别',
            dataIndex: 'zc',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '危险源内容',
            dataIndex: 'zhonglei',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '危险源程度',
            dataIndex: 'mingcheng',
            render: (text) => <Tag color="#AA2222">{text}</Tag>,
        },
        
        {
            title: '负责管理员',
            dataIndex: 'shengchan',
            render: (text) => <Tag color="Violet">{text}</Tag>,
        },
       
        {
            title: '管理效率',
            dataIndex: 'process',
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
        const { saveVisible, data, currentItem } = this.state;
        return (
            <PageHeaderWrapper
                title="安全质量预警"
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
            </PageHeaderWrapper>
        );
    }
}

export default Type;
