import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
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
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">개인정보처리방침</h1>
          <p className="text-gray-600 mb-8">최종 업데이트: 2025년 11월 21일</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">1. 개인정보 수집 항목 및 방법</h2>

              <h3 className="text-xl font-semibold text-blue-800 mb-3 mt-6">가. 수집하는 개인정보 항목</h3>
              <p className="mb-4">회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다:</p>

              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="font-semibold mb-2">필수 정보:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>이름, 이메일 주소, 휴대전화번호</li>
                  <li>소속 기관명 (학교, 학원, 유치원 등)</li>
                  <li>070 전화번호 연결 정보</li>
                  <li>결제 정보 (카드번호, 유효기간 등)</li>
                </ul>
              </div>

              <div className="bg-cyan-50 p-4 rounded-lg">
                <p className="font-semibold mb-2">서비스 이용 과정에서 자동 수집되는 정보:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>통화 녹음 파일 및 텍스트 변환 데이터</li>
                  <li>민원인 전화번호 및 통화 시간</li>
                  <li>서비스 이용 기록, 접속 로그, IP 주소</li>
                  <li>쿠키, 기기정보</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-blue-800 mb-3 mt-6">나. 개인정보 수집 방법</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>웹사이트 회원가입 및 서비스 이용 과정</li>
                <li>전화 상담 및 이메일 문의</li>
                <li>서비스 이용 중 자동 수집 도구를 통한 수집</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">2. 개인정보의 수집 및 이용 목적</h2>
              <p className="mb-4">회사는 수집한 개인정보를 다음의 목적으로 이용합니다:</p>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold text-blue-900 mb-2">서비스 제공</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>AI 음성 응대 및 민원 관리 서비스 제공</li>
                    <li>070 번호 개통 및 관리</li>
                    <li>통화 녹음 및 텍스트 변환 서비스</li>
                    <li>민원 티켓 자동 생성 및 분류</li>
                  </ul>
                </div>

                <div className="border-l-4 border-cyan-500 pl-4">
                  <p className="font-semibold text-blue-900 mb-2">회원 관리</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>회원제 서비스 이용에 따른 본인 확인</li>
                    <li>개인 식별, 불량회원의 부정 이용 방지</li>
                    <li>가입 의사 확인, 연령 확인</li>
                    <li>고지사항 전달</li>
                  </ul>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <p className="font-semibold text-blue-900 mb-2">요금 결제</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>서비스 이용에 대한 요금 결제</li>
                    <li>콘텐츠 제공에 대한 요금 정산</li>
                  </ul>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold text-blue-900 mb-2">서비스 개선</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>신규 서비스 개발 및 맞춤 서비스 제공</li>
                    <li>통계학적 특성에 따른 서비스 제공 및 광고 게재</li>
                    <li>서비스 유효성 확인, 접속 빈도 파악</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">3. 개인정보의 보유 및 이용 기간</h2>
              <p className="mb-4">
                회사는 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
                단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다:
              </p>

              <div className="bg-gray-100 p-6 rounded-lg space-y-4">
                <div>
                  <p className="font-semibold text-blue-900 mb-2">가. 회사 내부 방침에 의한 정보 보유</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>통화 녹음 기록: 3년 (교권 보호 증거 자료)</li>
                    <li>민원 처리 기록: 3년</li>
                    <li>서비스 이용 기록: 1년</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-blue-900 mb-2">나. 관련 법령에 의한 정보 보유</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)</li>
                    <li>대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래법)</li>
                    <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래법)</li>
                    <li>통신사실확인자료: 12개월 (통신비밀보호법)</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">4. 개인정보의 파기 절차 및 방법</h2>

              <h3 className="text-xl font-semibold text-blue-800 mb-3 mt-4">파기 절차</h3>
              <p className="mb-4">
                이용자가 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져
                내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.
              </p>

              <h3 className="text-xl font-semibold text-blue-800 mb-3 mt-4">파기 방법</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>전자적 파일 형태: 복구 및 재생이 불가능한 기술적 방법을 사용하여 완전히 삭제</li>
                <li>종이에 출력된 개인정보: 분쇄기로 분쇄하거나 소각</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">5. 개인정보의 제3자 제공</h2>
              <p className="mb-4">
                회사는 원칙적으로 이용자의 개인정보를 외부에 제공하지 않습니다.
                다만, 아래의 경우에는 예외로 합니다:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>이용자가 사전에 동의한 경우</li>
                <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">6. 개인정보 처리 위탁</h2>
              <p className="mb-4">
                회사는 서비스 향상을 위해 아래와 같이 개인정보 처리업무를 외부 전문업체에 위탁하여 운영하고 있습니다:
              </p>

              <div className="bg-blue-50 p-4 rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-blue-200">
                      <th className="text-left py-2 px-4">위탁 업체</th>
                      <th className="text-left py-2 px-4">위탁 업무 내용</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-blue-100">
                      <td className="py-2 px-4">결제대행사</td>
                      <td className="py-2 px-4">신용카드 결제 처리</td>
                    </tr>
                    <tr className="border-b border-blue-100">
                      <td className="py-2 px-4">통신사업자</td>
                      <td className="py-2 px-4">070 번호 제공 및 관리</td>
                    </tr>
                    <tr className="border-b border-blue-100">
                      <td className="py-2 px-4">클라우드 서비스 제공업체</td>
                      <td className="py-2 px-4">데이터 보관 및 관리</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">7. 정보주체의 권리·의무 및 행사 방법</h2>
              <p className="mb-4">이용자는 다음과 같은 권리를 행사할 수 있습니다:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>개인정보 열람 요구</li>
                <li>오류 등이 있을 경우 정정 요구</li>
                <li>삭제 요구</li>
                <li>처리 정지 요구</li>
              </ul>
              <p className="mt-4">
                위 권리 행사는 서면, 이메일, 팩스 등을 통하여 하실 수 있으며,
                회사는 이에 대해 지체 없이 조치하겠습니다.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">8. 개인정보 보호를 위한 기술적·관리적 대책</h2>

              <h3 className="text-xl font-semibold text-blue-800 mb-3 mt-4">가. 기술적 대책</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>개인정보는 암호화되어 저장 및 관리됩니다</li>
                <li>해킹 등에 대비한 보안 프로그램을 설치 및 주기적으로 갱신·점검</li>
                <li>접근 통제 시스템을 설치하여 외부로부터의 무단 접근을 통제</li>
              </ul>

              <h3 className="text-xl font-semibold text-blue-800 mb-3 mt-6">나. 관리적 대책</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>개인정보 처리 담당자를 최소한으로 제한</li>
                <li>개인정보 처리자에 대한 정기적인 교육 실시</li>
                <li>개인정보 처리 시스템 접근 기록의 보관 및 점검</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">9. 개인정보 보호책임자</h2>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="mb-4">회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고,
                  개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제를 위하여 아래와 같이
                  개인정보 보호책임자를 지정하고 있습니다:</p>

                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold mb-2">개인정보 보호책임자</p>
                  <ul className="space-y-1">
                    <li>소속: 소리노리닷컴</li>
                    <li>이메일: cs@sorynory.com</li>
                    <li>전화: 문의 이메일로 연락 주시기 바랍니다</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-blue-900 mb-4">10. 개인정보 처리방침의 변경</h2>
              <p>
                본 개인정보처리방침은 2025년 11월 21일부터 적용되며,
                법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는
                변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
            </section>

            <section className="bg-blue-50 p-6 rounded-lg mt-8">
              <h2 className="text-xl font-bold text-blue-900 mb-3">개인정보 침해 신고 및 상담</h2>
              <p className="mb-4">개인정보 침해에 대한 신고나 상담이 필요하신 경우 아래 기관에 문의하시기 바랍니다:</p>
              <ul className="space-y-2">
                <li>
                  <span className="font-semibold">개인정보침해신고센터</span><br />
                  (국번없이) 118 / privacy.kisa.or.kr
                </li>
                <li>
                  <span className="font-semibold">대검찰청 사이버범죄수사단</span><br />
                  (국번없이) 1301 / www.spo.go.kr
                </li>
                <li>
                  <span className="font-semibold">경찰청 사이버안전국</span><br />
                  (국번없이) 182 / cyberbureau.police.go.kr
                </li>
              </ul>
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
