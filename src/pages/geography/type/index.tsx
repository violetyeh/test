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
       id: 'KCBH01',
       zhonglei:'1231m/s',
       mingcheng:'1541m/s',
       songjian:'同意',
       shengchan:'孟娜',
       chandi:'不许可',
       riqi:'1259m/s',
       state: 1,
    },
    {
        id: 'KCBH02',
        zhonglei:'1247m/s',
        mingcheng:'1521m/s',
        songjian:'不同意',
        shengchan:'刘海波',
        chandi:'不受理',
        riqi:'1741m/s',
        state: 1,
     },
     {
        id: 'KCBH03',
        zhonglei:'1472m/s',
        mingcheng:'1254m/s',
        songjian:'不同意',
        shengchan:'石桂艳',
        chandi:'不受理',
        riqi:'1354m/s',
        state: 1,
     },
     {
        id: 'KCBH04',
        zhonglei:'1149m/s',
        mingcheng:'1152m/s',
        songjian:'同意',
        shengchan:'李琦',
        chandi:'不许可',
        riqi:'1365m/s',
        state: 1,
     },
     {
        id: 'KCBH05',
        zhonglei:'1524m/s',
        mingcheng:'1245m/s',
        songjian:'同意',
        shengchan:'陈云杰',
        chandi:'不许可',
        riqi:'1654m/s',
        state: 1,
     },
     {
        id: 'KCBH06',
        zhonglei:'1475m/s',
        mingcheng:'1546m/s',
        songjian:'不同意',
        shengchan:'张玲',
        chandi:'不许可',
        riqi:'1654m/s',
        state: 1,
     },
     {
        id: 'KCBH07',
        zhonglei:'1542m/s',
        mingcheng:'1421m/s',
        songjian:'不同意',
        shengchan:'江米意',
        chandi:'不许可',
        riqi:'1365m/s',
        state: 1,
     },
     {
        id: 'KCBH08',
        zhonglei:'1542m/s',
        mingcheng:'1653m/s',
        songjian:'同意',
        shengchan:'王思琪',
        chandi:'不受理',
        riqi:'1235m/s',
        state: 1,
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
            title: '负责医生',
            dataIndex: 'shengchan',
        },
        {
            title: '晶体声速',
            dataIndex: 'zhonglei',
            render: (text) => <Tag color="black">{text}</Tag>,
        },
        {
            title: '前房声速',
            dataIndex: 'mingcheng',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '玻璃体声速',
            dataIndex: 'riqi',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        
       
       
       
        {
            title: '扫描状态',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="已扫描" unCheckedChildren="未扫描" />,
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
                title="病人扫描信息"
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
