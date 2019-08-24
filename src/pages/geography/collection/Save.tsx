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
                title="编辑行政许可事项"
                className={styles.standardListForm}
                width={640}
                destroyOnClose
                visible
                onCancel={handleSaveVisible}
                onOk={this.handleSave}

            >
                <Form {...formItemLayout} layout="vertical">
                    <Form.Item key="id" label="办件编号" >
                        {getFieldDecorator('id', {
                            initialValue: currentItem.id,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    
                    <Form.Item key="touguang" label="事项名称" >
                        {getFieldDecorator('touguang', {
                            initialValue: currentItem.touguang,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                   
                    <Form.Item key="duizhao" label="受理部门" >
                        {getFieldDecorator('duizhao', {
                            initialValue: currentItem.duizhao,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="zt" label="受理状态" >
                        {getFieldDecorator('zt', {
                            initialValue: currentItem.zt,
                        })(
                            <Radio.Group defaultValue="a" buttonStyle="solid">
                                <Radio.Button value="a">未办结</Radio.Button>
                                <Radio.Button value="b">已办结</Radio.Button>
                                <Radio.Button value="c">未受理</Radio.Button>
                                <Radio.Button value="d">已受理</Radio.Button>
                             </Radio.Group>,
                        )}
                    </Form.Item>
                    <Form.Item key="tongdao" label="管理员" >
                        {getFieldDecorator('tongdao', {
                            initialValue: currentItem.tongdao,
                        })(
                            <Input />,
                        )}
                    </Form.Item>
                    <Form.Item key="xq" label="E-mail" >
                        {getFieldDecorator('xq', {
                            initialValue: currentItem.xq,
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
