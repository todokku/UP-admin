import React, {Component, Fragment} from "react"
import {ListGroup, ListGroupItem, ListGroupItemHeading, Badge} from "reactstrap"
import {prettyDateWithLongDayYearIfDiff, toISODate, prettyTime, isToday} from "../global/funcDateTime"
import PaidButton from "./PaidButton"
import SelectAttendanceState from "./SelectAttendanceState"
import "../global/lists.css"
import RemindPay from "./RemindPay"
import LectureNumber from "./LectureNumber"
import LectureService from "../api/services/lecture"
import ClientName from "./ClientName"
import Loading from "../api/Loading"
import GroupName from "./GroupName"

export default class DashboardDay extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lectures: [],
            IS_LOADING: true
        }
        this.date = new Date(props.date)
    }

    getLectures = () => {
        LectureService.getAllFromDayOrdered(toISODate(this.date), true)
            .then((response) => {
                this.setState({lectures: response, IS_LOADING: false})
            })
    }

    componentDidMount() {
        this.getLectures()
    }

    render() {
        const {lectures, IS_LOADING} = this.state
        const title = prettyDateWithLongDayYearIfDiff(this.date)
        const Lectures = () => (
            <Fragment>
                {lectures.map(lecture =>
                    <ListGroupItem key={lecture.id} className={lecture.group && "list-bgGroup"}>
                        <h4>
                            {prettyTime(new Date(lecture.start))}
                            {' '}
                            <Badge color="secondary" pill>
                                {lecture.course.name}
                            </Badge>
                            {' '}
                            <LectureNumber number={lecture.attendances[0].count}/>
                        </h4>
                        {lecture.group &&
                        <h5>
                            <GroupName group={lecture.group} title link/>
                        </h5>}
                        <ul className={"list-clients " + (lecture.group && "list-clientsGroup")}>
                            {lecture.attendances.map(attendance =>
                                <li key={attendance.id}>
                                    <ClientName client={attendance.client} link/>
                                    {' '}
                                    <PaidButton paid={attendance.paid} attendanceId={attendance.id}
                                                funcRefresh={this.getLectures}/>
                                    {' '}
                                    <RemindPay remind_pay={attendance.remind_pay}/>
                                    {' '}
                                    <Badge color="info">
                                        {attendance.note}
                                    </Badge>
                                    <SelectAttendanceState value={attendance.attendancestate.id}
                                                           attendanceId={attendance.id}
                                                           attendancestates={this.props.attendancestates}
                                                           funcRefresh={this.getLectures}/>
                                </li>)}
                        </ul>
                    </ListGroupItem>)}
                {!Boolean(lectures.length) &&
                <ListGroupItem>
                    <ListGroupItemHeading className="text-muted text-center">
                        Volno
                    </ListGroupItemHeading>
                </ListGroupItem>}
            </Fragment>)

        return (
            <ListGroup>
                <ListGroupItem color={isToday(this.date) ? "primary" : ''}>
                    <h4 className="text-center">{title}</h4>
                </ListGroupItem>
                {IS_LOADING ?
                    <ListGroupItem><Loading/></ListGroupItem> :
                    <Lectures/>}
            </ListGroup>
        )
    }
}
