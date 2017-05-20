import React, { Component } from 'react';

class NoteCard extends Component {
  constructor() {
    super();
    this.state = {
      editing: false,
      note: {}
    }
    this.saveNote = this.saveNote.bind( this );
  }

  componentDidMount() {

    this.setState( {
      note: this.props.note
    } );
    console.log( this.state );
  }

  saveNote( e ) {
    e.preventDefault();

  }

  render() {
    let isEditing = (
      <div>
        <h4>{this.state.note.title}</h4>
        <p>
          {this.state.note.text}
        </p>
      </div>
    )
    if ( this.state.editing ) {
      isEditing = (
        <form onSubmit={this.saveNote}>
          <div>
            <input type="text" defaultValue={this.state.note.title} name='title' ref={ref = this.noteTitle = ref} />
          </div>
          <div>
            <input type="text" defaultValue={this.state.note.text} name='text' ref={ref = this.noteText = ref} />
          </div>
          <input type="submit" value="Done editing!" />
        </form>
      )
    }
    return (
      <div className="noteCard">
        <i className="fa fa-edit" onClick={() => this.setState( { editing: true } )}></i>
        <i className="fa fa-times" onClick={() => this.props.removeNote( this.state.note.key )}></i>
        {isEditing}
      </div>
    );
  }
}

export default NoteCard;