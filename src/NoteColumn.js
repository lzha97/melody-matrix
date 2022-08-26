import React from 'react';

class NoteColumn extends React.Component {

    constructor(props) {
      super(props);
      this.state = { 
        active: props.isActive ? "active" : "", 
        selectedNotes: props.selectedNotes, 
        col: props.colIdx, 
        synth: props.synth,
        updateSelectedNotes: props.updateSelectedNotes
    };
      //this.toneMap =  { 0: "D#6", 1: "C#6", 2: "A#5", 3: "G#5", 4: "F#5", 5: "D#5", 6: "C#5", 7: "A#4", 8: "G#4", 9: "F#4", 10: "D#4", 11: "C#4" }
      //this.toneMap =  { 0: "B5", 1: "G5", 2: "D5", 3: "C5", 4: "B4", 5: "G4", 6: "D4", 7: "C4", 8: "B3", 9: "G3", 10: "D4", 11: "C3" }
      this.toneMap =  { 0: "D#5", 1: "C5", 2: "D5", 3: "A#4", 4: "G4", 5: "D#4", 6: "C4", 7: "D4", 8: "A#3", 9: "G3", 10: "D#3", 11: "C3" }
    }

    playSynth(notes, synth) {
        if (notes) {
            synth.triggerAttackRelease(notes, "8n");
        }
    }
  
    componentDidUpdate(prevProps) {
  
      if (prevProps.isActive !== this.props.isActive) {
        this.setState({ ...this.state, active: this.props.isActive ? "active" : "" }, () => {
          if (this.state.active === 'active') {
            console.debug('updated column component to be active:', this.state.col)
            this.playSynth(this.getColumnSelectedKeys(), this.state.synth);
          } else {
            console.debug('updated column component to be inactive:', this.state.col)
          }
        });
      }

      if (this.state.selectedNotes != this.props.selectedNotes) {
          this.setState({...this.state, selectedNotes: this.props.selectedNotes});
      }
    }
  
    getColumnSelectedKeys() {
      let columnmap = this.state.selectedNotes.state.selectedNotesMap;
      for (const column in columnmap) {
        if (this.state.col == column) { //cannot be === 
          let selectedTones = [];
          columnmap[column].map((rowidx, i) => selectedTones.push(this.toneMap[rowidx]));
          return selectedTones;
        }
      }
    }

    handleCellClick = (col, idx, tone) => {
        if (this.isSelectedCell(idx, col)) {
            console.log('deselecting note at row '  + idx + ', col '+ col);
            this.state.selectedNotes.state.selectedNotesMap[col] = this.state.selectedNotes.state.selectedNotesMap[col].filter(item => item !== idx);
        } else {
            console.log('selecting note at row ' + idx + ', col '+ col)
            this.playSynth(tone, this.state.synth);
            console.debug(col, this.state.selectedNotes.state.selectedNotesMap)
            this.state.selectedNotes.state.selectedNotesMap[col].push(idx);
        }
        this.state.updateSelectedNotes(this.state.selectedNotes);
        this.setState(this.state);
    }

    isSelectedCell(idx, col) {
        var selected = this.state.selectedNotes.state.selectedNotesMap[col].includes(idx);
        return selected;
    }
  
    render() {
      return (
        <div className="column">
          {Object.values(this.toneMap).map((tone, idx) => <div onClick={() => this.handleCellClick(this.state.col, idx, tone)} key={idx} className={`cell ${this.state.active} ${this.isSelectedCell(idx, this.state.col) ? 'selected' : '' }`} id={`c${this.state.col}-r${idx}`}></div>)}
        </div>
      );
    }
  }

export default NoteColumn;