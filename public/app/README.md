# Android App Setup Instructions

## 1. Upload APK File
Place your `UniqueSkillsLab.apk` file in this directory (`public/app/`).

## 2. Get SHA256 Fingerprint
To get the SHA256 fingerprint of your APK for Digital Asset Links:

### Method 1: Using keytool (if you have the keystore)
```bash
keytool -list -v -keystore "C:\Users\ALI\uniqueskillslab.jks" -alias your_alias_name
```

### Method 2: Using APK file directly
```bash
# Extract the certificate from APK
unzip -p UniqueSkillsLab.apk META-INF/*.RSA | keytool -printcert

# Or using aapt (Android Asset Packaging Tool)
aapt dump badging UniqueSkillsLab.apk
```

### Method 3: Using online tools
1. Upload your APK to: https://www.apkmonk.com/app/
2. Look for the SHA256 fingerprint in the app details

## 3. Update assetlinks.json
Once you have the SHA256 fingerprint, update the `public/.well-known/assetlinks.json` file:

```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.uniqueskillslab.app",
    "sha256_cert_fingerprints": [
      "YOUR_ACTUAL_SHA256_FINGERPRINT_HERE"
    ]
  }
}]
```

## 4. Verify Digital Asset Links
After deployment, verify your Digital Asset Links at:
https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://yourdomain.com&relation=delegate_permission/common.handle_all_urls

## 5. Test APK Download
Visit `/download-app` on your deployed site to test the download functionality.
