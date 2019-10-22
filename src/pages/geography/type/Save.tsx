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
                title="设置计重收费"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="车牌号" >
                        {getFieldDecorator('id', {
                            initialValue: currentItem.id,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="mc" label="轴型" >
                        {getFieldDecorator('mc', {
                            initialValue: currentItem.mc,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="gg" label="车货总重（KG）" >
                        {getFieldDecorator('gg', {
                            initialValue: currentItem.gg,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="hz" label="是否计重完成" >
                        {getFieldDecorator('hz', {
                            initialValue: currentItem.hz,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="yy" label="总费用" >
                        {getFieldDecorator('yy', {
                            initialValue: currentItem.yy,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                   
                    <Form.Item key="jd" label="超重费用" >
                        {getFieldDecorator('jd', {
                            initialValue: currentItem.jd,
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
