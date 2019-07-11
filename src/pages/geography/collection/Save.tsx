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
                title="编辑检测参数"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="试验编号" >
                        {getFieldDecorator('id', {
                            initialValue: currentItem.id,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="tiji1" label="试验体积" >
                        {getFieldDecorator('tiji1', {
                            initialValue: currentItem.tiji1,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="tiji2" label="测定体积" >
                        {getFieldDecorator('tiji2', {
                            initialValue: currentItem.tiji2,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="zhiliang" label="样品质量" >
                        {getFieldDecorator('zhiliang', {
                            initialValue: currentItem.zhiliang,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="xisi" label="稀释倍数" >
                        {getFieldDecorator('xisi', {
                            initialValue: currentItem.xisi,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="quxian" label="合格曲线" >
                        {getFieldDecorator('quxian', {
                            initialValue: currentItem.quxian,
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
