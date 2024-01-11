import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import axios from 'axios';
import { useState } from "react";
import { useHistory } from 'react-router-dom';

// react-bootstrap components
import {
    Badge,
    Button,
    Card,
    Form,
    Navbar,
    Nav,
    Container,
    Row,
    Col
} from "react-bootstrap";
import { data } from "jquery";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleLogin = () => {
        const userCredentials = {
            username: username,
            password: password,
        };
        // Gọi API với Axios
        axios.post('REACT_APP_API_URL/auth', userCredentials)
            .then(response => {
                // Xử lý dữ liệu từ backend
                console.log('Response from server:', response.data);
                // Thực hiện các bước xác thực người dùng thành công
                history.push('/admin');
                console.log('mk đúng');
            })
            .catch(error => {
                console.error('Error during API call:', error);
                // Xử lý lỗi nếu có
                console.log('mk sai');

            });
    };
    return (
        <>
            <Container >
                <Row>
                    <Col md="12" style={{ display: "flex", alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                        <Form>
                            <Row >
                                <Col className="px-1" md="12">
                                    <Form.Group>
                                        <label>Tên đăng nhập / Email:</label>
                                        <label style={{ color: 'red', fontSize: '16px' }}>*</label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Username"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '10px' }}>
                                <Col className="px-1" md="12">
                                    <Form.Group>
                                        <label>Mật khẩu:</label>
                                        <label style={{ color: 'red', fontSize: '16px' }}>*</label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: '10px' }}>
                                <Col className="px-1" md="12" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        className="btn-fill pull-right"
                                        style={{ marginTop: '15px' }}
                                        onClick={handleLogin}
                                    >
                                        Đăng nhập
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default Login;