import { Component } from "react";
import { Form, Modal, Input, message } from "antd";
import { FormComponentProps } from "antd/lib/form";
import React from "react";
import styles from '../style.less';
import { Dispatch } from "redux";

interface SaveProps extends FormComponentProps {
    dispatch?: Dispatch<any>;
    handleSaveVisible: () => void;
    currentItem: {};
}

interface SaveState {
}
class Save extends Component<SaveProps, SaveState>{

    state: SaveState = {
        roleList: [],
    }

    handleSave = () => {
        message.success('保存成功');
    }

    render() {

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };

        const { form: { getFieldDecorator }, handleSaveVisible, currentItem } = this.props;
        console.log(currentItem, 'item');
        return (
            <Modal
                title="编辑流量监测信息"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="监测编号" >
                        {getFieldDecorator('id', {
                            initialValue: currentItem.id,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="sj" label="监测时间" >
                        {getFieldDecorator('sj', {
                            initialValue: currentItem.sj,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="mc" label="蓄水池入口瞬时流量（t）" >
                        {getFieldDecorator('mc', {
                            initialValue: currentItem.mc,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="tiji2" label="清水池出口累计流量（t）" >
                        {getFieldDecorator('tiji2', {
                            initialValue: currentItem.tiji2,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="zhiliang" label="今日进水量（t）" >
                        {getFieldDecorator('zhiliang', {
                            initialValue: currentItem.zhiliang,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="zb" label="本月进水量（t）" >
                        {getFieldDecorator('zb', {
                            initialValue: currentItem.zb,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create<SaveProps>()(Save);
