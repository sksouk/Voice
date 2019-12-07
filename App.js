//Main project test
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  AppRegistry,
} from 'react-native';
import Voice from 'react-native-voice';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      started: '',
      results: [],
    };
    Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }
  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  };

  async onSpeechResults(e) {
    const data = e.value;
    //data.push(e.value)
    this.setState({
      results: e.value,
    });
   
    //console.log(this.state.results[0].match(/^(.*?(\bxin\b)[^$]*)$/g))
    if(this.state.results[0].match(/^(.*?(\bđược\b)[^$]*)$/g)!= null)
    {
      console.log("detected");
     // await Voice.destroy();
   }
   else
   {
     console.log("not detected")
   }
 //   await Voice.destroy();
  }

  async _startRecognition(e) {
    try {
      this.setState({ results: []})
      console.log(this.state.results)
      this.setState({
        recognized: '',
      });
      this.setState({
        started: '',})
      await Voice.start('vi-VN');
    } catch (e) {
      console.error(e);
    }
  }
  async stop()
  {
    await Voice.destroy();
  }

  render() {
    return (
      <View>
        <Text style={styles.transcript}>
            Transcript
        </Text>
       <Text style={styles.transcript}> {this.state.results.map(data=>(data))}</Text>
        <View style={styles.btnStart}>
          <Button style={styles.transcript}
          onPress={this._startRecognition.bind(this)}
          title="Start"></Button>
           <Button style={styles.transcript}
          onPress={()=>this.stop()}
          title="Stop"></Button>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  transcript: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    top: '100%',
    marginTop:100,
  },
  btnStart:{
    height:100,
    width:100,
    justifyContent:'center',
    backgroundColor:'#bcfaac',
    textAlign:'center',
    alignSelf:'center',
    borderRadius:100/2,
  }
});
AppRegistry.registerComponent('Voice', () => Voice);
