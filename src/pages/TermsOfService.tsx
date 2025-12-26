import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">이용약관</h1>
          <p className="text-gray-600 mb-8">최종 업데이트: 2025년 11월 21일</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">제1조 (목적)</h2>
              <p>
                본 약관은 소리노리닷컴(이하 "회사")이 제공하는 AI 교사 민원지킴이 서비스(이하 "서비스")의 이용과 관련하여
                회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">제2조 (정의)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>"서비스"란 회사가 제공하는 AI 기반 교사 민원 자동 대응, 기록, 티켓 발행 시스템을 말합니다.</li>
                <li>"이용자"란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 개인 또는 법인을 말합니다.</li>
                <li>"070 AI 번호"란 회사가 제공하는 070 인터넷 전화번호를 통한 AI 음성 응대 서비스를 말합니다.</li>
                <li>"티켓"이란 민원 내용을 분류하여 자동으로 생성되는 업무 관리 항목을 말합니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">제3조 (약관의 효력 및 변경)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>본 약관은 서비스 화면에 게시하거나 기타의 방법으로 공지함으로써 효력이 발생합니다.</li>
                <li>회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있습니다.</li>
                <li>약관이 변경되는 경우 회사는 변경사항을 시행일자 7일 전부터 공지합니다.</li>
                <li>이용자가 변경된 약관에 동의하지 않는 경우, 서비스 이용을 중단하고 탈퇴할 수 있습니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">제4조 (서비스의 제공)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>회사는 다음과 같은 서비스를 제공합니다:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>070 AI 번호를 통한 음성 민원 자동 응대</li>
                    <li>민원 내용의 자동 분류 및 티켓 발행</li>
                    <li>통화 녹음 및 텍스트 변환(STT)</li>
                    <li>악성 민원 자동 필터링 및 차단</li>
                    <li>자동 문자 회신 기능</li>
                  </ul>
                </li>
                <li>서비스는 연중무휴 1일 24시간 제공함을 원칙으로 합니다.</li>
                <li>회사는 시스템 점검, 증설, 교체 등의 사유로 서비스 제공을 일시적으로 중단할 수 있습니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">제5조 (이용 계약의 성립)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>이용 계약은 이용자가 본 약관에 동의하고 회사가 정한 가입 절차를 완료함으로써 성립됩니다.</li>
                <li>회사는 다음 각 호에 해당하는 경우 가입을 거부할 수 있습니다:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>실명이 아니거나 타인의 명의를 도용한 경우</li>
                    <li>허위 정보를 기재한 경우</li>
                    <li>사회의 안녕질서 또는 미풍양속을 저해할 목적으로 신청한 경우</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">제6조 (요금 및 결제)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>서비스 이용 요금은 회사가 정한 요금제에 따라 청구됩니다.</li>
                <li>요금은 월 단위 선불 결제를 원칙으로 하며, 카드 자동결제로 진행됩니다.</li>
                <li>이용자는 결제 수단 정보를 정확히 입력해야 하며, 결제 불능 시 서비스가 중단될 수 있습니다.</li>
                <li>회사는 요금을 변경할 경우 변경 30일 전에 공지합니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">제7조 (이용자의 의무)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>이용자는 다음 행위를 하여서는 안 됩니다:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>타인의 정보 도용</li>
                    <li>회사가 게시한 정보의 변경</li>
                    <li>회사가 정한 정보 이외의 정보 등의 송신 또는 게시</li>
                    <li>불법적이거나 부당한 목적으로 서비스를 이용하는 행위</li>
                  </ul>
                </li>
                <li>이용자는 관계 법령, 본 약관, 이용안내 및 서비스상에 공지한 주의사항 등을 준수해야 합니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">제8조 (회사의 의무)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>회사는 관련 법령과 본 약관을 준수하며, 안정적이고 지속적인 서비스 제공을 위해 최선을 다합니다.</li>
                <li>회사는 이용자의 개인정보 보호를 위해 보안 시스템을 구축하고 개인정보처리방침을 공시합니다.</li>
                <li>회사는 서비스 이용과 관련하여 이용자로부터 제기된 의견이나 불만이 정당하다고 인정할 경우
                    이를 처리하기 위해 노력합니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">제9조 (개인정보 보호)</h2>
              <p>
                회사는 관련 법령이 정하는 바에 따라 이용자의 개인정보를 보호하기 위해 노력합니다.
                개인정보의 보호 및 이용에 대해서는 관련 법령 및 회사의 개인정보처리방침이 적용됩니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">제10조 (계약 해지 및 환불)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>이용자는 언제든지 서비스 이용 계약을 해지할 수 있습니다.</li>
                <li>환불 정책은 별도의 환불정책 페이지에 명시된 내용에 따릅니다.</li>
                <li>회사는 이용자가 본 약관을 위반한 경우 사전 통보 후 계약을 해지할 수 있습니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">제11조 (면책사항)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력으로 인해 서비스를 제공할 수 없는 경우
                    서비스 제공에 대한 책임이 면제됩니다.</li>
                <li>회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여 책임을 지지 않습니다.</li>
                <li>회사는 AI 시스템의 응답 정확도를 높이기 위해 노력하나, 모든 응답의 정확성을 보장하지는 않습니다.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">제12조 (준거법 및 관할법원)</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>본 약관은 대한민국 법령에 의하여 규정되고 이행됩니다.</li>
                <li>서비스 이용으로 발생한 분쟁에 대한 소송은 회사의 본사 소재지를 관할하는 법원을 전속 관할로 합니다.</li>
              </ol>
            </section>

            <section className="bg-blue-50 p-6 rounded-lg mt-8">
              <h2 className="text-xl font-bold text-blue-900 mb-3">문의하기</h2>
              <p className="mb-2">본 약관에 대한 문의사항이 있으시면 아래로 연락주시기 바랍니다.</p>
              <p className="font-semibold">
                소리노리닷컴<br />
                이메일: cs@sorynory.com
              </p>
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
