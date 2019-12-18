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
                title="设置视觉参数"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="序号" >
                        {getFieldDecorator('id', {
                            initialValue: currentItem.id,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="fl" label="视觉系统" >
                        {getFieldDecorator('fl', {
                            initialValue: currentItem.fl,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="mc" label="固定视觉" >
                        {getFieldDecorator('mc', {
                            initialValue: currentItem.mc,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="ma" label="终端地址" >
                        {getFieldDecorator('ma', {
                            initialValue: currentItem.ma,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                   
                    <Form.Item key="nl" label="通讯方式" >
                        {getFieldDecorator('nl', {
                            initialValue: currentItem.nl,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                <Form.Item key="cs" label="通讯参数" >
                        {getFieldDecorator('cs', {
                            initialValue: currentItem.cs,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
               
                <Form.Item key="cd" label="密码长度" >
                        {getFieldDecorator('cd', {
                            initialValue: currentItem.cd,
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
