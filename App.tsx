import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { converterHtml } from './src/converterHtml';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f7f7" />
      <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          source={{ html: converterHtml }}
          javaScriptEnabled
          domStorageEnabled
          setSupportMultipleWindows={false}
          style={styles.webView}
          textZoom={100}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  webView: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
});
