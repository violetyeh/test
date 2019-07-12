import { Component } from "react";
import { Form, Modal, Input, message, DatePicker } from "antd";
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
                title="编辑微生物检测设置"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="zl" label="样品种类" >
                        {getFieldDecorator('zl', {
                            initialValue: currentItem.zl,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="mc" label="样品名称" >
                        {getFieldDecorator('mc', {
                            initialValue: currentItem.mc,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="sj" label="送检单位" >
                        {getFieldDecorator('sj', {
                            initialValue: currentItem.sj,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="js" label="菌落计数" >
                        {getFieldDecorator('js', {
                            initialValue: currentItem.js,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="qw" label="气味" >
                        {getFieldDecorator('qw', {
                            initialValue: currentItem.qw,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="dx" label="大小" >
                        {getFieldDecorator('dx', {
                            initialValue: currentItem.dx,
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
