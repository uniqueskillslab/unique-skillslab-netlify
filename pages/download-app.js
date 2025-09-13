import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function DownloadApp() {
  const [downloadingApp, setDownloadingApp] = useState(null);

  const apps = [
    {
      id: 'uniqueskillslab',
      name: 'UniqueSkillsLab',
      description: 'Learn digital skills with our comprehensive courses',
      logo: '/assets/usl_logo.png',
      features: [
        'Offline course access',
        'Progress tracking',
        'Certificate downloads'
      ],
      apkPath: '/app/UniqueSkillsLab.apk'
    },
    {
      id: 'uniqenewshd',
      name: 'UniqeNewsHD',
      description: 'Stay updated with the latest news and updates',
      logo: '/assets/uniqenewshd_logo.png',
      features: [
        'Latest news updates',
        'HD video content',
        'Real-time notifications'
      ],
      apkPath: '/app/UniqeNewsHD.apk',
      certificateInfo: {
        md5: 'C9:A3:D8:75:FA:FC:63:11:0D:C6:AB:81:0F:FB:D5:98',
        sha1: '12:98:05:AB:F9:16:A1:5B:CB:9D:53:41:15:DB:BB:D4:77:27:1E:C7',
        sha256: 'CC:8F:44:14:6E:76:4B:5E:AC:6A:A6:C2:4B:5F:1D:FA:5A:47:AC:F8:ED:4E:B9:E7:14:A7:88:36:8A:5B:20:76',
        validUntil: 'Saturday, June 7, 2053'
      }
    }
  ];

  const handleDownload = (appId) => {
    // Navigate to Play Store-like page
    window.location.href = `/playstore/${appId}`;
  };

  return (
    <>
      <Head>
        <title>Download Our Apps - Android APK</title>
        <meta name="description" content="Download our Android apps: UniqueSkillsLab for learning and UniqeNewsHD for news updates" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Download Our App
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get our apps on your Android device for the best experience
            </p>
          </div>

          {/* Apps Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {apps.map((app) => (
              <div key={app.id} className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex flex-col items-center text-center">
                  {/* App Icon/Preview */}
                  <div className="flex-shrink-0 mb-6">
                    <div className="w-32 h-32 rounded-2xl shadow-lg overflow-hidden">
                      <Image
                        src={app.logo}
                        alt={`${app.name} Logo`}
                        width={128}
                        height={128}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                  {/* App Details */}
                  <div className="flex-1 w-full">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {app.name}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {app.description}
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      {app.features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={() => handleDownload(app.id)}
                      disabled={downloadingApp === app.id}
                      className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-teal-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                    >
                      {downloadingApp === app.id ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Downloading...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download APK
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">
              Installation Instructions
            </h3>
            <ol className="space-y-2 text-blue-800">
              <li className="flex items-start gap-2">
                <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">1</span>
                <span>Download the APK file by clicking the download button above</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">2</span>
                <span>Enable "Install from unknown sources" in your Android settings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">3</span>
                <span>Open the downloaded APK file and follow the installation prompts</span>
              </li>
            </ol>
          </div>

          {/* Security Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="text-yellow-600 text-xl">⚠️</div>
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Security Notice</h4>
                <p className="text-yellow-700 text-sm">
                  Our APKs are signed with official certificates. If you see any security warnings, 
                  make sure you're downloading from our official website. The apps are safe to install.
                </p>
              </div>
            </div>
          </div>

          {/* Certificate Information for UniqeNewsHD */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              UniqeNewsHD Certificate Information
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">MD5</h4>
                <p className="text-sm text-gray-600 font-mono break-all">
                  C9:A3:D8:75:FA:FC:63:11:0D:C6:AB:81:0F:FB:D5:98
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-700 mb-2">SHA1</h4>
                <p className="text-sm text-gray-600 font-mono break-all">
                  12:98:05:AB:F9:16:A1:5B:CB:9D:53:41:15:DB:BB:D4:77:27:1E:C7
                </p>
              </div>
              <div className="md:col-span-2">
                <h4 className="font-medium text-gray-700 mb-2">SHA-256</h4>
                <p className="text-sm text-gray-600 font-mono break-all">
                  CC:8F:44:14:6E:76:4B:5E:AC:6A:A6:C2:4B:5F:1D:FA:5A:47:AC:F8:ED:4E:B9:E7:14:A7:88:36:8A:5B:20:76
                </p>
              </div>
              <div className="md:col-span-2">
                <h4 className="font-medium text-gray-700 mb-2">Valid Until</h4>
                <p className="text-sm text-gray-600">
                  Saturday, June 7, 2053
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
