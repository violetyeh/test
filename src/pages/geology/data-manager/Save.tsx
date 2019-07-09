import { Component } from 'react';
import { Form, Modal, Input, message, Radio } from 'antd';
import React from 'react';
import styles from '../style.less';
import { FormComponentProps } from 'antd/lib/form';

interface SaveProps extends FormComponentProps {
  handleSaveVisible: () => void;
  currentItem: {};
}

interface SaveState { }
class Save extends Component<SaveProps, SaveState> {
  handleSave = () => {
    message.error('设备已离线，无法保存数据');
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    const { form: { getFieldDecorator }, handleSaveVisible, currentItem } = this.props;

    return (
      <Modal
        title="媒体发布数据编辑"
        className={styles.standardListForm}
        width={640}
        destroyOnClose
        visible
        onCancel={handleSaveVisible}
        onOk={this.handleSave}

      >
        <Form {...formItemLayout} layout="vertical">
          <Form.Item key="id" label="数据编号" >
            {getFieldDecorator('id', {
              initialValue: currentItem.id,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item key="time" label="媒体发布时间" >
            {getFieldDecorator('time', {
              initialValue: currentItem.time,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item key="type" label="媒体类型" >
            {getFieldDecorator('type', {
              initialValue: currentItem.type,
            })(
              <Radio.Group defaultValue="a" buttonStyle="solid">
                <Radio.Button value="a">产品宣传</Radio.Button>
                <Radio.Button value="b">影视宣传</Radio.Button>
                <Radio.Button value="c">公告宣告</Radio.Button>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item key="creator" label="媒体内容" >
            {getFieldDecorator('creator', {
              initialValue: currentItem.creator,
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
