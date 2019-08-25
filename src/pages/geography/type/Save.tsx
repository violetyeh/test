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
                title="编辑云主机配置信息"
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
                    <Form.Item key="mc" label="方案名称" >
                        {getFieldDecorator('mc', {
                            initialValue: currentItem.mc,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="gg" label="CPU(个)" >
                        {getFieldDecorator('gg', {
                            initialValue: currentItem.gg,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="hz" label="内存（MB）" >
                        {getFieldDecorator('hz', {
                            initialValue: currentItem.hz,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="jd" label="硬盘（G）" >
                        {getFieldDecorator('jd', {
                            initialValue: currentItem.jd,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="sl" label="网卡（个）" >
                        {getFieldDecorator('sl', {
                            initialValue: currentItem.sl,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="status" label="配置状态" >
                        {getFieldDecorator('status', {
                            initialValue: currentItem.status,
                        })(
                            <Radio.Group defaultValue="a" buttonStyle="solid">
                               <Radio.Button value="a">配置成功</Radio.Button>
                               <Radio.Button value="b">配置失败</Radio.Button>
                            </Radio.Group>,
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create<SaveProps>()(Save);
