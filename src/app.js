import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <header className="mainHeader">
          <h1>Noted</h1>
          <nav>
            <a href="">Add Note</a>
          </nav>
        </header>
        <section className="notes">
          <div className="noteCard">
            <i className="fa fa-edit"></i>
            <i className="fa fa-times"></i>
            <h4>Test Note</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis nihil culpa recusandae asperiores at eveniet provident, hic sit. Mollitia nam accusantium aliquam officiis, est, at consectetur pariatur qui quaerat officia.
            </p>
          </div>
        </section>
        <aside className="sidebar">
          <form action="">
            <h3>Add new note</h3>
            <div className="close-btn">
              <i className="fa fa-times"></i>
            </div>
            <label htmlFor="note-title">Title:</label>
            <input type="text" name="note-title" />
            <label htmlFor="note-text"></label>
            <textarea name="note-text" id="" cols="30" rows="10"></textarea>
            <input type="submit" value="add new note" />
          </form>
        </aside>
      </div>
    );
  }
}

ReactDOM.render( <App />, document.getElementById( 'app' ) );