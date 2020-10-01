import React from 'react'
import { Link } from 'react-router-dom'
// import { format } from 'date-fns'
import moment from 'moment-timezone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ApiContext from '../ApiContext'
// import PropTypes from 'prop-types'
import config from '../config'
import './Note.css'

export default class Note extends React.Component {
  static defaultProps ={
    onDeleteNote: () => {},
  }

  // static propTypes = {
  //   name: PropTypes.string.isRequired,
  //   id: PropTypes.string.isRequired,
  //   modified: PropTypes.string.isRequired,
  //   onDeleteNote: PropTypes.func.isRequired
  // }

  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const noteId = this.props.id

    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(noteId)
    })
      .then(() => {
        this.context.deleteNote(noteId)
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(noteId)
        this.props.history.push('/');
      })
      .catch((error) => {
        console.error({ error })
      })
  }

  render() {
    const { name, id, modified } = this.props
    if(!id){
      return null;
    }
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {moment(modified).format('MM DD YYYY')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}
