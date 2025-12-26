import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RefundPolicy() {
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">환불정책</h1>
          <p className="text-gray-600 mb-8">최종 업데이트: 2025년 11월 21일</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section className="bg-cyan-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-blue-900 mb-3">환불정책 요약</h2>
              <p className="font-semibold">
                AI 교사 민원지킴이는 공정하고 투명한 환불 정책을 운영하고 있습니다.
                서비스 이용 기간 및 사유에 따라 부분 환불 또는 전액 환불이 가능합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">1. 환불 가능 기간</h2>

              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 bg-green-50 p-4 rounded-r-lg">
                  <p className="font-semibold text-green-900 mb-2">✓ 7일 이내 전액 환불 (100%)</p>
                  <p>
                    서비스 개통 후 7일 이내에 해지를 요청하시는 경우,
                    별도의 사유 없이 전액 환불이 가능합니다.
                    단, 070 번호 개통비 (₩10,000)는 공제됩니다.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4 bg-yellow-50 p-4 rounded-r-lg">
                  <p className="font-semibold text-yellow-900 mb-2">✓ 8일~14일 이내 부분 환불 (50%)</p>
                  <p>
                    서비스 개통 후 8일~14일 이내에 해지를 요청하시는 경우,
                    사용 기간에 해당하는 금액을 공제한 후 잔여 금액의 50%를 환불해드립니다.
                  </p>
                </div>

                <div className="border-l-4 border-red-500 pl-4 bg-red-50 p-4 rounded-r-lg">
                  <p className="font-semibold text-red-900 mb-2">✗ 15일 이후 환불 불가</p>
                  <p>
                    서비스 개통 후 15일이 경과한 경우에는 환불이 불가능합니다.
                    다만, 회사의 귀책사유로 서비스 이용이 불가능했던 경우에는 예외적으로 환불이 가능합니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">2. 환불 계산 방법</h2>

              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4">환불금 계산 공식</h3>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold mb-2">7일 이내:</p>
                    <code className="bg-blue-50 px-3 py-2 rounded block">
                      환불금 = 결제금액 - 개통비(₩10,000)
                    </code>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold mb-2">8일~14일:</p>
                    <code className="bg-blue-50 px-3 py-2 rounded block">
                      환불금 = (결제금액 - 개통비 - 사용일수 요금) × 50%
                    </code>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <p className="font-semibold mb-2">일할 계산:</p>
                    <code className="bg-blue-50 px-3 py-2 rounded block">
                      1일 요금 = (월 요금) ÷ 30일
                    </code>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3">환불 계산 예시</h3>

                <div className="space-y-4">
                  <div>
                    <p className="font-semibold mb-2">예시 1) Standard 요금제, 5일 사용 후 해지</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                      <li>결제금액: ₩39,900</li>
                      <li>사용기간: 5일</li>
                      <li>환불금: ₩39,900 - ₩10,000 = <span className="font-bold text-blue-900">₩29,900</span></li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2">예시 2) Basic 요금제, 10일 사용 후 해지</p>
                    <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                      <li>결제금액: ₩29,900</li>
                      <li>사용기간: 10일</li>
                      <li>1일 요금: ₩29,900 ÷ 30 = ₩997</li>
                      <li>사용 요금: ₩997 × 10일 = ₩9,970</li>
                      <li>환불금: (₩29,900 - ₩10,000 - ₩9,970) × 50% = <span className="font-bold text-blue-900">₩4,965</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">3. 환불 신청 방법</h2>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-900 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</span>
                    <div>
                      <p className="font-semibold">이메일 문의</p>
                      <p className="text-sm mt-1">cs@sorynory.com으로 환불 신청 이메일 발송</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-900 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</span>
                    <div>
                      <p className="font-semibold">정보 제공</p>
                      <p className="text-sm mt-1">회원 정보, 가입 일자, 환불 사유 등 기재</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-900 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</span>
                    <div>
                      <p className="font-semibold">확인 및 처리</p>
                      <p className="text-sm mt-1">영업일 기준 3일 이내 환불 가능 여부 및 금액 안내</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-blue-900 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">4</span>
                    <div>
                      <p className="font-semibold">환불 완료</p>
                      <p className="text-sm mt-1">승인 후 5~7 영업일 이내 환불 처리 (카드사별 상이)</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">4. 환불 제외 사항</h2>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <p className="font-semibold text-red-900 mb-3">다음의 경우 환불이 제한됩니다:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>이용자의 귀책사유로 서비스 이용이 정지된 경우</li>
                  <li>서비스를 부정한 방법으로 이용한 경우</li>
                  <li>무료 체험 기간을 이미 사용한 후 유료 전환한 경우 (체험 기간 중 해지는 가능)</li>
                  <li>월 통화량 제한을 초과하여 추가 요금이 발생한 경우</li>
                  <li>타인에게 양도하거나 대여한 사실이 확인된 경우</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">5. 회사 귀책사유로 인한 환불</h2>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <p className="mb-4">
                  다음의 경우 이용 기간에 상관없이 <span className="font-bold">전액 환불</span>이 가능합니다:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>서비스가 정상적으로 제공되지 않아 이용이 불가능했던 경우</li>
                  <li>회사가 약속한 서비스 기능이 제공되지 않은 경우</li>
                  <li>070 번호가 개통되지 않아 서비스 이용이 불가능한 경우</li>
                  <li>시스템 장애로 인해 연속 24시간 이상 서비스 이용이 불가능한 경우</li>
                </ul>
                <p className="mt-4 text-sm">
                  * 회사 귀책사유 여부는 고객센터를 통한 상담 후 최종 결정됩니다.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">6. 환불 처리 기간</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-semibold text-blue-900 mb-2">신용카드 결제</p>
                  <p className="text-sm">승인 취소 후 5~7 영업일 이내<br />(카드사별로 상이할 수 있음)</p>
                </div>
                <div className="bg-cyan-50 p-4 rounded-lg">
                  <p className="font-semibold text-blue-900 mb-2">계좌이체</p>
                  <p className="text-sm">환불 계좌 확인 후 3~5 영업일 이내</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">7. 자동 갱신 및 해지</h2>

              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-semibold mb-2">자동 갱신</p>
                  <p className="text-sm">
                    모든 요금제는 월 단위로 자동 갱신됩니다.
                    갱신일 3일 전까지 해지 신청을 하지 않으면 자동으로 다음 달 요금이 결제됩니다.
                  </p>
                </div>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-semibold mb-2">해지 신청</p>
                  <p className="text-sm">
                    해지는 언제든지 가능하며, 해지 신청 시 당월 말까지 서비스 이용이 가능합니다.
                    단, 당월 요금은 환불되지 않습니다.
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-semibold text-yellow-900 mb-2">⚠️ 중요</p>
                  <p className="text-sm">
                    자동 갱신을 원하지 않으시면 갱신일 <span className="font-bold">최소 3일 전</span>까지
                    해지 신청을 완료해주셔야 합니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">8. 분쟁 해결</h2>
              <p className="mb-4">
                환불 및 서비스 이용과 관련하여 분쟁이 발생한 경우,
                회사와 이용자는 상호 협의를 통해 원만히 해결하도록 노력합니다.
              </p>
              <p>
                협의가 이루어지지 않을 경우 「전자상거래 등에서의 소비자보호에 관한 법률」에 따라
                한국소비자원 또는 전자거래분쟁조정위원회에 조정을 신청할 수 있습니다.
              </p>
            </section>

            <section className="bg-blue-50 p-6 rounded-lg mt-8">
              <h2 className="text-xl font-bold text-blue-900 mb-3">환불 문의</h2>
              <p className="mb-4">
                환불과 관련하여 궁금하신 사항이 있으시면 아래로 연락주시기 바랍니다.
                친절하고 신속하게 안내해드리겠습니다.
              </p>
              <div className="space-y-2">
                <p className="font-semibold">소리노리닷컴</p>
                <p>이메일: cs@sorynory.com</p>
                <p className="text-sm text-gray-600">운영시간: 평일 09:00 - 18:00 (주말 및 공휴일 휴무)</p>
              </div>
            </section>
          </div>
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
