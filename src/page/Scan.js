import React, { PureComponent, Component } from 'react';
import { AppRegistry, Alert, Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import SafeAreaViewPlus from '../common/SafeAreaViewPlus';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';

export default class ScanScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moveAnim: new Animated.Value(0)
    };
  }

  componentDidMount() {
    this.startAnimation();
  }

  startAnimation = () => {
    this.state.moveAnim.setValue(0);
    Animated.timing(
      this.state.moveAnim,
      {
        toValue: -200,
        duration: 1500,
        // easing: Easing.linear
      }
    ).start(() => this.startAnimation());
  };

  //  识别二维码
  onBarCodeRead = (result) => {
    const { navigate } = this.props.navigation;
    const {data} = result;
    navigate('H5', {
      url: data
    })
  };

  render() {
    return (
      <SafeAreaViewPlus topColor={'#2196f3'}>
      <View style={styles.container}>
        <NavigationBar
          style={styles.navigationBarStyle}
          leftButton={ViewUtil.getLeftBackButton(() => this.props.navigation.goBack())}
          title={'扫一扫'}
          titleColor={'#fff'}
        />
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          onBarCodeRead={this.onBarCodeRead}
        >
          <View style={styles.rectangleContainer}>
            <View style={styles.rectangle}/>
            <Animated.View style={[
              styles.border,
              {transform: [{translateY: this.state.moveAnim}]}]}/>
            <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
          </View>
        </RNCamera>
      </View>
      </SafeAreaViewPlus>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  rectangle: {
    height: 200,
    width: 200,
    borderWidth: 1,
    borderColor: '#00FF00',
    backgroundColor: 'transparent'
  },
  rectangleText: {
    flex: 0,
    color: '#fff',
    marginTop: 10
  },
  border: {
    flex: 0,
    width: 200,
    height: 2,
    backgroundColor: '#00FF00',
  }
});