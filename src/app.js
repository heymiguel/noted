import React from 'react';
import ReactDOM from 'react-dom';
import NoteCard from './NotesCard.js'

var config = {
  apiKey: "AIzaSyD6LJ-lVcpA0g9WYz0YC1ojH1rwgd3hAYU",
  authDomain: "snsv2-560be.firebaseapp.com",
  databaseURL: "https://snsv2-560be.firebaseio.com",
  projectId: "snsv2-560be",
  storageBucket: "snsv2-560be.appspot.com",
  messagingSenderId: "1012416512995"
};
firebase.initializeApp( config );

class App extends React.Component {
  constructor() {
    super();
    this.toggleSidebar = this.toggleSidebar.bind( this );
    this.addNote = this.addNote.bind( this );


    this.state = {
      notes: []
    }
  }

  componentDidMount() {
    firebase.database().ref().on( 'value', ( res ) => {
      const userData = res.val();
      const dataArray = [];
      Object.keys( userData ).map(( objectKey ) => {
        userData[ objectKey ].key = objectKey;
        dataArray.push( userData[ objectKey ] );
      } );
      this.setState( {
        notes: dataArray
      } );
    } );
    // firebase.database.ref() this references the entire database
  }


  toggleSidebar( e ) {
    e.preventDefault();
    this.sidebar.classList.toggle( "show" );
  }

  addNote( e ) {
    e.preventDefault();
    const note = {
      title: this.noteTitle.value,
      text: this.noteText.value
    };

    const dbRef = firebase.database().ref();
    dbRef.push( note ); // adds the note.

    this.noteTitle.value = "";
    this.noteText.value = "";
    this.toggleSidebar( e );
  }

  removeNote( noteId ) {
    const dbRef = firebase.database().ref( noteId ); // key here tells firebase which key
    dbRef.remove();
  }

  render() {
    return (
      <div>
        <header className="mainHeader">
          <h1>Noted</h1>
          <nav>
            <a href="" onClick={this.toggleSidebar}>Add Note</a>
          </nav>
        </header>
        <section className="notes">
          {this.state.notes.map(( note, i ) => {
            console.log( note );
            return (
              <NoteCard note={note} key={`note-${ i }`} removeNote={this.removeNote} />
            )
          } ).reverse()}
        </section>
        <aside className="sidebar" ref={ref => this.sidebar = ref}>
          <form action="" onSubmit={this.addNote}>
            <h3>Add new note</h3>
            <div className="close-btn" onClick={this.toggleSidebar}>
              <i className="fa fa-times"></i>
            </div>
            <label htmlFor="note-title">Title:</label>
            <input type="text" name="note-title" ref={ref => this.noteTitle = ref} />
            <label htmlFor="note-text"> Text: </label>
            <textarea name="note-text" id="" ref={ref => this.noteText = ref}></textarea>
            <input type="submit" value="add new note" />
          </form>
        </aside>
      </div>
    );
  }
}

ReactDOM.render( <App />, document.getElementById( 'app' ) );