import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/logo.png'

const Login = () => {
    const onFinish = (values) => {
        console.log(values);
    };

    return (
        <div className="login">
            <Card className="login-container">
                <img className="login-logo" src={logo} alt="" />
                {/* 登录表单 */}
                <Form validateTrigger={['onBlur']} onFinish={onFinish}>
                    <Form.Item
                        //多条校验规则,顺序执行,如果前面规则不通过,后面规则不执行
                        name='mobile'
                        rules={[
                            { required: true, message: '手机号不能为空!' },
                            { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确!'}
                        ]}
                    >
                        <Input size="large" placeholder="请输入手机号" />
                    </Form.Item>
                    <Form.Item
                        name='code'
                        rules={[
                            { required: true, message: '验证码不能为空!' },
                            { pattern: /^\d{6}$/, message: '验证码格式不正确!'}
                        ]}
                    >
                        <Input size="large" placeholder="请输入验证码" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" block>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login
