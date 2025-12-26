import { Shield, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('신청 처리 중 오류가 발생했습니다.');
      }

      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link to="/" className="inline-flex items-center gap-2 text-blue-900 hover:text-blue-700 transition mb-4">
              <ArrowLeft className="w-5 h-5" />
              <span>홈으로 돌아가기</span>
            </Link>
            <div className="flex items-center gap-2 mt-4">
              <img src="/logo.png" alt="AI 교사 민원지킴이" className="w-8 h-8" />
              <h1 className="text-2xl font-bold text-blue-900">AI 교사 민원지킴이</h1>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-20 h-20 text-green-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">신청이 완료되었습니다!</h1>
            <p className="text-lg text-gray-700 mb-4">
              가입 신청이 성공적으로 접수되었습니다.
            </p>
            <p className="text-gray-600 mb-8">
              담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </main>

        <footer className="bg-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8 mt-12">
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
                  <li><Link to="/" className="hover:text-white transition">홈</Link></li>
                  <li><a href="/#features" className="hover:text-white transition">기능 소개</a></li>
                  <li><a href="/#pricing" className="hover:text-white transition">요금제</a></li>
                  <li><a href="/#faq" className="hover:text-white transition">FAQ</a></li>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-900 hover:text-blue-700 transition mb-4">
            <ArrowLeft className="w-5 h-5" />
            <span>홈으로 돌아가기</span>
          </Link>
          <div className="flex items-center gap-2 mt-4">
            <img src="/logo.png" alt="AI 교사 민원지킴이" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-blue-900">AI 교사 민원지킴이</h1>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">070/050 번호 개통 신청</h1>
          <p className="text-gray-600 mb-8">
            정보를 입력해주시면 담당자가 빠르게 연락드리겠습니다.
          </p>

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
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
                placeholder="홍길동"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                이메일 <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                연락처 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
                placeholder="010-1234-5678"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>개인정보 수집 및 이용 동의</strong>
              </p>
              <p className="text-sm text-gray-700 mt-2">
                입력하신 정보는 서비스 상담 및 개통을 위해 수집되며, 목적 달성 후 즉시 파기됩니다.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-900 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '제출 중...' : '신청하기'}
            </button>
          </form>
        </div>
      </main>

      <footer className="bg-blue-900 text-white py-12 px-4 sm:px-6 lg:px-8 mt-12">
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
                <li><Link to="/" className="hover:text-white transition">홈</Link></li>
                <li><a href="/#features" className="hover:text-white transition">기능 소개</a></li>
                <li><a href="/#pricing" className="hover:text-white transition">요금제</a></li>
                <li><a href="/#faq" className="hover:text-white transition">FAQ</a></li>
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
