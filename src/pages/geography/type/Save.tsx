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
                title="编辑空间存储利用信息"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="编号" >
                        {getFieldDecorator('id', {
                            initialValue: currentItem.id,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="zc" label="磁盘组成" >
                        {getFieldDecorator('zc', {
                            initialValue: currentItem.zc,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="zhonglei" label="所属控制器" >
                        {getFieldDecorator('zhonglei', {
                            initialValue: currentItem.zhonglei,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="mingcheng" label="已占空间" >
                        {getFieldDecorator('mingcheng', {
                            initialValue: currentItem.mingcheng,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="songjian" label="分布式逻辑卷个数" >
                        {getFieldDecorator('songjian', {
                            initialValue: currentItem.songjian,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="shengchan" label="资源个数" >
                        {getFieldDecorator('shengchan', {
                            initialValue: currentItem.shengchan,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="chandi" label="总空间" >
                        {getFieldDecorator('chandi', {
                            initialValue: currentItem.chandi,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    
                    <Form.Item key="process" label="空间利用率（%）" >
                        {getFieldDecorator('process', {
                            initialValue: currentItem.process,
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
