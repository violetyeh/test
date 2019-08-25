import { Component } from "react";
import { Form, Modal, Input, message, Select, Radio } from "antd";
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
                title="编辑安全检测信息"
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
                    <Form.Item key="mc" label="防火墙名称" >
                        {getFieldDecorator('mc', {
                            initialValue: currentItem.mc,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="gg" label="防火墙调试级别" >
                        {getFieldDecorator('gg', {
                            initialValue: currentItem.gg,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="hz" label="权限" >
                        {getFieldDecorator('hz', {
                            initialValue: currentItem.hz,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="jd" label="安全检测进度（%）" >
                        {getFieldDecorator('jd', {
                            initialValue: currentItem.jd,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="status" label="访问权限" >
                        {getFieldDecorator('status', {
                            initialValue: currentItem.status,
                        })(
                            <Radio.Group defaultValue="a" buttonStyle="solid">
                               <Radio.Button value="a">允许访问</Radio.Button>
                               <Radio.Button value="b">不允许</Radio.Button>
                            </Radio.Group>,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create<SaveProps>()(Save);
