import React, { useMemo } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { converterHtml } from './src/converterHtml';

const APP_CSS = String.raw`
:root {
  color-scheme: light dark;
  --bg: #f4f7fc;
  --surface: rgba(255, 255, 255, 0.92);
  --surface-strong: #ffffff;
  --surface-soft: #eef4ff;
  --text: #14213d;
  --muted: #65728a;
  --border: rgba(38, 74, 139, 0.14);
  --primary: #1457d9;
  --primary-strong: #0b3da8;
  --primary-soft: #e7efff;
  --danger: #b4233a;
  --shadow: 0 12px 36px rgba(20, 55, 120, 0.10);
  --input-shadow: 0 2px 10px rgba(20, 55, 120, 0.05);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #07111f;
    --surface: rgba(14, 29, 50, 0.94);
    --surface-strong: #0f1e33;
    --surface-soft: #102746;
    --text: #edf4ff;
    --muted: #a8b7cf;
    --border: rgba(143, 180, 235, 0.16);
    --primary: #6ea4ff;
    --primary-strong: #4386f5;
    --primary-soft: #122f59;
    --danger: #ff8da0;
    --shadow: 0 14px 38px rgba(0, 0, 0, 0.30);
    --input-shadow: 0 2px 10px rgba(0, 0, 0, 0.16);
  }
}

* {
  -webkit-tap-highlight-color: transparent;
}

html {
  min-height: 100%;
  background: var(--bg);
}

body {
  max-width: 760px !important;
  margin: 0 auto !important;
  padding: 24px 16px 42px !important;
  background:
    radial-gradient(circle at 92% 0%, rgba(37, 112, 255, 0.15), transparent 28%),
    radial-gradient(circle at 0% 18%, rgba(76, 149, 255, 0.08), transparent 24%),
    var(--bg) !important;
  color: var(--text) !important;
  font-family: Arial, sans-serif !important;
  box-sizing: border-box;
}

h1 {
  margin: 0 0 18px !important;
  padding: 26px 22px 24px !important;
  border-radius: 26px;
  color: #fff !important;
  background: linear-gradient(145deg, #0b2f79 0%, #0f55d8 56%, #2586ff 100%);
  box-shadow: 0 18px 42px rgba(10, 65, 170, 0.24);
  font-size: 25px !important;
  line-height: 1.25;
  text-align: right;
  overflow: hidden;
  position: relative;
}

h1::before {
  content: 'Urtotho';
  display: block;
  direction: ltr;
  text-align: right;
  font-size: 34px;
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -0.8px;
  margin-bottom: 8px;
}

h1::after {
  content: 'ܐ  ⇄  א';
  position: absolute;
  left: 22px;
  top: 50%;
  transform: translateY(-50%);
  direction: ltr;
  font-size: 28px;
  font-weight: 700;
  color: rgba(255,255,255,0.88);
  padding: 10px 12px;
  border-radius: 16px;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.18);
}

body > p,
.intro-details {
  color: var(--muted) !important;
}

.intro-details {
  margin: 0 0 16px;
  border: 1px solid var(--border);
  border-radius: 18px;
  background: var(--surface);
  box-shadow: var(--input-shadow);
  overflow: hidden;
}

.intro-details summary {
  list-style: none;
  cursor: pointer;
  padding: 15px 17px;
  color: var(--text);
  font-size: 15px;
  font-weight: 700;
  user-select: none;
}

.intro-details summary::-webkit-details-marker { display: none; }

.intro-details summary::before {
  content: 'ⓘ';
  color: var(--primary);
  margin-left: 8px;
}

.intro-details p {
  margin: 0 !important;
  padding: 0 17px 17px !important;
  color: var(--muted) !important;
  font-size: 14px !important;
  line-height: 1.72 !important;
}

.settings-panel {
  display: grid;
  gap: 4px;
  padding: 15px 16px 10px;
  margin: 0 0 16px;
  border: 1px solid var(--border);
  border-radius: 18px;
  background: var(--surface);
  box-shadow: var(--input-shadow);
}

.font-picker,
.toggle-row {
  margin: 0 !important;
}

.font-picker {
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.font-picker label,
.toggle-row label {
  color: var(--text) !important;
  font-size: 14px !important;
}

.font-picker select {
  min-width: 170px !important;
  max-width: 55%;
  color: var(--text) !important;
  background: var(--surface-soft) !important;
  border: 1px solid var(--border) !important;
  border-radius: 12px !important;
  padding: 9px 11px !important;
  font-size: 14px !important;
  outline: none;
}

.toggle-row {
  padding: 12px 0 2px;
  align-items: flex-start !important;
}

.toggle-row input[type='checkbox'] {
  accent-color: var(--primary);
  margin-top: 2px !important;
}

.section {
  background: var(--surface) !important;
  border: 1px solid var(--border) !important;
  border-radius: 20px !important;
  padding: 16px !important;
  margin: 0 0 16px !important;
  box-shadow: var(--shadow);
}

.section > label {
  display: block;
  margin-bottom: 3px;
  color: var(--text) !important;
  font-size: 15px;
}

textarea,
input[type='text'] {
  color: var(--text) !important;
  background: var(--surface-strong) !important;
  border: 1px solid var(--border) !important;
  border-radius: 14px !important;
  box-shadow: var(--input-shadow);
  outline: none !important;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
}

textarea:focus,
input[type='text']:focus {
  border-color: var(--primary) !important;
}

textarea {
  min-height: 160px !important;
  margin: 10px 0 0 !important;
  padding: 14px !important;
  font-size: 23px !important;
  line-height: 1.55;
}

textarea::placeholder,
input::placeholder {
  color: var(--muted) !important;
  opacity: 0.72;
}

#outputText {
  background: var(--surface-soft) !important;
}

.action-bar {
  display: grid;
  grid-template-columns: 1.25fr 1fr 0.82fr;
  gap: 9px;
  margin: 0 0 10px;
}

.action-bar button {
  width: 100%;
  min-height: 45px;
  margin: 0 !important;
  padding: 10px 12px !important;
  border-radius: 13px !important;
  font-weight: 700;
  font-size: 14px !important;
  transition: transform 0.12s ease, opacity 0.12s ease;
}

.action-bar button:active {
  transform: scale(0.98);
  opacity: 0.84;
}

#runBtn.primary {
  color: #fff !important;
  background: linear-gradient(135deg, var(--primary-strong), var(--primary)) !important;
  box-shadow: 0 8px 20px rgba(20, 87, 217, 0.22);
}

#copyBtn.secondary {
  color: var(--primary) !important;
  background: var(--primary-soft) !important;
}

#clearBtn.secondary {
  color: var(--muted) !important;
  background: var(--surface) !important;
  border: 1px solid var(--border) !important;
}

.status {
  min-height: 18px;
  margin: 8px 3px 14px !important;
  color: var(--muted) !important;
  font-size: 12px !important;
}

.optional-section {
  background: var(--surface) !important;
  box-shadow: var(--input-shadow) !important;
}

.optional-section h2 {
  color: var(--text) !important;
  font-size: 15px !important;
}

.optional-section .note {
  color: var(--muted) !important;
}

.optional-section .secondary {
  color: var(--primary) !important;
  background: var(--primary-soft) !important;
}

.danger {
  color: var(--danger) !important;
  background: transparent !important;
  border: 1px solid rgba(180, 35, 58, 0.28) !important;
}

@media (prefers-color-scheme: dark) {
  .danger {
    border-color: rgba(255, 141, 160, 0.30) !important;
  }
}

@media (max-width: 520px) {
  body {
    padding: 18px 12px 34px !important;
  }

  h1 {
    padding: 22px 18px !important;
    font-size: 19px !important;
    border-radius: 22px;
  }

  h1::before {
    font-size: 29px;
  }

  h1::after {
    left: 16px;
    font-size: 23px;
  }

  .font-picker {
    align-items: center !important;
  }

  .font-picker select {
    min-width: 145px !important;
    max-width: 58%;
  }

  .section {
    padding: 13px !important;
    border-radius: 17px !important;
  }

  .action-bar {
    grid-template-columns: 1fr 1fr;
  }

  #runBtn {
    grid-column: 1 / -1;
  }

  textarea {
    min-height: 150px !important;
    font-size: 21px !important;
  }
}
`;

const ENHANCE_PAGE = String.raw`
(function () {
  try {
    var intro = document.querySelector('body > p');
    if (intro && !document.querySelector('.intro-details')) {
      var details = document.createElement('details');
      details.className = 'intro-details';
      var summary = document.createElement('summary');
      summary.textContent = 'איך ההמרה עובדת?';
      intro.parentNode.insertBefore(details, intro);
      details.appendChild(summary);
      details.appendChild(intro);
    }

    var fontPicker = document.querySelector('.font-picker');
    var toggleRow = document.querySelector('.toggle-row');
    if (fontPicker && toggleRow && !document.querySelector('.settings-panel')) {
      var settings = document.createElement('div');
      settings.className = 'settings-panel';
      fontPicker.parentNode.insertBefore(settings, fontPicker);
      settings.appendChild(fontPicker);
      settings.appendChild(toggleRow);
    }

    var run = document.getElementById('runBtn');
    var copy = document.getElementById('copyBtn');
    var clear = document.getElementById('clearBtn');
    if (run && copy && clear && !document.querySelector('.action-bar')) {
      var actionBar = document.createElement('div');
      actionBar.className = 'action-bar';
      run.parentNode.insertBefore(actionBar, run);
      actionBar.appendChild(run);
      actionBar.appendChild(copy);
      actionBar.appendChild(clear);
    }
  } catch (e) {}
})();
true;
`;

export default function App() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const backgroundColor = isDark ? '#07111f' : '#f4f7fc';

  const enhancedHtml = useMemo(
    () => converterHtml.replace('</head>', `<style>${APP_CSS}</style></head>`),
    []
  );

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
      />
      <View style={[styles.container, { backgroundColor }]}>
        <WebView
          originWhitelist={['*']}
          source={{ html: enhancedHtml }}
          javaScriptEnabled
          domStorageEnabled
          setSupportMultipleWindows={false}
          injectedJavaScript={ENHANCE_PAGE}
          style={[styles.webView, { backgroundColor }]}
          textZoom={100}
          overScrollMode="never"
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});
