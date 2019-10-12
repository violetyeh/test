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
        id: 'VG10654',
        zc:'海蓝假期一期工程进度报告 ',
        zhonglei:'K0+000～K0+460段路面150mm级配碎石、300mm水泥稳定碎石施工全部完成。',
        mingcheng:'未上报',
        shengchan:'test',
        process:99,
     },
     {
        id: 'VG10655',
        zc:'海蓝假期二期工程进度报告',
        zhonglei:'K0+000～K0+460段横穿路面强电管、弱电管、雨污管施工全部完成。',
        mingcheng:'审核中',
        shengchan:'admin',
        process:50,
     },
     {
        id: 'VG10656',
        zc:'海蓝假期三期工程进度报告',
        zhonglei:'K0+000～紫金大道段、变电站～墨龙路段增加电缆沟施工完成。',
        mingcheng:'未上报',
        shengchan:'example',
        process:60,
     },
     {
        id: 'VG10657',
        zc:' 翡翠绿洲一期工程进度报告',
        zhonglei:'K0+460段右幅混凝土路面浇筑完成。',
        mingcheng:'已上报',
        shengchan:'test',
        process:43,
     },
     {
        id: 'VG10658',
        zc:'翡翠绿洲二期工程进度报告',
        zhonglei:'工程施工进展顺利',
        mingcheng:'未上报',
        shengchan:'admin',
        process:22,
     },
    {
       id: 'VG10651',
       zc:'绿城国际一期工程进度报告',
       zhonglei:'K0+000～K0+460段电缆沟、电力井，弱电管、弱电井施工全部完成。',
       mingcheng:'已上报',
       shengchan:'admin',
       process:50,
    },
    {
        id: 'VG10652',
        zc:'绿城国际二期工程进度报告',
        zhonglei:'K0+000～K0+460段雨水管、雨水井施工全部完成。',
        mingcheng:'已上报',
        shengchan:'violet',
        process:70,
     },
     {
        id: 'VG10653',
        zc:'绿城国际三期工程进度报告',
        zhonglei:'K0+000～K0+460段路基换填600mm片石、400mm土夹石施工全部完成。',
        mingcheng:'审核中',
        shengchan:'adminuser',
        process:90,
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
            title: '进度报告名称',
            dataIndex: 'zc',
            render: (text) => <Tag color="GREEN">{text}</Tag>,
        },
        {
            title: '进度报告内容',
            dataIndex: 'zhonglei',
            render: (text) => <Tag color="green">{text}</Tag>,
        },
        {
            title: '进度报告状态',
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
                title="进度报告"
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
