import './App.css';
import React from 'react';
import * as Tone from "tone";
import NoteGrid from './NoteGrid'

const synth = new Tone.PolySynth().toDestination();

class SelectedNotes extends React.Component {

  constructor(props) {
    super(props);
    this.state = { selectedNotesMap: { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [], 13: [], 14: [] } }
    this.selectNote = this.selectNote.bind(this);
  }

  selectNote(column, row) {
    this.state.selectedNotes[column].push(row);
    console.log(this.state.selectedNotesMap);
  }

  deselectNote(column, row) {
    this.state.selectedNotes[column].filter((_, index) => index !== row);
  }

  render() {
    return null;
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { playLoop: false, selectedNotes: new SelectedNotes({}), buttonText: "Play" };
  }

  handleClick = event => {
    this.setState({ playLoop: !this.state.playLoop, buttonText: this.state.playLoop ? "Play" : "Stop" })


  }
  handleClearClick = event => {
    console.log('Clearing the matrix...')
    this.updateSelectedNotes([...Array(15)].map((_, i) =>[]));
  }

  updateSelectedNotes = (selectedNotes) => {
    this.setState({ ...this.state, selectedNotes: new SelectedNotes() });
  }

  render() {
    return (
      <div className="board">

        <h2>Melody Matrix</h2>
        <p>Press the board to make a melody!</p>

        <NoteGrid selectedNotes={this.state.selectedNotes} playLoop={this.state.playLoop} synth={synth} updateSelectedNotes={this.updateSelectedNotes} />

        <div className="buttonRow">
          <button onClick={this.handleClick}>{this.state.buttonText}</button>
          <button onClick={this.handleClearClick}>Clear</button>
        </div>

      </div>
    );
  }
}

export default App;
