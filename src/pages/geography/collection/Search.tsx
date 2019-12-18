import React, { Component } from "react";
import { Form, Row, Col, Input, Button, Divider } from "antd";
import { FormComponentProps } from "antd/lib/form";

interface SearchProps extends FormComponentProps {
    handleSave: () => void;
}
interface SearchState {

}

class Search extends Component<SearchProps, SearchState>{

    render() {
        const { form: { getFieldDecorator }, handleSave } = this.props;
        return (
            <Form layout='inline'>
                <Row gutter={{ md: 8, lg: 4, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <Form.Item label="电影类型">
                            {getFieldDecorator('name')(<Input placeholder="请输入" />)}
                        </Form.Item>
                    </Col>
                    <Col md={8} sm={24}>
                        <Form.Item label="类别">
                            {getFieldDecorator('remark')(<Input placeholder="请输入" />)}
                        </Form.Item>
                    </Col>
                    <Col md={8} sm={24}>
                        <div style={{ overflow: 'hidden' }}>
                            <div style={{ float: 'right', marginBottom: 24 }}>
                                <Button icon="plus" htmlType="button" onClick={handleSave}>添加电影排期信息</Button>
                                <Divider type="vertical" />
                                <Button icon="search" type="primary" htmlType="submit">查询</Button>
                                <Button style={{ marginLeft: 8 }} onClick={() => { }}>重置</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default Form.create<SearchProps>()(Search);
