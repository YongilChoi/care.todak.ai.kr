import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mic, Upload, FileAudio, Loader2, Save, Download, Copy, CheckCircle2, Play, Pause, Menu, X } from 'lucide-react';
import { splitAudioFile } from '../utils/audioSplitter';

const MAX_FILE_SIZE = 200 * 1024 * 1024;

export default function VoiceToText() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [transcribedText, setTranscribedText] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSplitting, setIsSplitting] = useState(false);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('audio/')) {
        setError('음성 파일만 업로드 가능합니다.');
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError(`파일 크기가 최대 허용 크기(200MB)를 초과했습니다. 현재 파일 크기: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
        return;
      }
      await processFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      setError('음성 파일만 업로드 가능합니다.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(`파일 크기가 최대 허용 크기(200MB)를 초과했습니다. 현재 파일 크기: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
      return;
    }

    await processFile(file);
  };

  const processFile = async (file: File) => {
    setAudioFile(file);
    setError('');
    setTranscribedText('');
    setUploadProgress(0);
    setCurrentChunk(0);
    setTotalChunks(0);
    setOverallProgress(0);
    setCurrentStep('');

    try {
      const fileSizeMB = file.size / (1024 * 1024);
      const isLargeFile = fileSizeMB > 24;

      let chunks: File[] = [file];

      if (isLargeFile) {
        setCurrentStep('파일 분할 중');
        setIsSplitting(true);
        setOverallProgress(5);
        chunks = await splitAudioFile(file);
        console.log(`파일이 ${chunks.length}개 청크로 분할되었습니다.`);
        chunks.forEach((chunk, idx) => {
          console.log(`청크 ${idx + 1}: ${chunk.name}, 크기: ${(chunk.size / (1024 * 1024)).toFixed(2)}MB`);
        });
        setTotalChunks(chunks.length);
        setIsSplitting(false);
        setOverallProgress(15);
      }

      const transcriptions: string[] = [];
      const totalSteps = chunks.length * 2;

      for (let i = 0; i < chunks.length; i++) {
        setCurrentChunk(i + 1);

        setCurrentStep(`업로드 중 (${i + 1}/${chunks.length})`);
        setIsUploading(true);

        const formData = new FormData();
        formData.append('file', chunks[i]);
        formData.append('fileName', chunks[i].name);

        const uploadUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/upload-audio`;
        const uploadResponse = await fetch(uploadUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: formData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          const chunkSize = (chunks[i].size / (1024 * 1024)).toFixed(2);
          throw new Error(`청크 ${i + 1} (${chunkSize}MB) 업로드 실패: ${errorData.error || '알 수 없는 오류'}`);
        }

        const uploadResult = await uploadResponse.json();
        const fileId = uploadResult.fileId;

        const uploadStep = i * 2 + 1;
        const uploadProgress = 15 + (uploadStep / totalSteps) * 35;
        setOverallProgress(Math.round(uploadProgress));
        setUploadProgress(100);
        setIsUploading(false);

        setCurrentStep(`변환 중 (${i + 1}/${chunks.length})`);
        setIsProcessing(true);

        const transcribeUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/transcribe-audio`;
        const transcribeResponse = await fetch(transcribeUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileId: fileId,
          }),
        });

        if (!transcribeResponse.ok) {
          const errorData = await transcribeResponse.json();
          throw new Error(errorData.error || '음성 변환에 실패했습니다.');
        }

        const result = await transcribeResponse.json();
        transcriptions.push(result.transcription);

        const transcribeStep = i * 2 + 2;
        const transcribeProgress = 15 + (transcribeStep / totalSteps) * 85;
        setOverallProgress(Math.round(transcribeProgress));
        setIsProcessing(false);
      }

      setTranscribedText(transcriptions.join(' '));
      setOverallProgress(100);
      setCurrentStep('완료');
      setCurrentChunk(0);
      setTotalChunks(0);

    } catch (err) {
      console.error('Processing error:', err);
      setError(err instanceof Error ? err.message : '처리 중 오류가 발생했습니다.');
      setIsUploading(false);
      setIsProcessing(false);
      setIsSplitting(false);
      setCurrentChunk(0);
      setTotalChunks(0);
      setOverallProgress(0);
      setCurrentStep('');
    }
  };

  const handleCopy = () => {
    if (transcribedText) {
      navigator.clipboard.writeText(transcribedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (transcribedText) {
      const blob = new Blob([transcribedText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transcription_${new Date().getTime()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleTextEdit = (text: string) => {
    setTranscribedText(text);
  };

  const handleReset = () => {
    setAudioFile(null);
    setTranscribedText('');
    setError('');
    setUploadProgress(0);
    setIsPlaying(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const toggleAudioPlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const fileSizeMB = audioFile ? (audioFile.size / (1024 * 1024)).toFixed(2) : '0';
  const isLargeFile = audioFile && audioFile.size > 24 * 1024 * 1024;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="AI 교사 민원지킴이" className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-base sm:text-xl font-bold text-blue-900">AI 교사 민원지킴이</span>
            </Link>

            <nav className="hidden md:flex items-center gap-4">
              <Link
                to="/student-records"
                className="text-gray-700 hover:text-blue-900 transition font-medium"
              >
                생활기록부 도우미
              </Link>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-900 transition font-medium"
              >
                홈으로
              </Link>
            </nav>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {menuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <Link
                to="/student-records"
                className="block py-2 text-gray-700 hover:text-blue-900 transition font-medium"
                onClick={() => setMenuOpen(false)}
              >
                생활기록부 도우미
              </Link>
              <Link
                to="/"
                className="block py-2 text-gray-700 hover:text-blue-900 transition font-medium"
                onClick={() => setMenuOpen(false)}
              >
                홈으로
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Mic className="w-16 h-16 text-blue-900" />
            </div>
            <h1 className="text-4xl font-bold text-blue-900 mb-4">음성-텍스트 변환</h1>
            <p className="text-xl text-gray-600">음성 파일을 업로드하고 텍스트로 변환하세요</p>
            <p className="text-sm text-blue-600 mt-2">최대 파일 크기: 200MB (큰 파일은 자동으로 분할 처리)</p>
          </div>

{!transcribedText ? (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                  <Upload className="w-6 h-6" />
                  음성 파일 업로드
                </h2>

                {!audioFile || (!isUploading && !isProcessing) ? (
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-3 border-dashed border-blue-300 rounded-xl p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
                  >
                    <FileAudio className="w-20 h-20 text-blue-400 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-gray-700 mb-2">
                      음성 파일을 드래그하거나 클릭하여 업로드
                    </p>
                    <p className="text-sm text-gray-500">
                      지원 형식: MP3, WAV, M4A, WEBM
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="audio/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <FileAudio className="w-6 h-6 text-blue-600" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 truncate">{audioFile?.name}</p>
                          <p className="text-sm text-gray-600">{fileSizeMB} MB</p>
                        </div>
                      </div>
                      {isLargeFile && (
                        <p className="text-xs text-orange-600 mt-2">
                          큰 파일은 FFmpeg으로 자동 분할하여 처리합니다
                        </p>
                      )}
                    </div>

                    {(isSplitting || isUploading || isProcessing) && (
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6 shadow-lg">
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
                              <div>
                                <p className="font-bold text-blue-900 text-lg">{currentStep}</p>
                                {totalChunks > 1 && (
                                  <p className="text-sm text-blue-700">
                                    {currentChunk}/{totalChunks} 파일 처리 중
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-blue-900">{overallProgress}%</p>
                            </div>
                          </div>

                          <div className="w-full bg-blue-200 rounded-full h-4 overflow-hidden shadow-inner">
                            <div
                              className="bg-gradient-to-r from-blue-600 to-cyan-600 h-4 rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
                              style={{ width: `${overallProgress}%` }}
                            >
                              {overallProgress > 5 && (
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div className={`p-3 rounded-lg transition ${isSplitting ? 'bg-orange-100 border-2 border-orange-300' : overallProgress > 15 ? 'bg-green-100 border-2 border-green-300' : 'bg-gray-100 border-2 border-gray-200'}`}>
                            <p className={`text-xs font-semibold ${isSplitting ? 'text-orange-700' : overallProgress > 15 ? 'text-green-700' : 'text-gray-500'}`}>
                              1. 파일 분할
                            </p>
                          </div>
                          <div className={`p-3 rounded-lg transition ${isUploading ? 'bg-blue-100 border-2 border-blue-300' : overallProgress > 50 ? 'bg-green-100 border-2 border-green-300' : 'bg-gray-100 border-2 border-gray-200'}`}>
                            <p className={`text-xs font-semibold ${isUploading ? 'text-blue-700' : overallProgress > 50 ? 'text-green-700' : 'text-gray-500'}`}>
                              2. 업로드
                            </p>
                          </div>
                          <div className={`p-3 rounded-lg transition ${isProcessing ? 'bg-blue-100 border-2 border-blue-300' : overallProgress === 100 ? 'bg-green-100 border-2 border-green-300' : 'bg-gray-100 border-2 border-gray-200'}`}>
                            <p className={`text-xs font-semibold ${isProcessing ? 'text-blue-700' : overallProgress === 100 ? 'text-green-700' : 'text-gray-500'}`}>
                              3. 변환
                            </p>
                          </div>
                        </div>

                        {isLargeFile && (
                          <p className="text-xs text-gray-600 mt-4 text-center">
                            큰 파일은 여러 조각으로 나누어 처리됩니다
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {error && (
                  <div className="mt-6 bg-red-50 border-2 border-red-200 rounded-lg p-4">
                    <p className="text-red-700 font-semibold">{error}</p>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex flex-col items-center justify-center h-[500px] text-gray-400">
                  <Mic className="w-24 h-24 mb-4" />
                  <p className="text-lg text-center">
                    {isUploading || isProcessing ? (
                      <>처리 중입니다...</>
                    ) : (
                      <>음성 파일을 업로드해주세요</>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                  <FileAudio className="w-6 h-6" />
                  음성 파일 재생
                </h2>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <FileAudio className="w-6 h-6 text-blue-600" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 truncate">{audioFile?.name}</p>
                        <p className="text-sm text-gray-600">{fileSizeMB} MB</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <p className="font-semibold text-green-900">변환 완료!</p>
                    </div>
                  </div>

                  <audio
                    ref={audioRef}
                    src={audioFile ? URL.createObjectURL(audioFile) : ''}
                    onEnded={() => setIsPlaying(false)}
                    className="w-full"
                    controls
                  />

                  <button
                    onClick={handleReset}
                    className="w-full px-6 py-3 border-2 border-gray-300 rounded-lg font-bold hover:bg-gray-100 transition"
                  >
                    새 파일 업로드
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                    <Save className="w-6 h-6" />
                    변환된 텍스트
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                      title="복사"
                    >
                      {copied ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                      title="다운로드"
                    >
                      <Download className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      텍스트 편집
                    </label>
                    <textarea
                      value={transcribedText}
                      onChange={(e) => handleTextEdit(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none font-mono text-sm"
                      rows={20}
                      placeholder="변환된 텍스트가 여기에 표시됩니다..."
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">총 글자 수:</span> {transcribedText.length}자
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      <span className="font-semibold">단어 수:</span>{' '}
                      {transcribedText.trim() ? transcribedText.trim().split(/\s+/).length : 0}개
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {transcribedText && (
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-blue-900 mb-4">다음 단계</h3>
              <p className="text-gray-700 mb-4">
                변환된 텍스트를 생활기록부 작성에 활용하세요.
              </p>
              <Link
                to="/student-records"
                className="inline-flex items-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-cyan-700 transition"
              >
                생활기록부 도우미로 이동
              </Link>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-blue-900 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-blue-200">
            &copy; 2025 소리노리닷컴. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
