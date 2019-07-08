import { Component } from 'react';
import { Form, Modal, Input, message, Radio } from 'antd';
import React from 'react';
import styles from '../style.less';

interface SaveProps {
  handleSaveVisible: () => void;
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

    const { handleSaveVisible } = this.props;
    return (
      <Modal
        title="增加计量程序"
        className={styles.standardListForm}
        width={640}
        destroyOnClose
        visible
        onCancel={handleSaveVisible}
        onOk={this.handleSave}
      >
        <Form {...formItemLayout} layout="vertical">
          <Form.Item key="name" label="程序名称">
            <Input placeholder="请输入程序名称" />
          </Form.Item>
          <Form.Item key="model" label="计量模式">
            <Radio.Group defaultValue="a" buttonStyle="solid">
              <Radio.Button value="a">自动模式</Radio.Button>
              <Radio.Button value="b">手动模式</Radio.Button>
              <Radio.Button value="c">智能模式</Radio.Button>
              <Radio.Button value="d">半自动模式</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item key="experis" label="计量成分">
            <Input placeholder="请输入计量成分" />
          </Form.Item>
          <Form.Item key="review" label="判断标准">
            <Input placeholder="请输入判断标准" />
          </Form.Item>
          <Form.Item key="remark" label="备注">
            <Input.TextArea rows={2} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default Save;
