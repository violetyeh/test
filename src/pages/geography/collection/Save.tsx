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
                title="编辑订票信息"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="订票单号" >
                        {getFieldDecorator('id', {
                            initialValue: currentItem.id,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="name" label="订票人" >
                        {getFieldDecorator('name', {
                            initialValue: currentItem.name,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="dp" label="订票时间" >
                        {getFieldDecorator('dp', {
                            initialValue: currentItem.dp,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="xm" label="起点" >
                        {getFieldDecorator('xm', {
                            initialValue: currentItem.xm,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="jg" label="终点" >
                        {getFieldDecorator('jg', {
                            initialValue: currentItem.jg,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="dw" label="票价" >
                        {getFieldDecorator('dw', {
                            initialValue: currentItem.dw,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="pd" label="发车日期" >
                        {getFieldDecorator('pd', {
                            initialValue: currentItem.pd,
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
