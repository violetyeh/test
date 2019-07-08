import { Component } from 'react';
import { Form, Modal, Input, message, Radio } from 'antd';
import React from 'react';
import styles from '../style.less';
import { FormComponentProps } from 'antd/lib/form';

interface SaveProps extends FormComponentProps {
  handleSaveVisible: () => void;
  currentItem: {},
}

interface SaveState { }
class Save extends Component<SaveProps, SaveState> {
  handleSave = () => {
    message.error('系统处于离线状态，无法进行此操作');
  };
  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    const { form: { getFieldDecorator }, handleSaveVisible, currentItem } = this.props;
    return (
      <Modal
        title="编辑政务文件数据"
        className={styles.standardListForm}
        width={640}
        destroyOnClose
        visible
        onCancel={handleSaveVisible}
        onOk={this.handleSave}

      >
        <Form {...formItemLayout} layout="vertical">
          <Form.Item key="id" label="文件编号" >
            {getFieldDecorator('id', {
              initialValue: currentItem.id,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item key="name" label="地区名称" >
            {getFieldDecorator('name', {
              initialValue: currentItem.name,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item key="date" label="数据共享交流时间" >
            {getFieldDecorator('date', {
              initialValue: currentItem.date,
            })(
              <Input />,
            )}
          </Form.Item>
          <Form.Item key="type" label="政务类型" >
            {getFieldDecorator('type', {
              initialValue: currentItem.type,
            })(
              <Radio.Group defaultValue="a" buttonStyle="solid">
                <Radio.Button value="a">政务办公</Radio.Button>
                <Radio.Button value="b">政策法规</Radio.Button>
                <Radio.Button value="c">政务公文</Radio.Button>
                <Radio.Button value="d">财政管理</Radio.Button>
              </Radio.Group>,
            )}
          </Form.Item>
          <Form.Item key="creator" label="政务负责人" >
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
