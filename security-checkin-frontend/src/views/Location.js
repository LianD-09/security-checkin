import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import {
  Card,
  Table,
  Row,
  Col,
  Form,
  Modal,
  Button,
} from "react-bootstrap";
import { deleteLocationById, getAllLocation, updateLocationById } from "../services/locationServices";
import { createLocation } from "../services/locationServices";
import QRCode from "qrcode.react";
import moment from "moment";
import {Calendar} from "antd";
import {useCheckinByDateAndLocation} from "../store/checkinLogs/function";

const AddModal = ({ isOpen, onSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longtitude, setLongtitude] = useState('');

  const handleSubmit = () => {
    onSubmit({
      name,
      latitude: parseFloat(latitude),
      longtitude: parseFloat(longtitude)
    });
    onClose();
  }

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add location</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Lotte Center"
              autoFocus
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              placeholder="21.031971"
              autoFocus
              required
              inputMode="numeric"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Longtitude</Form.Label>
            <Form.Control
              placeholder="105.812291"
              autoFocus
              required
              inputMode="numeric"
              value={longtitude}
              onChange={(e) => setLongtitude(e.target.value)}
            />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

const EditModal = ({ isOpen, onSubmit, onClose, data }) => {
  const [name, setName] = useState(data?.name ?? '');
  const [latitude, setLatitude] = useState(data?.latitude ?? '');
  const [longtitude, setLongtitude] = useState(data?.longtitude ?? '');

  useEffect(() => {
    setName(data?.name);
    setLatitude(data?.latitude);
    setLongtitude(data?.longtitude);
  }, [data]);

  const handleSubmit = () => {
    console.log(data?.id, {
      name,
      latitude: parseFloat(latitude),
      longtitude: parseFloat(longtitude)
    });
    onSubmit(data?.id, {
      name,
      latitude: parseFloat(latitude),
      longtitude: parseFloat(longtitude)
    });
    onClose();
  }

  return (
    <Modal show={isOpen} onHide={onClose} className={"modal-calendar"}>
      <Modal.Header closeButton>
        <Modal.Title>Edit location</Modal.Title>
      </Modal.Header>
      <Form >
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Lotte Center"
              autoFocus
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              placeholder="21.031971"
              autoFocus
              required
              inputMode="numeric"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Longtitude</Form.Label>
            <Form.Control
              placeholder="105.812291"
              autoFocus
              required
              inputMode="numeric"
              value={longtitude}
              onChange={(e) => setLongtitude(e.target.value)}
            />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}
const CalendarModal = ({ isOpen, onClose, id }) => {
  const getListData = (value) => {
    let listData = useCheckinByDateAndLocation(value.format("DD-MM-YYYY"), id);
    return listData || [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
        <div className="events">
          {listData.map((item) => (
              <p key={item.id}>
                {moment(item?.createAt).format("HH:mm")}
              </p>
          ))}
        </div>
    );
  };
  const cellRender= (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };


  return (
      <Modal show={isOpen} onHide={onClose} size={"xl"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Dữ liệu checkin của địa điểm</Modal.Title>
        </Modal.Header>
        <Form >
          <Modal.Body>
            <Calendar cellRender={cellRender} mode={"month"}/>

          </Modal.Body>
        </Form>
      </Modal>
  )
}

function Location() {
  const [location, setLocation] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [currentLocation, setCurrentLocation] = useState("")
  const [refetch, setRefetch] = useState(0);

  useEffect(() => {
    getAllLocation()
      .then(res => {
        setLocation(res.data);
      })
      .catch(e => {
        console.log(e);
      })
  }, [refetch])

  const handleLocation = (data) => {
    createLocation(data)
      .then(res => {
        alert('Create location successfully!');
        setRefetch(refetch + 1);
      })
      .catch(e => {
        alert('Something when wrong!')
      })
  }

  const handleUpdate = (id, data) => {
    updateLocationById(id, data)
      .then(res => {
        alert('Update location successfully!');
        setRefetch(refetch + 1);
      })
      .catch(e => {
        alert('Something when wrong!')
      })
  }

  const handleDelete = (id) => {
    deleteLocationById(id)
      .then(res => {
        alert('Delete location successfully!')
        setRefetch(refetch + 1);
      })
      .catch(e => {
        alert('Something when wrong!')
      })
  }

  const downloadQR = (name) => {
    const canvas = document.getElementById('qrcode');
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = name + '.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      <Row >
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
                onClick={() => setShowAdd(true)}
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
                    <th className="border-0" style={{ fontSize: '15px', fontWeight: 'bold', color: '#000' }}>QR code</th>
                    <th className="border-0" style={{ fontSize: '15px', fontWeight: 'bold', color: '#000' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {location.map((item, index) => (
                    <tr key={index}
                        onClick={() => {
                          setCurrentLocation(item.id);
                          setShowCalendar(true);
                        }}
                    >
                      <td>{index + 1}</td>
                      <td style={{ cursor: 'pointer', color: '#2686ed' }}>{item.name}</td>
                      <td>{item.latitude}</td>
                      <td>{item.longtitude}</td>
                      <td>
                        <QRCode
                          id='qrcode'
                          value={JSON.stringify(item)}
                          size={150}
                          level={'H'}
                          includeMargin={true}
                          onClick={() => downloadQR(Date.now())}
                          style={{ cursor: "pointer" }}
                        />
                      </td>
                      <td>
                        <EditIcon
                          style={{
                            backgroundColor: '#006000',
                            color: 'white',
                            padding: '3px',
                            borderRadius: '4px',
                            marginRight: '10px',
                            cursor: 'pointer'
                          }}
                          onClick={() => {
                            setDataEdit(item);
                            setShowEdit(true);
                          }}
                        />
                        <DeleteForeverIcon
                          style={{
                            backgroundColor: '#e53e3e',
                            color: '#ffffff',
                            padding: '3px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleDelete(item.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <AddModal isOpen={showAdd} onClose={() => setShowAdd(false)} onSubmit={handleLocation} />
      <EditModal
        isOpen={showEdit}
        onClose={() => {
          setShowEdit(false);
          setDataEdit(null);
        }}
        onSubmit={handleUpdate}
        data={dataEdit}
      />
      <CalendarModal
          isOpen={showCalendar}
          onClose={() => {
            setShowCalendar(false);
            setCurrentLocation("")
          }}
          id={currentLocation}
      />
    </>
  );
}

export default Location;
