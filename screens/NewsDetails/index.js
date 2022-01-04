import React from 'react';
import {SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';

function NewsDetails(props) {
  const url = props.route.params.url;
  return (
    <SafeAreaView>
      <WebView
        allowsInlineMediaPlayback={false}
        source={{uri: url}}
        style={{opacity: 0.99, minHeight: 1}}
      />
    </SafeAreaView>
  );
}

export default NewsDetails;
