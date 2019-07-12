import { Component } from "react";
import { Form, Modal, Input, message, renPicker } from "antd";
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
                title="编辑检测设置"
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
                    <Form.Item key="lx" label="检测类型" >
                        {getFieldDecorator('lx', {
                            initialValue: currentItem.lx,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="ren" label="检测负责人" >
                        {getFieldDecorator('ren', {
                            initialValue: currentItem.ren,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="js" label="检测技术类型" >
                        {getFieldDecorator('js', {
                            initialValue: currentItem.js,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="process" label="检测进度（%）" >
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
