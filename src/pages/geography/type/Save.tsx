import { Component } from "react";
import { Form, Modal, Input, message, Radio } from "antd";
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
                title="编辑乘车常识"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="通知编号" >
                        {getFieldDecorator('id', {
                            initialValue: currentItem.id,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="mc" label="通知事件" >
                        {getFieldDecorator('mc', {
                            initialValue: currentItem.mc,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="hj" label="播报人" >
                        {getFieldDecorator('hj', {
                            initialValue: currentItem.hj,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                   
                    <Form.Item key="bs" label="车次" >
                        {getFieldDecorator('bs', {
                            initialValue: currentItem.bs,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="bcy" label="通知时间" >
                        {getFieldDecorator('bcy', {
                            initialValue: currentItem.bcy,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="jl" label="通报完成" >
                        {getFieldDecorator('jl', {
                            initialValue: currentItem.jl,
                        })(
                            <Radio.Group defaultValue="a" buttonStyle="solid">
                               <Radio.Button value="a">是</Radio.Button>
                               <Radio.Button value="b">否</Radio.Button>
                            </Radio.Group>,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create<SaveProps>()(Save);
