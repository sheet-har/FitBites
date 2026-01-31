
import React, { useState, useRef, useEffect } from 'react';
import { Camera, X, Loader2, CheckCircle2, Info, ArrowRight } from 'lucide-react';
import { MOCK_SNACKS } from '../constants.tsx';
import { geminiService } from '../services/geminiService';
import { SnackData, AnalysisResult } from '../types';

export const Scanner: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<SnackData | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AnalysisResult | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startScanning = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setScanning(true);
      setResult(null);
      setAiAnalysis(null);

      // Simulate QR Detection after 3 seconds
      setTimeout(() => {
        handleSnackDetected(MOCK_SNACKS[0]);
      }, 3000);
    } catch (err) {
      alert("Could not access camera. Please check permissions.");
    }
  };

  const handleSnackDetected = async (snack: SnackData) => {
    stopCamera();
    setScanning(false);
    setAnalyzing(true);
    setResult(snack);

    const aiInfo = await geminiService.analyzeFatReplacement(snack);
    setAiAnalysis(aiInfo);
    setAnalyzing(false);
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setScanning(false);
  };

  useEffect(() => {
    return () => stopCamera();
  }, [stream]);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">Smart QR Scanner</h2>
          <p className="text-gray-500 dark:text-gray-400">Point at a FitBites snack for instant analysis</p>
        </div>
      </div>

      {!scanning && !result && !analyzing && (
        <div
          onClick={startScanning}
          className="aspect-video w-full max-w-lg mx-auto border-4 border-dashed border-gray-300 dark:border-gray-700 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-fitGreen-500 transition-colors bg-gray-50 dark:bg-gray-800/50"
        >
          <div className="bg-fitGreen-100 dark:bg-fitGreen-900/30 p-6 rounded-full mb-4">
            <Camera className="text-fitGreen-600 dark:text-fitGreen-400" size={48} />
          </div>
          <span className="text-lg font-medium dark:text-white">Tap to Start Scanning</span>
        </div>
      )}

      {scanning && (
        <div className="relative aspect-video w-full max-w-lg mx-auto bg-black rounded-3xl overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 border-2 border-fitGreen-400 rounded-lg animate-pulse"></div>
          </div>
          <button
            onClick={stopCamera}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 p-2 rounded-full backdrop-blur-md"
          >
            <X size={24} className="text-white" />
          </button>
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <p className="text-white bg-black/50 inline-block px-4 py-1 rounded-full text-sm">Align QR code within the box</p>
          </div>
        </div>
      )}

      {analyzing && (
        <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-300">
          <Loader2 className="animate-spin text-fitGreen-500 mb-4" size={48} />
          <p className="text-lg font-medium dark:text-white">Analyzing Nutrition Profile...</p>
          <p className="text-gray-500 dark:text-gray-400">Fetching fat replacement data from the cloud</p>
        </div>
      )}

      {result && aiAnalysis && (
        <div className="space-y-6 animate-in slide-in-from-bottom-10 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main Product Info */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <img src={result.image} alt={result.name} className="w-24 h-24 rounded-2xl object-cover" />
                <div>
                  <h3 className="text-xl font-bold dark:text-white">{result.name}</h3>
                  <p className="text-fitGreen-600 font-medium">{result.brand}</p>
                  <div className="mt-2 inline-flex items-center gap-1 bg-fitGreen-100 dark:bg-fitGreen-900/40 text-fitGreen-700 dark:text-fitGreen-300 px-3 py-1 rounded-full text-xs font-bold">
                    <CheckCircle2 size={14} /> Smart Choice Verified
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-gray-500 dark:text-gray-400">Fat Replacement Score</span>
                  <span className="text-3xl font-black text-fitGreen-600">{result.score}/100</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-fitGreen-500 h-3 rounded-full"
                    style={{ width: `${result.score}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t dark:border-gray-700">
                <h4 className="font-semibold mb-3 dark:text-white flex items-center gap-2">
                  <Info size={18} /> Fat Breakdown
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500">Normal Fat</p>
                    <p className="text-lg font-bold text-gray-700 dark:text-gray-300">{result.normalFat}g</p>
                  </div>
                  <div className="bg-fitGreen-50 dark:bg-fitGreen-900/20 p-3 rounded-xl border border-fitGreen-200 dark:border-fitGreen-900/50">
                    <p className="text-xs text-fitGreen-600">Replaced Fat</p>
                    <p className="text-lg font-bold text-fitGreen-700 dark:text-fitGreen-300">{result.replacedFat}g</p>
                  </div>
                </div>

                <div className="mt-4 bg-orange-50 dark:bg-orange-900/10 p-4 rounded-2xl border border-orange-100 dark:border-orange-900/30 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-orange-600 dark:text-orange-400 font-bold uppercase">Calorie Intake</p>
                    <p className="text-2xl font-black text-orange-700 dark:text-orange-300">{result.calories} <span className="text-sm font-normal">kcal</span></p>
                  </div>
                  <div className="bg-orange-100 dark:bg-orange-900/40 p-2 rounded-xl text-orange-600">
                    <Info size={20} />
                  </div>
                </div>
                <p className="text-sm mt-4 text-gray-600 dark:text-gray-400 italic">
                  *This snack saves you {result.normalFat - result.replacedFat}g of unhealthy fats!
                </p>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-fitBrown-500 text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Loader2 size={20} />
                  </div>
                  <h3 className="text-lg font-bold">AI Fat Analysis</h3>
                </div>
                <p className="text-fitBrown-100 leading-relaxed mb-6">
                  {aiAnalysis.comparison}
                </p>
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-fitBrown-200">Recommended Swaps</h4>
                  {aiAnalysis.suggestions.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-colors cursor-default">
                      <div className="bg-fitGreen-400 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-fitBrown-900">
                        {i + 1}
                      </div>
                      <span className="text-sm">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-xs font-bold text-fitGreen-400 uppercase mb-1">Expert Health Tip</p>
                <p className="text-sm italic">"{aiAnalysis.healthTip}"</p>
              </div>
              <div className="mt-4 flex items-center justify-between bg-white/10 p-3 rounded-2xl">
                <span className="text-xs font-bold uppercase">Estimated Calories</span>
                <span className="text-xl font-black">{aiAnalysis.estimatedCalories} kcal</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => { setResult(null); setAiAnalysis(null); }}
            className="w-full bg-fitGreen-500 hover:bg-fitGreen-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
          >
            Scan Another Product <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
