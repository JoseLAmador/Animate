/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Animated,
} from 'react-native';


export default class ClapsButton extends Component<{}> {
    constructor(props){
        super(props);
        this.state={
            count:props.count?props.count:0,
            claps:[]
        }
        this.clap = this.clap.bind(this);
        this.keepClaping = this.keepClaping.bind(this);
        this.stopClaping = this.stopClaping.bind(this);
    }

    animationComplete(countNum){
        claps = this.state.claps;
        claps.splice(claps.indexOf(countNum),1);
        this.setState({claps});
    }

    clap(){
        let count = this.state.count;
        let claps = this.state.claps;
        count++;
        claps.push(count);
        this.setState({count});
        console.log(claps)
    };

    renderClaps(){
        return this.state.claps.map((countNum,index)=> <ClapBubble key={index} count={countNum} animationComplete={this.animationComplete.bind(this)} />)
    };

    keepClaping(){
        this.clapTimer = setInterval(()=>this.clap(),150);
    };

    stopClaping(){
      if(this.clapTimer){
          clearInterval(this.clapTimer);
      }
    };

    render() {
        let clapIcon =
            this.state.count > 0 ?
                <Image source={require('./assets/imgs/thumb-u.png')} style={{height:27, width:25}}/>
                :
                <Image source={require('./assets/imgs/thumb-up.png')} style={{height:27, width:25}}/>
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={this.clap}
                    onPressIn={this.keepClaping}
                    onPressOut={this.stopClaping}
                    activeOpacity={0.7}
                    style={styles.clapButton}
                >
                    {clapIcon}
                </TouchableOpacity>
                {this.renderClaps()}

            </View>
        );
    }
}

class ClapBubble extends Component{
    constructor(){
        super();
        this.state={
            yPosition: new Animated.Value(0),
            opacity: new Animated.Value(0)
        }
    }

    componentDidMount(){
        Animated.parallel([
            Animated.timing(this.state.yPosition, {
                toValue: -120,
                duration: 500
            }),
            Animated.timing(this.state.opacity, {
                toValue: 1,
                duration: 500
            })
        ]).start(()=>{
            setTimeout(()=>{
                this.props.animationComplete(this.props.count)
            },300);
        });
    }

    render(){
        let {count}=this.props;
        let animationStyle = {
          transform: [{translateY: this.state.yPosition}],
            opacity: this.state.opacity
        };
        return(
            <Animated.View style={[styles.clapBubble, animationStyle]}>
                <Text style={styles.clapText}> + {count}</Text>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    clapButton:{
        position: 'absolute',
        height: 60,
        width:60,
        borderRadius:30,
        backgroundColor:'#ecf0f1',
        right:20,
        bottom: 20,
        elevation:3,
        justifyContent:'center',
        alignItems:'center',

    },
    clapBubble:{
        position: 'absolute',
        height: 60,
        width:60,
        borderRadius:30,
        right:20,
        bottom: 20,
        backgroundColor:'#15a872',
        justifyContent:'center',
        alignItems:'center',
    },
    clapText:{
        color: 'white',
        fontSize: 14
    }
});