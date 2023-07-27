import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  Upload,
  InputNumber,
} from 'antd';
import React, { useState } from 'react';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const { RangePicker } = DatePicker;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function Edit() {
  const [form] = Form.useForm();

  const onFinish = (values: string) => {
    console.log('Received values of form: ', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="010">010</Option>
        <Option value="011">02</Option>
        <Option value="011">031</Option>
        <Option value="011">032</Option>
        <Option value="011">051</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: '010',
      }}
      style={{ maxWidth: 600 }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="이메일"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="프로필"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload action="/upload.do" listType="picture-card">
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item
        name="password"
        label="비밀번호"
        rules={[
          {
            required: true,
            message: '비밀번호를 입력해주세요!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="비밀번호 확인"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('비밀번호가 맞지않습니다'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="name"
        label="이름"
        rules={[
          {
            required: true,
            message: '이름은 필수항목입니다',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="전화번호"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="일정 선택">
        <RangePicker />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          수정완료
        </Button>
      </Form.Item>
    </Form>
  );
}
