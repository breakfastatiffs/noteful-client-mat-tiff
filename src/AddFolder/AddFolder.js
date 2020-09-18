import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
//import {withRouter} from 'react-router-dom'
import config from '../config'
import './AddFolder.css'

export default class AddFolder extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;

  constructor(props){
    super(props);
    this.state = {
      title:{value:'',touched:false}
    };
  }

  updateName(name){
    this.setState({title:{value: name, touched: true}});
  }

  validateName(){
    const {value, touched}  = this.state.title;
    const {folders} = this.context;
    return (
      typeof value === 'string' &&
      value.length > 0 &&
      touched && 
      !folders.find(
        (folder) =>
        folder.name && folder.name.toLowerCase() === value.toLowerCase()
      )
    );
  }

  handleSubmit = e => {
    e.preventDefault()
    const newFolder = JSON.stringify({name:this.state.title.value});
    const options = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: newFolder
    };
    fetch(`${config.API_ENDPOINT}/folders`, options)
      .then((res) => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
          return res.json()
      })
      .then((res) => {
        this.context.addFolder(res)
        this.props.history.push('/');
      })
      .catch((error) => {
        console.error({ error })
      })
  }
  onNameChange = (e) => {
    const {target} = e
    const {value} = target
    const {title} = this.state
    title.value = value
    title.touched = value.length > 0
    this.setState({title})
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input 
              type='text' 
              id='folder-name-input' 
              name='folder-name' 
              onChange={this.onNameChange}
              />
          </div>
          <div className='buttons'>
            <button disabled={!this.validateName()} type='submit' className='submit-new-folder'>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}

// export default withRouter(AddFolder);