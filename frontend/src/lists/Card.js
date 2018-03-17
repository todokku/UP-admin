import React, {Component} from "react"
import {Container, Row, Col, Button, Modal, ListGroup, ListGroupItem, ListGroupItemHeading} from 'reactstrap'
import axios from "axios"
import FormLectures from "../forms/FormLectures"
import {prettyTime, prettyDate} from "../components/FuncDateTime"
import AuthService from "../Auth/AuthService"
import {API_URL} from "../components/GlobalConstants"
import PaidButton from "../components/PaidButton"
import SelectAttendanceState from "../components/SelectAttendanceState"

export default class ClientView extends Component {
    constructor(props) {
        super(props)
        this.id = this.props.match.params.id
        this.CLIENT = this.props.match.path.includes("klienti")
        this.title = "Karta " + (this.CLIENT ? "klienta" : "skupiny")
        this.state = {
            object: {},
            modal: false,
            currentLecture: {},
            lectures: [],
            attendancestates: []
        }
    }

    getDataAttendanceStates = () => {
        axios.get(API_URL + 'attendancestates/', AuthService.getHeaders())
            .then((response) => {
                this.setState({attendancestates: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    toggle = (lecture = {}) => {
        this.setState({
            currentLecture: lecture,
            modal: !this.state.modal
        })
    }

    goBack = () => {
        this.props.history.goBack()
    }

    getObject = () => {
        axios.get(API_URL + (this.CLIENT ? 'clients/' : 'groups/') + this.id + '/', AuthService.getHeaders())
            .then((response) => {
                this.setState({object: response.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getLectures = () => {
        console.log("refresh")
        axios.get(API_URL + 'lectures/?' + (this.CLIENT ? 'client' : 'group') + '=' + this.id + '&ordering=-start', AuthService.getHeaders())
            .then((response) => {
                // groupby courses
                let group_to_values = response.data.reduce(function (obj, item) {
                    obj[item.course.name] = obj[item.course.name] || []
                    obj[item.course.name].push(item)
                    return obj
                }, {})
                let groups = Object.keys(group_to_values).map(function (key) {
                    return {course: key, values: group_to_values[key]}
                })
                this.setState({lectures: groups})
            })
            .catch((error) => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.getObject()
        this.getLectures()
        this.getDataAttendanceStates()
    }

    render() {
        const {object, attendancestates, lectures, currentLecture} = this.state
        return (
            <div>
                <h1 className="text-center mb-4">{this.title}: {this.CLIENT ? (object.name + " " + object.surname) : object.name}</h1>
                <Button color="secondary" onClick={this.goBack}>Jít zpět</Button>{' '}
                <Button color="info" onClick={() => this.toggle()}>Přidat kurz</Button>
                <Container fluid={true}>
                    <Row>
                    {lectures.map(lecture =>
                        <Col key={lecture.course}>
                            <div>
                                <h4 className="text-center">{lecture.course}</h4>
                                <ListGroup>
                                {lecture.values.map(lectureVal => {
                                    const d = new Date(lectureVal.start)
                                    return (
                                        <ListGroupItem key={lectureVal.id}>
                                            <ListGroupItemHeading>
                                                {prettyDate(d) + " - " + prettyTime(d)}{' '}
                                            </ListGroupItemHeading>{' '}
                                            {lectureVal.attendances.map(attendance =>
                                                <div key={attendance.id}>
                                                    <h6>{(!this.CLIENT && (attendance.client.name + " " + attendance.client.surname))}</h6>
                                                    <PaidButton paid={attendance.paid} attendanceId={attendance.id}
                                                                funcRefresh={this.getLectures}/>
                                                    <SelectAttendanceState value={attendance.attendancestate.id} attendanceId={attendance.id}
                                                                attendancestates={attendancestates}
                                                                funcRefresh={this.getLectures}/>{' '}
                                                </div>)}
                                            <Button color="primary" onClick={() => this.toggle(lectureVal)}>Upravit</Button>
                                        </ListGroupItem>)
                                })}
                                </ListGroup>
                            </div>
                        </Col>)}
                    </Row>
                </Container>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <FormLectures lecture={currentLecture} object={object} funcClose={this.toggle} CLIENT={this.CLIENT}
                                  funcRefresh={this.getLectures} attendancestates={attendancestates}/>
                </Modal>
            </div>
        )
    }
}
