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
                title="编辑公路环境参数信息"
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
                    <Form.Item key="mc" label="公路名称" >
                        {getFieldDecorator('mc', {
                            initialValue: currentItem.mc,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="gg" label="工况状态" >
                        {getFieldDecorator('gg', {
                            initialValue: currentItem.gg,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="hz" label="地面超载（Kpa）" >
                        {getFieldDecorator('hz', {
                            initialValue: currentItem.hz,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="jd" label="检测进度（%）" >
                        {getFieldDecorator('jd', {
                            initialValue: currentItem.jd,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="status" label="自动检测" >
                        {getFieldDecorator('status', {
                            initialValue: currentItem.status,
                        })(
                            <Radio.Group defaultValue="a" buttonStyle="solid">
                               <Radio.Button value="a">自动</Radio.Button>
                               <Radio.Button value="b">手动</Radio.Button>
                            </Radio.Group>,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create<SaveProps>()(Save);
