import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";

interface TranscribeRequest {
  fileId: string;
}

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

    const { fileId }: TranscribeRequest = await req.json();

    const { data: audioFile, error: fetchError } = await supabaseClient
      .from("audio_files")
      .select("*")
      .eq("id", fileId)
      .maybeSingle();

    if (fetchError || !audioFile) {
      throw new Error("Audio file not found");
    }

    await supabaseClient
      .from("audio_files")
      .update({ status: "processing" })
      .eq("id", fileId);

    const { data: fileData, error: downloadError } = await supabaseClient.storage
      .from("audio-files")
      .download(audioFile.file_path);

    if (downloadError || !fileData) {
      throw new Error("Failed to download file from storage");
    }

    const transcription = await transcribeWithWhisper(fileData, audioFile.file_name);

    await supabaseClient
      .from("audio_files")
      .update({
        status: "completed",
        transcription,
        updated_at: new Date().toISOString(),
      })
      .eq("id", fileId);

    return new Response(
      JSON.stringify({
        success: true,
        transcription,
        fileId,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Transcription error:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});

async function transcribeWithWhisper(
  audioBlob: Blob,
  filename: string
): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error("OpenAI API key not configured");
  }

  const formData = new FormData();
  formData.append("file", audioBlob, filename);
  formData.append("model", "gpt-4o-transcribe");
  formData.append("language", "ko");

  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Transcription API error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  return result.text || "";
}