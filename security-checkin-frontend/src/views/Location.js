import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { getAllLocation } from "services/locationServices";
import { createLocation } from "services/locationServices";

function Location() {
  const [location, setLocation] = useState([]);

  useEffect(() => {
    getAllLocation()
      .then(res => {
        setLocation(res.data);
      })
      .catch(e => {
        console.log(e);
      })
  }, [])

  const handleLocation = (data) => {
    createLocation(data)
      .then(res => {
        alert('Create location successfully!')
      })
      .catch(e => {
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
                  borderRadius: '4px',
                  borderWidth: '0px',
                  padding: '4px 8px'
                }}
                onClick={() => handleLocation({
                  locationname: 'Cong ty TDD',
                  latitude: '20.9973733',
                  longtitude: '105.8225823'
                })}
              >
                Add location
              </button>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0" style={{ fontSize: '15px', fontWeight: 'bold', color: '#000' }}>ID</th>
                    <th className="border-0" style={{ fontSize: '15px', fontWeight: 'bold', color: '#000' }}>Tên địa điểm</th>
                    <th className="border-0" style={{ fontSize: '15px', fontWeight: 'bold', color: '#000' }}>Kinh độ</th>
                    <th className="border-0" style={{ fontSize: '15px', fontWeight: 'bold', color: '#000' }}>Vĩ độ</th>
                    <th className="border-0" style={{ fontSize: '15px', fontWeight: 'bold', color: '#000' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {location.map((item, index) => (
                    <tr key={index}>
                      <td>{index}</td>
                      <td style={{ cursor: 'pointer', color: '#2686ed' }}>{item.name}</td>
                      <td>{item.latitude}</td>
                      <td>{item.longtitude}</td>
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

export default Location;
