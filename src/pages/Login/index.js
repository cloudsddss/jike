import './index.scss'
import {Card, Form, Input, Button, message} from 'antd'
import logo from '@/assets/logo.png'
import {useDispatch} from "react-redux";
import {fetchLogin} from "@/store/modules";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const onFinish = async (values) => {
        try {
            await dispatch(fetchLogin(values))
            navigate('/')
            message.success('登录成功')
        } catch (error) {
            // 错误提示已在响应拦截器统一处理，这里只做兜底避免未捕获异常
            console.log('login failed:', error)
        }
    };
    const navigate = useNavigate()
    const dispatch = useDispatch()
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
