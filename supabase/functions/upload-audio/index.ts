import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const MAX_FILE_SIZE = 200 * 1024 * 1024;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const fileName = formData.get("fileName") as string;

    if (!file || !fileName) {
      throw new Error("파일과 파일명이 필요합니다");
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`파일 크기가 최대 허용 크기(${MAX_FILE_SIZE / (1024 * 1024)}MB)를 초과했습니다. 현재 파일 크기: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
    }

    const fileExt = fileName.split(".").pop();
    const storagePath = `anonymous/${Date.now()}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabaseClient.storage
      .from("audio-files")
      .upload(storagePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`업로드 실패: ${uploadError.message}`);
    }

    const { data: audioFileRecord, error: insertError } = await supabaseClient
      .from("audio_files")
      .insert({
        user_id: null,
        file_name: fileName,
        file_path: uploadData.path,
        file_size: file.size,
        status: "uploaded",
      })
      .select()
      .maybeSingle();

    if (insertError || !audioFileRecord) {
      await supabaseClient.storage.from("audio-files").remove([storagePath]);
      throw new Error(`레코드 생성 실패: ${insertError?.message || "알 수 없는 오류"}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        fileId: audioFileRecord.id,
        filePath: uploadData.path,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Upload error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "알 수 없는 오류",
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
