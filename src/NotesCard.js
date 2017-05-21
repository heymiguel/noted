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
  }

  saveNote( e ) {
    e.preventDefault();
    const userId = firebase.auth().currentUser.uid;
    const dbRef = firebase.database().ref( `users/${ userId }/notes/${ this.props.note.key }` );
    dbRef.update( {
      title: this.noteTitle.value,
      text: this.noteText.value
    } )

    this.setState( {
      editing: false
    } )
  }

  render() {
    let isEditing = (
      <div>
        <h4>{this.props.note.title}</h4>
        <p>
          {this.props.note.text}
        </p>
      </div>
    )
    if ( this.state.editing ) {
      isEditing = (
        <form onSubmit={this.saveNote}>
          <div>
            <input type="text" defaultValue={this.props.note.title} name='title' ref={ref => this.noteTitle = ref} />
          </div>
          <div>
            <input type="text" defaultValue={this.props.note.text} name='text' ref={ref => this.noteText = ref} />
          </div>
          <input type="submit" value="Done editing!" />
        </form>
      )
    }
    return (
      <div className="noteCard">
        <i className="fa fa-edit" onClick={() => this.setState( { editing: true } )}></i>
        <i className="fa fa-times" onClick={() => this.props.removeNote( this.props.note.key )}></i>
        {isEditing}
      </div>
    );
  }
}

export default NoteCard;