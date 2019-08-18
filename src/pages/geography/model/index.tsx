import { Component, Fragment } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import React from "react";
import Table, { ColumnProps } from "antd/lib/table";
import { Card, Switch, Divider, message, Badge, Tag, Progress } from "antd";
import Search from "./Search";
import Save from "./Save";
import styles from "../style.less";

interface ModelProps {

}

interface ModelState {
    saveVisible: boolean,
    data: any[],
    currentItem: any,
}

const mockData = [
    {
        id: 'http://localhost:8001/',
        sp:'100',
        shijian:'工作',
        biaozhun:'项目资料',
        jiance:'12',
        process: 88,
        status: '启用',
    },
    {
        id: 'http://localhost:8000/',
        sp:'102',
        shijian:'娱乐',
        biaozhun:'小说《斗破苍穹》',
        jiance:'12',
        process: 99,
        status: '启用',
    },
    {
        id: 'http://localhost:8003/',
        sp:'101',
        shijian:'游戏',
        biaozhun:'《魔兽世界》',
        jiance:'14',
        process: 5,
        status: '启用',
    },
    {
        id: 'http://localhost:8002/',
        sp:'105',
        shijian:'音乐',
        biaozhun:'张杰所有歌曲',
        jiance:'15',
        process: 95,
        status: '启用',
    },
    {
        id: 'http://localhost:8001/',
        sp:'101',
        shijian:'学习',
        biaozhun:'小学语文教材',
        jiance:'11',
        process: 100,
        status: '启用',
    },
    {
        id: 'http://localhost:8003/',
        sp:'103',
        shijian:'资料',
        biaozhun:'《有关探索宇宙的文献》',
        jiance:'18',
        process: 60,
        status: '启用',
    },
    {
        id: 'http://localhost:8000/',
        sp:'105',
        shijian:'照片',
        biaozhun:'旅游风景照片',
        jiance:'20',
        process: 40,
        status: '启用',
    },
    {
        id: 'http://localhost:8001/',
        sp:'103',
        shijian:'电视剧',
        biaozhun:'《琅琊榜》',
        jiance:'16',
        process: 30,
        status: '启用',
    },
   
    
]

class Model extends Component<ModelProps, ModelState>{
    state: ModelState = {
        saveVisible: false,
        data: mockData,
        currentItem: {},
    }

    columns: ColumnProps<any>[] = [
        {
            title: '位置',
            dataIndex: 'id',
        },
        {
            title: '磁盘内存大小（GB）',
            dataIndex: 'sp',
            render: (text) => <Tag color="RED">{text}</Tag>,
        },
        {
            title: '磁盘分类',
            dataIndex: 'shijian',
            render: (text) => <Tag color="blue">{text}</Tag>,
        },
        {
            title: '存储资源信息',
            dataIndex: 'biaozhun',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        {
            title: '磁盘盘数',
            dataIndex: 'jiance',
            render: (text) => <Tag color="magenta">{text}</Tag>,
        },
        
        {
            title: '磁盘存储占比空间',
            dataIndex: 'process',
            render: (text) => <Progress type="circle" percent={text} size="small" />,
        },

        {
            title: '是否启用',
            dataIndex: 'status',
            render: () => <Switch checkedChildren="启用" unCheckedChildren="禁用" />,
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
                title="磁盘空间数据"
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

export default Model;
