import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Button,
  Card,
  InputGroup,
  FormControl,
  Container,
  Row,
  Col,
  Modal,
} from "react-bootstrap";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const addTask = () => {
    if (newTaskTitle && newTaskDescription) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          title: newTaskTitle,
          description: newTaskDescription,
        },
      ]);
      setNewTaskTitle("");
      setNewTaskDescription("");
    }
  };
  const openEditModal = (task) => {
    setEditTask({ ...task });
    setShowModal(true);
  };

  const handleEditChange = (e, field) => {
    setEditTask({ ...editTask, [field]: e.target.value });
  };

  const saveEditTask = () => {
    setTasks(tasks.map((task) => (task.id === editTask.id ? editTask : task)));
    setEditTask(null);
    setShowModal(false);
  };
  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <InputGroup className="mb-3">
            <FormControl
              id="form"
              placeholder="Task title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <FormControl
              id="description"
              placeholder="Task description"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={addTask}>
              Add New Task
            </Button>
          </InputGroup>
          <div className="flex flex-row w-full h-full">
            {tasks.map((task) => (
              <Card key={task.id} className="mb-2">
                <Card.Body>
                  <Card.Title>{task.title}</Card.Title>
                  <Card.Text>{task.description}</Card.Text>
                  <Button
                    variant="primary"
                    className="me-2"
                    onClick={() => openEditModal(task)}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => deleteTask(task.id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Task title"
                  value={editTask ? editTask.title : ""}
                  onChange={(e) => handleEditChange(e, "title")}
                />
              </InputGroup>
              <InputGroup>
                <FormControl
                  placeholder="Task description"
                  value={editTask ? editTask.description : ""}
                  onChange={(e) => handleEditChange(e, "description")}
                />
              </InputGroup>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={saveEditTask}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}
