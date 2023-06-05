import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
  

const App = () => {
    const [keyState, setKeyState] = React.useState("");
    const [list, setList] = React.useState(["Add Delete functionality", "Test Security", "Add more TODOs"]);

    const updateTODO = () => {
      fetch(process.env.REACT_APP_BACKEND_URI + "/todo/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ list: [...list, keyState] }),
      }).then((res) => res.json())
      .then((data) => {
        console.log(data);
        setList(data.list);
        setKeyState("");
      }).catch((err) => {
        console.log(err);
      });
    }
    // updateTODO();
    return (
        <Container>
            <Row
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "3rem",
                    fontWeight: "bolder",
                }}
            >
                Finish all TODOs
            </Row>

            <hr />
            <Row>
                <Col md={{ span: 5, offset: 4 }}>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Add TODO"
                            size="lg"
                            value={keyState}
                            onChange={(item) =>
                                setKeyState(item.target.value)
                            }
                            aria-label="add something"
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup>
                            <Button
                                variant="dark"
                                className="mt-2"
                                onClick={updateTODO}
                            >
                                Add
                            </Button>
                        </InputGroup>
                    </InputGroup>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 5, offset: 4 }}>
                    <ListGroup>
                      {list.map((item) => {
                            return (
                                <ListGroup.Item
                                    variant="danger"
                                    action
                                >
                                    {item}
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}
  
export default App;
