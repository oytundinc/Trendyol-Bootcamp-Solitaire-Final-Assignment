import React from 'react'
import '../timer/Timer.css'


class Timer extends React.Component {

    constructor() {
        super();
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.state = {
            durationAsString : "00:00:00"
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.updateTime(),
            1000
          );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    getDurationAsString() {
        let hourText = "";
        if(this.hours < 10) {
            hourText = "0" + this.hours;
        } else {
            hourText = this.hours;
        }

        let minuteText = "";
        if(this.minutes < 10) {
            minuteText = "0" + this.minutes;
        } else {
            minuteText = this.minutes;
        }

        let secondText = "";
        if(this.seconds < 10) {
            secondText = "0" + this.seconds;
        } else {
            secondText = this.seconds;
        }

        return hourText + ":" + minuteText + ":" + secondText;
    }

    updateTime() {
        this.seconds = this.seconds + 1;
        if(this.seconds === 60) {
            this.minutes = this.minutes + 1;
            this.seconds = 0;
        }
    
        if(this.minutes === 60) {
            this.hours = this.hours + 1;
            this.minutes = 0;
        }
        this.setState({ durationAsString: this.getDurationAsString()});
    }

    render() {
        return (
            <p className="timer">{this.state.durationAsString}</p>
        )
    }
}

export default Timer;