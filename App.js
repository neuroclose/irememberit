import { useRef, useState } from "react";
import { SafeAreaView, ActivityIndicator, TouchableOpacity, Text, View, Platform } from "react-native";
import { WebView } from "react-native-webview";

const APP_URL = "https://irememberit.replit.app"; // <-- replace with your real HTTPS Replit URL

export default function App() {
  const webRef = useRef(null);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    if (Platform.OS === "web") {
      const el = document.getElementById("preview-iframe");
      if (el) el.src = el.src;
    } else {
      webRef.current?.reload();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Simple header */}
      <View style={{ height: 48, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>iRememberIT</Text>
        <TouchableOpacity onPress={refresh}><Text>Refresh</Text></TouchableOpacity>
      </View>

      {Platform.OS === "web" ? (
        <iframe
          id="preview-iframe"
          src={APP_URL}
          title="preview"
          style={{ border: 0, width: "100%", height: "100%" }}
        />
      ) : (
        <>
          <WebView
            ref={webRef}
            source={{ uri: APP_URL }}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            allowsBackForwardNavigationGestures
            javaScriptEnabled
            domStorageEnabled
            setSupportMultipleWindows={false}
            mediaPlaybackRequiresUserAction={false}
            allowsInlineMediaPlayback
          />
          {loading && (
            <View style={{ position: "absolute", top: 64, left: 0, right: 0 }}>
              <ActivityIndicator />
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}
