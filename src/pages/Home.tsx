import { Shield, Phone, FileText, MessageSquare, Check, AlertTriangle, Clock, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const navigate = useNavigate();

  const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      if (window.gtag) {
        window.gtag('event', eventName, eventParams);
      }

      if (window.dataLayer) {
        window.dataLayer.push({
          event: eventName,
          ...eventParams
        });
      }

      console.log('Event tracked:', eventName, eventParams);
    }
  };

  const handleCTAClick = (location: string, plan?: string) => {
    trackEvent('cta_click', {
      event_category: 'engagement',
      event_label: location,
      plan: plan || 'none',
      timestamp: new Date().toISOString()
    });

    if (plan && ['basic', 'standard', 'professional'].includes(plan)) {
      alert('현재 무료로 서비스 중입니다.\n하루만에 개통하기 버튼을 눌러주시고, 구매 버튼을 눌러주셔서 감사합니다.');
    } else {
      navigate('/signup');
    }
  };

  const handleDemoClick = (location: string) => {
    trackEvent('demo_click', {
      event_category: 'engagement',
      event_label: location,
      timestamp: new Date().toISOString()
    });
    window.open('https://youtu.be/mYjgDw71P-4', '_blank');
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
              <Link to="/introduction" className="text-gray-700 hover:text-blue-900 transition">도입문의</Link>
              <a href="#features" className="text-gray-700 hover:text-blue-900 transition">기능</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-900 transition">요금제</a>
              <a href="#faq" className="text-gray-700 hover:text-blue-900 transition">FAQ</a>
              <Link to="/student-records" className="text-gray-700 hover:text-blue-900 transition font-medium">
                생활기록부 도우미
              </Link>
              <Link to="/voice-to-text" className="text-gray-700 hover:text-blue-900 transition font-medium">
                음성-텍스트
              </Link>
              <button
                onClick={() => handleCTAClick('header')}
                className="bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                지금 시작하기
              </button>
            </nav>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-6 leading-tight">
            교사를 지키는 가장 빠른 방법<br />
            <span className="text-cyan-600">AI 교사 민원지킴이</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-4 leading-relaxed px-2">
            교권 침해·악성 민원·반복 전화로부터 교사를 보호하는
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-12 px-2">
            AI 기반 자동 대응·기록·티켓 발행 서비스
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => handleCTAClick('hero')}
              className="bg-blue-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold hover:bg-blue-800 transition shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              👉 하루 만에 070/050 번호 개통하기
            </button>
            <button
              onClick={() => handleDemoClick('hero')}
              className="bg-white text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold border-2 border-blue-900 hover:bg-blue-50 transition w-full sm:w-auto"
            >
              👉 데모 보기
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">이런 문제로 힘드셨나요?</h2>
            <p className="text-xl text-gray-600">교사들이 실제로 겪고 있는 문제들입니다</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
              <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">악성 민원으로 교사 소진</h3>
              <p className="text-gray-600">폭언과 위협으로 인한 정신적 피해</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
              <Phone className="w-12 h-12 text-orange-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">매일 반복되는 전화</h3>
              <p className="text-gray-600">같은 내용의 전화가 계속 반복됨</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
              <Clock className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">근무 시간 외 전화 폭주</h3>
              <p className="text-gray-600">개인 시간까지 침해받는 상황</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-600">
              <FileText className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">녹취 없어서 대응 어려움</h3>
              <p className="text-gray-600">교권 침해 발생 시 증거 부족</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">AI가 교사를 지킵니다</h2>
            <p className="text-xl text-gray-600">핵심 기능으로 교사의 시간과 권리를 보호합니다</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-lg">
              <div className="bg-blue-900 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">① AI 음성·문자 민원 자동 대응</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <span>교사 대신 070/050번호가 전화를 받음</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <span>STT + NLU로 민원 자동 분류</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <span>긴급/보통/학사안내/악성민원 자동 필터링</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-yellow-50 p-8 rounded-2xl shadow-lg">
              <div className="bg-cyan-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">② 티켓 자동 생성 & 대기표 시스템</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                  <span>항목별 분류: 학사일정/생활기록/폭력/보통질문/악성</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                  <span>교사가 편한 시간에 답변 가능</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                  <span>악성/위협 민원은 AI가 자동으로 대응 지연</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-blue-50 p-8 rounded-2xl shadow-lg">
              <div className="bg-yellow-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">③ 녹취 음성 → 텍스트 변환</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span>모든 통화 자동 기록 → 교사 보호용 증거 PDF로 저장</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span>시간별 로그 자동 저장</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <span>법적 증거로 활용 가능</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl shadow-lg">
              <div className="bg-blue-700 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">④ AI 자동 문자 회신</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <span>학사 일정, 급식, 공지사항 자동 전송</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <span>교사가 직접 통화할 필요 없음</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <span>24시간 자동 응대 가능</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Before / After</h2>
            <p className="text-xl text-blue-200">AI 교사 민원지킴이가 만드는 변화</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-900/30 p-8 rounded-2xl border-2 border-red-400">
              <h3 className="text-2xl font-bold mb-6 text-red-300">Before — 문제점</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                  <span className="text-lg">악성 민원으로 교사 소진</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                  <span className="text-lg">매일 반복되는 전화</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                  <span className="text-lg">근무 시간 외 전화 폭주</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />
                  <span className="text-lg">녹취 없어서 교권 침해 대응 어려움</span>
                </li>
              </ul>
            </div>

            <div className="bg-cyan-900/30 p-8 rounded-2xl border-2 border-cyan-400">
              <h3 className="text-2xl font-bold mb-6 text-cyan-300">After — 솔루션</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                  <span className="text-lg">070/050 AI가 선응대 → 교사 보호</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                  <span className="text-lg">악성 민원 자동 필터링</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                  <span className="text-lg">모든 통화가 자동 기록</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                  <span className="text-lg">교사는 필요한 민원만 확인</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">합리적인 요금제</h2>
            <p className="text-xl text-gray-600">070/050 번호 발급비·유지비 포함</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200 hover:border-blue-400 transition">
              <div className="text-center mb-6">
                <div className="text-yellow-500 text-2xl mb-2">⭐</div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">Starter</h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-blue-900">무료</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">070 AI 대표번호 1개</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">음성 민원 자동응대</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">민원 STT 기록</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">기본 티켓 발행</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">기본 문자 회신 기능</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">최대 월 200콜</span>
                </li>
              </ul>
              <button
                onClick={() => handleCTAClick('pricing', 'basic')}
                className="w-full bg-gray-200 text-blue-900 py-3 rounded-lg font-bold hover:bg-gray-300 transition"
              >
                시작하기
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-2xl border-4 border-cyan-500 hover:border-cyan-600 transition relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-cyan-500 text-white px-6 py-1 rounded-full text-sm font-bold">
                인기
              </div>
              <div className="text-center mb-6">
                <div className="text-yellow-500 text-2xl mb-2">⭐⭐</div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">Standard</h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-cyan-600">₩39,900</span>
                  <span className="text-gray-600">/ 월</span>
                </div>
              </div>
              <div className="bg-cyan-50 p-3 rounded-lg mb-4">
                <p className="text-sm font-semibold text-cyan-900">Starter 포함 + 추가 기능</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 font-semibold">악성·폭언 민원 자동 필터링</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">대기표 시스템</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">담당자 자동 연결</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">월 500콜</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 font-semibold">PDF 증거자료 자동 생성</span>
                </li>
              </ul>
              <button
                onClick={() => handleCTAClick('pricing', 'standard')}
                className="w-full bg-cyan-600 text-white py-3 rounded-lg font-bold hover:bg-cyan-700 transition"
              >
                시작하기
              </button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-200 hover:border-blue-900 transition">
              <div className="text-center mb-6">
                <div className="text-yellow-500 text-2xl mb-2">⭐⭐⭐</div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">Professional</h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-blue-900">₩59,900</span>
                  <span className="text-gray-600">/ 월</span>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <p className="text-sm font-semibold text-blue-900">Standard 포함 + 추가 기능</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-900 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 font-semibold">고급 AI 분류 모델 적용(GPT 기반)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-900 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 font-semibold">반복·위협 민원 자동 차단 규칙</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-900 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">기관 단위 계정(팀 계정)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-900 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">자동 리포트 생성</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-900 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">월 1,500콜</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-900 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 font-semibold">학부모 CRM(번호·대화 이력 저장)</span>
                </li>
              </ul>
              <button
                onClick={() => handleCTAClick('pricing', 'professional')}
                className="w-full bg-blue-900 text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition"
              >
                시작하기
              </button>
            </div>
          </div>
          <p className="text-center mt-8 text-gray-600 text-lg font-semibold">
            모든 요금제: 070/050 번호 발급비·유지비 포함
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">지금 바로 시작하세요</h2>
          <p className="text-xl text-cyan-100 mb-8">하루 만에 070/050 번호를 개통하고 AI 보호를 시작하세요</p>
          <button
            onClick={() => handleCTAClick('demo_cta')}
            className="bg-white text-cyan-600 px-12 py-5 rounded-lg text-xl font-bold hover:bg-gray-100 transition shadow-xl"
          >
            무료로 시작하기
          </button>
        </div>
      </section>

      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">자주 묻는 질문</h2>
            <p className="text-xl text-gray-600">궁금하신 점을 확인하세요</p>
          </div>
          <div className="space-y-4">
            {[
              {
                q: '070 번호를 본인 휴대전화로 연결할 수 있나요?',
                a: '네, 가능합니다. 070 AI 번호는 교사님의 기존 휴대전화나 학교 번호로 연결할 수 있으며, AI가 먼저 응대한 후 필요한 경우에만 교사님께 연결됩니다. 설정은 대시보드에서 간편하게 변경 가능합니다.'
              },
              {
                q: 'AI가 잘못 응답하면 어떻게 되나요?',
                a: 'AI는 학습을 통해 지속적으로 개선되며, 불확실한 내용은 자동으로 교사에게 티켓으로 전달됩니다. 또한 모든 대화는 녹음·기록되어 교사가 언제든지 확인하고 수정할 수 있습니다. 오답률은 평균 3% 미만으로 유지됩니다.'
              },
              {
                q: '학교 단위로 대량 가입이 가능한가요?',
                a: '네, Professional 요금제에서 기관 단위 계정을 제공합니다. 학교 전체 교사를 위한 통합 관리 시스템, 대량 할인, 전담 고객지원을 제공하며, 별도 문의 시 맞춤 견적을 제공해드립니다.'
              },
              {
                q: '개인정보 보호는 어떻게 보장하나요?',
                a: '모든 통화 기록과 개인정보는 국내 서버에 암호화되어 저장되며, 개인정보보호법 및 교육정보시스템 보안 기준을 준수합니다. 데이터는 교사와 관리자만 접근 가능하며, 외부 유출 방지를 위한 다중 보안 시스템을 운영합니다.'
              }
            ].map((faq, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition"
                >
                  <span className="text-lg font-bold text-blue-900">{faq.q}</span>
                  <ChevronDown
                    className={`w-6 h-6 text-blue-900 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
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
                <li><a href="#pricing" className="hover:text-white transition">요금제</a></li>
                <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
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
