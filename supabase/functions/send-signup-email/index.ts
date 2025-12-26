import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface SignupData {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const signupData: SignupData = await req.json();
    console.log('📥 Received signup data:', signupData);

    // Save to database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from('signup_requests')
      .insert({
        name: signupData.name,
        email: signupData.email,
        phone: signupData.phone,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Database error:', error);
      throw new Error('Failed to save signup request');
    }
    console.log('✅ Saved to database');

    // Send email via Resend
    const emailContent = `
새로운 도입 문의가 접수되었습니다.

=== 문의자 정보 ===
이름: ${signupData.name}
이메일: ${signupData.email}
연락처: ${signupData.phone}
${signupData.message ? `\n문의 내용:\n${signupData.message}` : ''}

신청 시간: ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}
    `.trim();

    const resendApiKey = 're_2sn5QCSm_6mLBAJixxW1F7N2Vfcoe3GHC';
    
    console.log('📧 Attempting to send email via Resend...');
    
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'raymondchoi2009@gmail.com',
        subject: '[도입문의] AI 교사 민원지킴이',
        text: emailContent,
      }),
    });

    const resendData = await resendResponse.text();
    console.log('📧 Resend API status:', resendResponse.status);
    console.log('📧 Resend API response:', resendData);

    if (!resendResponse.ok) {
      console.error('❌ Resend API error:', resendData);
      // Don't throw error - we already saved to database
    } else {
      console.log('✅ Email sent successfully!');
    }

    return new Response(
      JSON.stringify({ success: true, message: '신청이 완료되었습니다.', data }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error('❌ Error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      }
    );
  }
});