import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function DownloadApp() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Trigger download
      window.open('/api/download-app', '_blank');
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Download UniqueSkillsLab App - Android APK</title>
        <meta name="description" content="Download the UniqueSkillsLab Android app to access courses on the go" />
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
              Get the UniqueSkillsLab app on your Android device for the best learning experience
            </p>
          </div>

          {/* App Info Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* App Icon/Preview */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-4xl font-bold">USL</span>
                </div>
              </div>

              {/* App Details */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  UniqueSkillsLab
                </h2>
                <p className="text-gray-600 mb-4">
                  Learn digital skills with our comprehensive courses
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-700">Offline course access</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-700">Progress tracking</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-gray-700">Certificate downloads</span>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-teal-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isDownloading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Downloading...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
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
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <div className="text-yellow-600 text-xl">⚠️</div>
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Security Notice</h4>
                <p className="text-yellow-700 text-sm">
                  This APK is signed with our official certificate. If you see any security warnings, 
                  make sure you're downloading from our official website. The app is safe to install.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
