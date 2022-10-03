import NoteColumn from './NoteColumn';
import React from 'react';

class NoteGrid extends React.Component {

    constructor(props) {
        super(props);
        this.columns = [...Array(15)].map((_, i) => <NoteColumn key={i} colIdx={i} selectedNotes={props.selectedNotes} synth={props.synth} updateSelectedNotes={props.updateSelectedNotes}/>);
        this.state = { 
            activeColumnIdx: 0, 
            columns: this.columns, 
            selectedNotes: props.selectedNotes, 
            playLoop: props.playLoop, 
            loopTimer: null,
            synth: props.synth,
        };
    }

    playLoop() {
        let timer = setInterval(
            () => this.activateNextColumn(),
            300
        );
        this.setState({ ...this.state, loopTimer: timer }, () => {
            console.debug(this.state.activeColumnIdx, 'column starting timer', this.state.loopTimer);
        })
    }

    endLoop() {
        console.debug(this.state.activeColumnIdx, 'column ending timer', this.state.loopTimer)
        clearInterval(this.state.loopTimer);
    }

    componentDidUpdate(prevProps) {

        if (prevProps.playLoop !== this.props.playLoop) {
            this.setState({ ...this.state, playLoop: this.props.playLoop })
            if (this.props.playLoop) {
                this.playLoop();
            } else {
                this.endLoop();
            }
        }
        console.info("updating grid...")
    }

    componentDidMount() {
        console.debug('grid mounted with active index:', this.state.activeColumnIdx);
    }

    componentWillUnmount() {
        console.debug('unmounting grid with active index', this.state.activeColumnIdx)
    }

    activateNextColumn() {
        console.debug('activate next grid column with state active index before change:', this.state.activeColumnIdx)
        this.setState({
            activeColumnIdx: this.state.activeColumnIdx > 14 ? 0 : this.state.activeColumnIdx + 1,
            columns: [...Array(15)].map((_, i) => <NoteColumn key={i} isActive={i === this.state.activeColumnIdx} selectedNotes={this.state.selectedNotes} synth={this.state.synth} updateSelectedNotes={this.state.updateSelectedNotes}/>)
        });
    }

    render() {
        return (
            <div className="grid">
                {this.state.columns}
            </div>

        );
    }
}

export default NoteGrid;