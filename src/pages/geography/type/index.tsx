import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Divider, message, Card, Switch, Progress, Tooltip, Tag, Checkbox } from "antd";
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
        id: 'XXCY21',
        mc:'一切顺利',
        gg:'医院建筑工程二期',
        hz:'#0QWSA无人机',
        jd:98,
        state: 1,
     },
     {
         id: 'XXCY22',
         mc:'进度拖延，工期内不能完成工程',
         gg:'隧道建筑工程一期',
         hz:'#0ASZX无人机',
         jd:100,
         state: 1,
      },
      {
         id: 'XXCY23',
         mc:'施工人员偷懒',
         gg:'隧道建筑工程二期',
         hz:'#2ASZX无人机',
         jd:56,
         state: 1,
      },
      {
         id: 'XXCY24',
         mc:'材料不合格',
         gg:'桥梁建筑工程一期',
         hz:'#1ASZX无人机',
         jd:74,
         state: 1,
      },
      {
         id: 'XXCY25',
         mc:'脚架出现安全质量问题，危害施工人员生命安全',
         gg:'桥梁建筑工程二期',
         hz:'#0ASZX无人机',
         jd:95,
         state: 1,
      },
    {
        id: 'XXCY26',
        mc:'施工人员积极工作',
        gg:'学校建筑工程一期',
        hz:'#3QWSA无人机',
        jd:76,
        state: 1,
     },
     {
        id: 'XXCY27',
        mc:'地基未打好',
        gg:'医院建筑工程一期',
        hz:'#2QWSA无人机',
        jd:100,
        state: 1,
     },
     {
        id: 'XXCY28',
        mc:'进度提前，一切顺利',
        gg:'学校建筑工程二期',
        hz:'#1QWSA无人机',
        jd:88,
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
            title: '序号',
            dataIndex: 'id',
        },
        {
            title: '监理工程名称',
            dataIndex: 'gg',
            render: (text) => <Tag color="black">{text}</Tag>,
        },
        
        {
            title: '无人机名称',
            dataIndex: 'hz',
            render: (text) => <Tag color="BLUE">{text}</Tag>,
        },
        {
            title: '信息内容',
            dataIndex: 'mc',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
       
        {
            title: '监理进度',
            dataIndex: 'jd',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },
        {
            title: '采用结果',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="采用" unCheckedChildren="不采用" />,
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
                title="采用信息管理"
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
