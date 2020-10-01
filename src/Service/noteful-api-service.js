import config from './config'

const NotefulApiService = {
  getNotes() {
    return fetch(`${config.API_ENDPOINT}/notes`, {
        headers: {},
    })
    .then(data => 
        (!data.ok)
          ? data.json().then(e => Promise.reject(e))
          : data.json()
    )
  },
  getById(note_id) {
    return fetch(`${config.API_ENDPOINT}/notes/${note_id}`, {
        headers: {},
    })
    .then(data => 
        (!data.ok)
          ? data.json().then(e => Promise.reject(e))
          : data.json()
    )
  },
  deleteNote(note_id) {
    return fetch(`${config.API_ENDPOINT}/notes/${note_id}`, {
        headers: {},
    })
    .then(data => {
        if (!data.ok)
          Promise.reject(data)
        }
    )
  },
  postNote(note_id, title, content) {
    return fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        note_id: note_id,
        title,
        content,
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  patchNote (note_id, title, content) {
    return fetch(`${config.API_ENDPOINT}/notes/${note_id}`, {
      method: 'PATCH',
      headers: {
          'content-type': 'application/json',
      },
      body: JSON.stringify({
          note_id: note_id,
          title,
          content
      }),
    })
    .then(data =>
        (!data.ok)
          ? data.json().then(e => Promise.reject(e))
          : data.json()
    )
  }
}

export default NotefulApiService