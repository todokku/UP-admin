import request from '../request'
import {API_DELIM, API_METHODS, API_URLS} from "../urls"

const baseUrl = API_URLS.Courses.url

function getAll() {
    return request({
        url: baseUrl,
        method: API_METHODS.get
    })
}

function update(context) {
    return request({
        url: baseUrl + context.id + API_DELIM,
        method: API_METHODS.put,
        data: context
    })
}

function remove(id) {
    return request({
        url: baseUrl + id + API_DELIM,
        method: API_METHODS.remove
    })
}

function create(context) {
    return request({
        url: baseUrl,
        method: API_METHODS.post,
        data: context
    })
}

const CourseService = {
    getAll, create, update, remove
}

export default CourseService