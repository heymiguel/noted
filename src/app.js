import React from 'react';
import ReactDOM from 'react-dom';
import NoteCard from './NotesCard.js'

class App extends React.Component {
  constructor() {
    super();
    this.toggleSidebar = this.toggleSidebar.bind( this );
    this.addNote = this.addNote.bind( this );

    // state goes here
    this.state = {
      notes: []
    }
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
    const newNotes = Array.from( this.state.notes );
    newNotes.push( note );
    this.setState( {
      notes: newNotes
    } );
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
            return (
              <NoteCard note={note} key={`note-${ i }`} />
            )
          } )}
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