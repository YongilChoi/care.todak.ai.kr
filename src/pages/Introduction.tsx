import { Shield, Phone, FileText, MessageSquare, Check, AlertTriangle, Clock, ChevronDown, Mail, User, PhoneIcon, Lock, BarChart3, Zap, TrendingUp, School, Building2, Users, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Introduction() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-signup-email`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      });

      if (!response.ok) {
        throw new Error('신청 처리 중 오류가 발생했습니다.');
      }

      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="AI 교사 민원지킴이" className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-base sm:text-xl font-bold text-blue-900">AI 교사 민원지킴이</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition">핵심 기능</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition">작동 방식</a>
              <a href="#dashboard" className="text-gray-700 hover:text-blue-600 transition">대시보드</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">도입 문의</a>
              <Link to="/student-records" className="text-gray-700 hover:text-blue-600 transition">
                생활기록부 도우미
              </Link>
              <Link to="/voice-to-text" className="text-gray-700 hover:text-blue-600 transition">
                음성-텍스트
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-900 mb-6 leading-tight">
              선생님들을 위한 AI민원 지킴이
            </h1>
            <p className="text-2xl sm:text-3xl font-semibold text-blue-600 mb-4">
              AI가 교사를 지켜줍니다
            </p>
            <p className="text-xl text-gray-600 mb-12">
              민원 스트레스로부터의 디지털 방패
            </p>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed">
              AI 인바운드 콜, 050 가상번호 회전, 폭언·악성 민원 차단, STT/NLU 요약·티켓으로<br />
              교권을 보호하고 학교 행정을 효율화합니다.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <a
                href="#demo"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-lg"
              >
                시연 보기
              </a>
              <a
                href="#contact"
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition shadow-lg"
              >
                학교 도입 문의
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-blue-600">
              <div className="text-4xl font-bold text-blue-600 mb-2">60%+</div>
              <div className="text-gray-600 font-medium">FAQ 자동해결율(목표)</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-cyan-600">
              <div className="text-4xl font-bold text-cyan-600 mb-2">1.2s</div>
              <div className="text-gray-600 font-medium">TTS 1차 응답 시간</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center border-t-4 border-green-600">
              <div className="text-4xl font-bold text-green-600 mb-2">90%+</div>
              <div className="text-gray-600 font-medium">의도 분류 정확도</div>
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">AI</div>
                <div className="flex-1 bg-white rounded-lg p-4 shadow">
                  <p className="text-gray-800">
                    안녕하세요, OO초 민원 지킴이입니다. "학사일정·규정·상담예약·기타" 중 말씀해 주세요.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 flex-row-reverse">
                <div className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold">학부모</div>
                <div className="flex-1 bg-blue-600 text-white rounded-lg p-4 shadow">
                  <p>체험학습 출석 처리 기준이 궁금합니다.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">AI</div>
                <div className="flex-1 bg-white rounded-lg p-4 shadow">
                  <p className="text-gray-800">
                    출석 인정 기준을 안내드렸습니다. 자세한 내용은 문자 링크로 전송합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-6">왜 지금 필요한가</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              교사 민원 스트레스와 교권 침해는 해마다 증가하고 있습니다.<br />
              AI 기반의 체계적 민원 대응으로, 교사의 심리적 부담을 줄이고 행정 효율을 높여야 합니다.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-5xl font-bold text-red-600 mb-4">48%</div>
              <p className="text-gray-700 font-medium">교육활동 침해 경험 응답률</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-5xl font-bold text-orange-600 mb-4">31%</div>
              <p className="text-gray-700 font-medium">경력 5년 미만 퇴직 증가</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <TrendingUp className="w-12 h-12 text-red-600" />
                <div className="text-4xl font-bold text-red-600">증가세</div>
              </div>
              <p className="text-gray-700 font-medium">교단 이탈 인원 매년 증가</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">핵심 기능</h2>
            <p className="text-xl text-gray-600">교사 보호에 필요한 기능을 모두 하나의 SaaS로 제공합니다.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-600 w-14 h-14 rounded-xl flex items-center justify-center">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">050/070 가상번호</h3>
              </div>
              <p className="text-gray-600 mb-4 font-semibold">개인번호 노출 없이 안전한 통화</p>
              <p className="text-gray-700 leading-relaxed">
                교사별 전용 번호 발급·주기적 회전으로 개인정보를 보호합니다.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-green-50 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-cyan-600 w-14 h-14 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">AI 인바운드 콜</h3>
              </div>
              <p className="text-gray-600 mb-4 font-semibold">STT/NLU로 1차 자동응답</p>
              <p className="text-gray-700 leading-relaxed">
                학사일정·규정 등 FAQ는 즉시 음성·문자로 응답합니다.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-red-600 w-14 h-14 rounded-xl flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">차단 가드</h3>
              </div>
              <p className="text-gray-600 mb-4 font-semibold">폭언·고성·반복 민원 자동 차단</p>
              <p className="text-gray-700 leading-relaxed">
                독성·감정 분석 임계치 기반 경고→종료→관리자 알림까지.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-purple-600 w-14 h-14 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">통계/리포트</h3>
              </div>
              <p className="text-gray-600 mb-4 font-semibold">민원 유형·시간대·SLA 리포팅</p>
              <p className="text-gray-700 leading-relaxed">
                교사 부담 지수와 재문의율을 지표화해 정책 수립에 활용.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">작동 방식</h2>
            <p className="text-xl text-blue-200">학부모 → AI 지킴이 → 교사까지 이어지는 단순하고 강력한 흐름.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">발신</h3>
              <p className="text-blue-100">학부모가 가상번호로 전화</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="bg-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">분류</h3>
              <p className="text-blue-100">IVR 안내 → STT 전사 → NLU 분석</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">라우팅</h3>
              <p className="text-blue-100">FAQ 자동응답 또는 긴급 콜만 연결</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-bold mb-3">저장/알림</h3>
              <p className="text-blue-100">요약·티켓 생성, 관리자/교사 알림</p>
            </div>
          </div>
        </div>
      </section>

      <section id="dashboard" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">교사용 대시보드 미리보기</h2>
            <p className="text-xl text-gray-600">실시간 큐, 요약, 추천 액션, 차단/보존 정책까지 한 화면에서.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-blue-50 rounded-lg p-4 flex-1 min-w-[200px]">
                <div className="text-sm text-gray-600 mb-1">오늘 요약 문자</div>
                <div className="text-3xl font-bold text-blue-600">36</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4 flex-1 min-w-[200px]">
                <div className="text-sm text-gray-600 mb-1">긴급 콜</div>
                <div className="text-3xl font-bold text-red-600">3</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 flex-1 min-w-[200px]">
                <div className="text-sm text-gray-600 mb-1">차단 건수</div>
                <div className="text-3xl font-bold text-orange-600">5</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 flex-1 min-w-[200px]">
                <div className="text-sm text-gray-600 mb-1">평균 SLA</div>
                <div className="text-3xl font-bold text-green-600">12m</div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-red-600 bg-red-50 rounded-lg p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">CRITICAL</span>
                    <span className="font-bold text-gray-900">학교폭력 의심 신고</span>
                  </div>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition">
                    지금 연결
                  </button>
                </div>
                <p className="text-gray-700">요약: 3학년 2반 / 담임 상담 요청</p>
              </div>

              <div className="border-l-4 border-orange-500 bg-orange-50 rounded-lg p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded">HIGH</span>
                    <span className="font-bold text-gray-900">체험학습 출석 문의</span>
                  </div>
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
                    FAQ 전송
                  </button>
                </div>
                <p className="text-gray-700">규정 링크 전송</p>
              </div>

              <div className="border-l-4 border-blue-500 bg-blue-50 rounded-lg p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded">NORMAL</span>
                    <span className="font-bold text-gray-900">숙제 분량 문의</span>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
                    콜백 예약
                  </button>
                </div>
                <p className="text-gray-700">콜백 제안</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">추천 답변 & 정책</h3>
            <p className="text-gray-700 mb-6">PII 마스킹·독성 제거된 요약을 바탕으로 규정·FAQ 카드가 자동 추천됩니다.</p>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-600">
                <p className="text-gray-900">• <strong>[규정]</strong> 체험학습 출석 처리 기준 – 링크 전송</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-l-4 border-cyan-600">
                <p className="text-gray-900">• <strong>[FAQ]</strong> 상담 예약 슬롯 – 16:30 / 17:00</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-l-4 border-red-600">
                <p className="text-gray-900">• <strong>[정책]</strong> 독성 점수 ≥ 0.85 시 통화 종료 & 관리자 알림</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">협력·도입 주체</h2>
            <p className="text-xl text-gray-600">공공–민간 컨소시엄 기반의 시범 운영 및 제도화를 지향합니다.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
              <School className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <p className="font-bold text-blue-900">교육부</p>
            </div>
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 text-center">
              <Building2 className="w-12 h-12 text-cyan-600 mx-auto mb-3" />
              <p className="font-bold text-cyan-900">교육청</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
              <Building2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <p className="font-bold text-green-900">지자체</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
              <Zap className="w-12 h-12 text-purple-600 mx-auto mb-3" />
              <p className="font-bold text-purple-900">IT/AI</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center">
              <Users className="w-12 h-12 text-orange-600 mx-auto mb-3" />
              <p className="font-bold text-orange-900">교원단체</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 text-center">
              <ShieldCheck className="w-12 h-12 text-red-600 mx-auto mb-3" />
              <p className="font-bold text-red-900">보안·컴플라이언스</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">보안·컴플라이언스</h2>
            <p className="text-xl text-gray-600">최소수집, 익명화, 암호화, 보존/파기, 감사로그까지 기본 탑재.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">PII 마스킹</h3>
              <p className="text-gray-700">이름·번호 등 민감정보 자동 가림</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Lock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">암호화</h3>
              <p className="text-gray-700">전송 TLS, 저장 KMS, RBAC/MFA</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">보존·파기</h3>
              <p className="text-gray-700">요약 6개월, 원본 30일 등 정책화</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">기대 효과</h2>
            <p className="text-xl text-gray-600">데이터로 증명되는 교권 보호와 운영 효율화.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-8 text-center">
              <div className="text-5xl font-bold text-blue-600 mb-4">+60%</div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">업무시간 절감</h3>
              <p className="text-gray-700">FAQ 자동 응답</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl shadow-xl p-8 text-center">
              <div className="text-5xl font-bold text-red-600 mb-4">-80%</div>
              <h3 className="text-xl font-bold text-red-900 mb-2">악성 민원 감소</h3>
              <p className="text-gray-700">독성·반복 차단</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-cyan-50 rounded-2xl shadow-xl p-8 text-center">
              <div className="text-5xl font-bold text-green-600 mb-4">-20%</div>
              <h3 className="text-xl font-bold text-green-900 mb-2">재문의율 감소</h3>
              <p className="text-gray-700">종료 후 SMS 카드</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">도입 문의하기</h2>
            <p className="text-xl text-gray-600">궁금한 사항이 있으시면 언제든지 문의해주세요</p>
          </div>

          {isSuccess ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
              <div className="flex justify-center mb-6">
                <Check className="w-20 h-20 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold text-blue-900 mb-4">문의가 접수되었습니다!</h3>
              <p className="text-lg text-gray-700 mb-8">
                담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="bg-blue-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition"
              >
                다시 문의하기
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
                      placeholder="홍길동"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
                      placeholder="010-1234-5678"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                    문의 내용
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
                    placeholder="문의하실 내용을 자유롭게 작성해주세요"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-900">
                    <strong>개인정보 수집 및 이용 동의</strong>
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    입력하신 정보는 서비스 상담 및 문의 응대를 위해 수집되며, 목적 달성 후 즉시 파기됩니다.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-900 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '제출 중...' : '제출하기'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="AI 교사 민원지킴이" className="w-8 h-8" />
                <span className="text-xl font-bold">AI 교사 민원지킴이</span>
              </div>
              <p className="text-blue-200">교사를 지키는 AI 솔루션</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">서비스</h4>
              <ul className="space-y-2 text-blue-200">
                <li><a href="#features" className="hover:text-white transition">기능 소개</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition">작동 방식</a></li>
                <li><a href="#dashboard" className="hover:text-white transition">대시보드</a></li>
                <li><a href="#contact" className="hover:text-white transition">문의하기</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">회사</h4>
              <ul className="space-y-2 text-blue-200">
                <li>소리노리닷컴</li>
                <li><a href="mailto:cs@sorynory.com" className="hover:text-white transition">cs@sorynory.com</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">법적 고지</h4>
              <ul className="space-y-2 text-blue-200">
                <li><Link to="/terms" className="hover:text-white transition">이용약관</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition">개인정보처리방침</Link></li>
                <li><Link to="/refund" className="hover:text-white transition">환불정책</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800 pt-8 text-center text-blue-300">
            <p>&copy; 2025 소리노리닷컴. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
