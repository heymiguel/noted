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
    this.toggleCreate = this.toggleCreate.bind( this );
    this.createUser = this.createUser.bind( this );
    this.toggleLogin = this.toggleLogin.bind( this );
    this.loginUser = this.loginUser.bind( this );
    this.renderCards = this.renderCards.bind( this );
    this.logoutUser = this.loginUser.bind( this );
    // init state
    this.state = {
      notes: [],
      loggedin: false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(( user ) => {
      if ( user ) {
        firebase.database().ref().on( 'value', ( res ) => {
          const userData = res.val();
          const dataArray = [];
          for ( let objectKey in userData ) {
            userData[ objectKey ].key = objectKey;
            dataArray.push( userData[ objectKey ] );
          };
          // Object.keys( userData ).map(( objectKey ) => {
          // why doesn't this work :o
          // } );
          this.setState( {
            notes: dataArray,
            loggedin: true
          } );
        } );
      } else {
        this.setState( {
          notes: [],
          loggedin: false
        } )
      }
    } );

    // firebase.database.ref() this references the entire database
  }

  renderCards() {
    if ( this.state.loggedin === true ) {
      return (
        this.state.notes.map(( note, i ) => {
          return ( <NoteCard note={note} key={`note-${ i }`} removeNote={this.removeNote} /> )
        } ).reverse()
      );
    } else {
      return ( <p>Login!</p> )
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

    const dbRef = firebase.database().ref();
    dbRef.push( note ); // adds the note.

    this.noteTitle.value = "";
    this.noteText.value = "";
    this.toggleSidebar( e );
  }

  toggleCreate( e ) {
    e.preventDefault();
    this.overlay.classList.toggle( 'show' );
    this.createUserModal.classList.toggle( 'show' );
  }

  toggleLogin( e ) {
    e.preventDefault();
    this.overlay.classList.toggle( 'show' );
    this.loginModal.classList.toggle( 'show' );
  }

  loginUser( e ) {
    e.preventDefault();
    const email = this.userEmail.value;
    const password = this.userPassword.value;
    firebase.auth()
      .signInWithEmailAndPassword( email, password )
      .then(( res ) => {
        this.toggleLogin( e );
      } )
      .catch(( err ) => {
        alert( err.message );
      } )
  }

  logoutUser( e ) {
    e.preventDefault();
    firebase.auth().signOut();
  }

  createUser( e ) {
    e.preventDefault();
    const email = this.createEmail.value;
    const password = this.createPassword.value;
    const confirm = this.confirmPassword.value;
    if ( password === confirm ) {
      firebase.auth()
        .createUserWithEmailAndPassword( email, password )
        .then(( res ) => {
          this.toggleCreate( e );
        } )
        .catch(( res ) => {
          alert( err.message )
        } )
    } else {
      alert( "match em" );
    }
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
            {
              ( () => {
                if ( this.state.loggedin ) {
                  return (
                    <span>
                      <a href="" onClick={this.toggleSidebar}>Add Note</a>
                      <a href="" onClick={this.logoutUser}>Logout</a>
                    </span>
                  )
                } else {
                  return (
                    <span>
                      <a href="" onClick={this.toggleCreate}>Create Account</a>
                      <a href="" onClick={this.toggleLogin}>Login</a>
                    </span>
                  )
                }
              } )()
            }
          </nav>
        </header>
        <div className="overlay" ref={ref => this.overlay = ref}></div>
        <section className="notes">
          {this.renderCards()}
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

        <div className="loginModal modal" ref={ref => this.loginModal = ref}>
          <div className="close" onClick={this.toggleLogin}>
            <i className="fa fa-times"></i>
          </div>
          <form action="" onSubmit={this.loginUser}>
            <div>
              <label htmlFor="email"> Email:</label>
              <input type="text" name="email" ref={ref => this.userEmail = ref} />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" name="password" ref={ref => this.userPassword = ref} />
            </div>
            <div>
              <input type="submit" value="Login" />
            </div>
          </form>
        </div>

        <div className="createUserModal modal" ref={ref => this.createUserModal = ref}>
          <div className="close">
            <i className="fa fa-times" onClick={this.toggleCreate}></i>
          </div>
          <form action="" onSubmit={this.createUser}>
            <div>
              <label htmlFor="createEmail"> Email:</label>
              <input type="text" name="createEmail" ref={ref => this.createEmail = ref} />
            </div>
            <div>
              <label htmlFor="createPassword"> Password:</label>
              <input type="password" name="createPassword" ref={ref => this.createPassword = ref} />
            </div>
            <div>
              <label htmlFor="confirmPassword"> Confirm Password:</label>
              <input type="password" name="confirmPassword" ref={ref => this.confirmPassword = ref} />
            </div>
            <div>
              <input type="submit" value="Create" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ReactDOM.render( <App />, document.getElementById( 'app' ) );