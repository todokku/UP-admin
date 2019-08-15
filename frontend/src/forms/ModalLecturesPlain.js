import React from "react"
import { Modal } from "reactstrap"
import FormLectures from "./FormLectures"

const ModalLecturesPlain = ({
    isModal,
    toggleModal,
    currentLecture = null,
    refresh,
    object,
    IS_CLIENT,
    defaultCourse,
    date = ""
}) => {
    // komponente muze prijit object=null (pri zavirani v ModalLecturesFast), proto osetreni "object &&"
    return (
        <Modal isOpen={isModal} toggle={toggleModal} size="lg" className="ModalFormLecture">
            {object && (
                <FormLectures
                    lecture={Boolean(currentLecture) ? currentLecture : {}}
                    funcClose={toggleModal}
                    object={object}
                    funcRefresh={refresh}
                    IS_CLIENT={IS_CLIENT}
                    defaultCourse={defaultCourse}
                    date={date}
                />
            )}
        </Modal>
    )
}

export default ModalLecturesPlain