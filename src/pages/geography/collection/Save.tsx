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
                title="编辑配置项信息"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="ID" >
                        {getFieldDecorator('id', {
                            initialValue: currentItem.id,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="fenceng" label="架构" >
                        {getFieldDecorator('remark', {
                            initialValue: currentItem.fenceng,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    
                    <Form.Item key="name" label="显示" >
                        {getFieldDecorator('name', {
                            initialValue: currentItem.name,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                   
                    <Form.Item key="leixing" label="网络" >
                        {getFieldDecorator('leixing', {
                            initialValue: currentItem.leixing,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="jishu" label="通讯" >
                        {getFieldDecorator('jishu', {
                            initialValue: currentItem.jishu,
                        })(
                            <Input.TextArea rows={2} />,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create<SaveProps>()(Save);
