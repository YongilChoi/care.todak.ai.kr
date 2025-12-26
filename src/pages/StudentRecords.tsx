import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, BookOpen, Save, List, Sparkles, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface StudentRecord {
  id: string;
  student_name: string;
  grade: number;
  class_number: number;
  student_number: number;
  activity_description: string;
  generated_record: string;
  created_at: string;
  updated_at: string;
}

export default function StudentRecords() {
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState('');
  const [classNumber, setClassNumber] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [generatedRecord, setGeneratedRecord] = useState('');
  const [savedRecords, setSavedRecords] = useState<StudentRecord[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const { data, error } = await supabase
      .from('student_records')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching records:', error);
    } else {
      setSavedRecords(data || []);
    }
  };

  const generateRecord = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const templates = [
        `${studentName} 학생은 ${activityDescription}에 적극적으로 참여하며 뛰어난 성과를 보였습니다. 특히 협력적인 태도와 책임감 있는 행동으로 학급 내에서 모범이 되고 있으며, 지속적인 노력으로 성장하는 모습을 보여주고 있습니다.`,
        `${studentName} 학생은 ${activityDescription}를 통해 자신의 잠재력을 발휘하였습니다. 창의적인 사고와 문제해결 능력을 보여주었으며, 동료들과의 원활한 소통으로 긍정적인 학습 분위기를 조성하는 데 기여하였습니다.`,
        `${studentName} 학생은 ${activityDescription} 활동에서 성실하고 적극적인 자세를 보였습니다. 자기주도적 학습 태도가 돋보이며, 어려움에 직면했을 때도 끈기 있게 과제를 수행하는 모습에서 성장 가능성을 확인할 수 있었습니다.`,
      ];

      const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
      setGeneratedRecord(randomTemplate);
      setIsGenerating(false);
    }, 1500);
  };

  const saveRecord = async () => {
    if (!studentName || !grade || !classNumber || !studentNumber || !generatedRecord) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    setIsSaving(true);

    const { error } = await supabase
      .from('student_records')
      .insert({
        student_name: studentName,
        grade: parseInt(grade),
        class_number: parseInt(classNumber),
        student_number: parseInt(studentNumber),
        activity_description: activityDescription,
        generated_record: generatedRecord,
      });

    if (error) {
      console.error('Error saving record:', error);
      alert('저장 중 오류가 발생했습니다.');
    } else {
      alert('생활기록부가 저장되었습니다.');
      setStudentName('');
      setGrade('');
      setClassNumber('');
      setStudentNumber('');
      setActivityDescription('');
      setGeneratedRecord('');
      fetchRecords();
    }

    setIsSaving(false);
  };

  const deleteRecord = async (id: string) => {
    if (!confirm('이 기록을 삭제하시겠습니까?')) return;

    const { error } = await supabase
      .from('student_records')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting record:', error);
      alert('삭제 중 오류가 발생했습니다.');
    } else {
      fetchRecords();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="AI 교사 민원지킴이" className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-base sm:text-xl font-bold text-blue-900">AI 교사 민원지킴이</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                to="/voice-to-text"
                className="text-gray-700 hover:text-blue-900 transition font-medium"
              >
                음성-텍스트
              </Link>
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-900 transition font-medium"
              >
                홈으로
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <BookOpen className="w-16 h-16 text-blue-900" />
            </div>
            <h1 className="text-4xl font-bold text-blue-900 mb-4">학생 생활기록부 작성 도우미</h1>
            <p className="text-xl text-gray-600">AI가 도와주는 생활기록부 작성 서비스</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                학생 정보 입력
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    학생 이름 *
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="홍길동"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      학년 *
                    </label>
                    <input
                      type="number"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="1"
                      min="1"
                      max="6"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      반 *
                    </label>
                    <input
                      type="number"
                      value={classNumber}
                      onChange={(e) => setClassNumber(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="1"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      번호 *
                    </label>
                    <input
                      type="number"
                      value={studentNumber}
                      onChange={(e) => setStudentNumber(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      placeholder="1"
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    활동/행동 특성 *
                  </label>
                  <textarea
                    value={activityDescription}
                    onChange={(e) => setActivityDescription(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none h-32 resize-none"
                    placeholder="예시: 과학 실험 활동, 독서 토론 활동, 체육 대회 참여 등"
                  />
                </div>

                <button
                  onClick={generateRecord}
                  disabled={isGenerating || !studentName || !activityDescription}
                  className="w-full bg-blue-900 text-white py-4 rounded-lg font-bold hover:bg-blue-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  {isGenerating ? '생성 중...' : 'AI 생활기록부 생성'}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                생성된 생활기록부
              </h2>

              {generatedRecord ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                    <textarea
                      value={generatedRecord}
                      onChange={(e) => setGeneratedRecord(e.target.value)}
                      className="w-full bg-transparent border-none focus:outline-none h-64 resize-none text-gray-800 leading-relaxed"
                    />
                  </div>

                  <button
                    onClick={saveRecord}
                    disabled={isSaving}
                    className="w-full bg-cyan-600 text-white py-4 rounded-lg font-bold hover:bg-cyan-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {isSaving ? '저장 중...' : '생활기록부 저장'}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                  <BookOpen className="w-24 h-24 mb-4" />
                  <p className="text-lg">학생 정보를 입력하고 생성 버튼을 눌러주세요</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-12">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <List className="w-6 h-6 text-blue-900" />
                <h2 className="text-2xl font-bold text-blue-900">
                  저장된 생활기록부 ({savedRecords.length}건)
                </h2>
              </div>
              <span className="text-gray-600">{showHistory ? '숨기기' : '보기'}</span>
            </button>

            {showHistory && (
              <div className="mt-6 space-y-4">
                {savedRecords.length === 0 ? (
                  <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
                    저장된 기록이 없습니다.
                  </div>
                ) : (
                  savedRecords.map((record) => (
                    <div key={record.id} className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-blue-900">
                            {record.student_name} ({record.grade}학년 {record.class_number}반 {record.student_number}번)
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(record.created_at).toLocaleString('ko-KR')}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteRecord(record.id)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg mb-3">
                        <p className="text-sm font-semibold text-gray-700 mb-2">활동 내용:</p>
                        <p className="text-gray-800">{record.activity_description}</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm font-semibold text-blue-900 mb-2">생활기록부:</p>
                        <p className="text-gray-800 leading-relaxed">{record.generated_record}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
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
