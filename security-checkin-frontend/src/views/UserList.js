import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { getAllUser } from "services/userServices";
import moment from "moment";
import { createUser } from "services/userServices";

function UserList() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getAllUser()
      .then(res => {
        setUserList(res.data);
      })
      .catch(e => {
        console.log(e);
      })
  }, [])

  const handleAddUser = (data) => {
    createUser(data)
      .then(res => {
        alert('Create user succesfully!')
      })
      .catch(e => {
        console.log(e);
        alert('Something when wrong!')
      })
  }

  return (
    <>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header style={{
              display: "flex",
              justifyContent: 'end'
            }}>
              <button
                style={{
                  backgroundColor: '#2686ed',
                  color: 'white',
                  borderWidth: '0px',
                  borderRadius: '4px',
                  padding: '4px 8px'
                }}
                onClick={() => handleAddUser({
                  userName: "linhda123",
                  password: "0123456789",
                  role: 'ADMIN',
                  name: 'Linh Do',
                  phone: '0363771010',
                  dob: '15-09-2001'
                })}
              >
                Add user
              </button>
              {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <Box sx={{ ...style, width: 400 }}>
                  <h2 id="parent-modal-title">Text in a modal</h2>
                  <p id="parent-modal-description">
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                  </p>
                  <ChildModal />
                </Box>
              </Modal> */}
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0" style={{ fontSize: '15px', fontWeight: 'bold', color: '#000' }}>ID</th>
                    <th className="border-0" style={{ fontSize: '15px', fontWeight: 'bold', color: '#000' }}>Username</th>
                    <th className="border-0" style={{ fontSize: '15px', fontWeight: 'bold', color: '#000' }}>Họ tên</th>
                    <th className="border-0" style={{ fontSize: '15px', fontWeight: 'bold', color: '#000' }}>Ngày sinh</th>
                    <th className="border-0" style={{ fontSize: '15px', fontWeight: 'bold', color: '#000' }}>Số điện thoại</th>
                    <th className="border-0" style={{ fontSize: '15px', fontWeight: 'bold', color: '#000' }}>Chức vụ</th>
                    <th className="border-0" style={{ fontSize: '15px', fontWeight: 'bold', color: '#000' }}>Hành động</th>

                  </tr>
                </thead>
                <tbody>
                  {userList.map((item, index) => (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{item.userName}</td>
                      <td>{item.name}</td>
                      <td>{moment(item.dob).format("DD-MM-YYYY")}</td>
                      <td>{item.phone}</td>
                      <td>{item.role}</td>
                      <td>
                        <EditIcon
                          style={{
                            backgroundColor: '#006000',
                            color: 'white',
                            padding: '3px',
                            borderRadius: '4px',
                            marginRight: '10px',
                            cursor: 'pointer'
                          }} />
                        <DeleteForeverIcon
                          style={{
                            backgroundColor: '#e53e3e',
                            color: '#ffffff',
                            padding: '3px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }} />
                      </td>
                    </tr>
                  ))}

                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default UserList;
