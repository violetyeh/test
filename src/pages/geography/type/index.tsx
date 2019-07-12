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
        id: 'SER1292',
        mc: '白菜农残检测',
        jd: 100,
        cp: '白菜',
        ren: '王思佳',
        state: '启用',
    },
    {
        id: 'SER129256',
        mc: '四季豆农残检测',
        jd: 16,
        cp: '四季豆',
        ren: '赵玉玉',
        state: '启用',
    },
    {
        id: 'SER129216',
        mc: '豇豆农残检测',
        jd: 100,
        cp: '豇豆',
        ren: '王思佳',
        state: '启用',
    },
    {
        id: 'SER129261',
        mc: '白菜农残检测',
        jd: 100,
        cp: '白菜',
        ren: '王思佳',
        state: '启用',
    },
    {
        id: 'SER129278',
        mc: '丝瓜农残检测',
        jd: 75,
        cp: '丝瓜',
        ren: '赵宇',
        state: '启用',
    },
    {
        id: 'SER129206',
        mc: '西瓜农残检测',
        jd: 66,
        cp: '西瓜',
        ren: '刘婉怡',
        state: '启用',
    },
    {
        id: 'SER129274',
        mc: '白菜农残检测',
        jd: 100,
        cp: '白菜',
        ren: '王思佳',
        state: '启用',
    },
    {
        id: 'SER129203',
        mc: '番茄农残检测',
        jd: 88,
        cp: '番茄',
        ren: '陈婉',
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
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '农残检测名称',
            dataIndex: 'mc',
        },
        {
            title: '检测进度',
            dataIndex: 'jd',
            render: (text: number) =>
                <div>
                    <Tooltip title="3 done / 3 in progress / 4 to do">
                        <Progress percent={text} successPercent={text / 2} type="circle" />
                    </Tooltip>
                </div>,

        },
        {
            title: '检测产品',
            dataIndex: 'cp',
        },
        {
            title: '负责人',
            dataIndex: 'ren',
            render: (text) => <Tag color="#2db7f5">{text}</Tag>,
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
                title="检测数据分析管理"
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
