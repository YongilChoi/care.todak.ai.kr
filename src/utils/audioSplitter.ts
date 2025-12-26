import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

const CHUNK_SIZE_MB = 24;
const CHUNK_DURATION_SECONDS = 300;

let ffmpeg: FFmpeg | null = null;

async function loadFFmpeg() {
  if (ffmpeg) return ffmpeg;

  ffmpeg = new FFmpeg();

  ffmpeg.on('log', ({ message }) => {
    console.log('[FFmpeg]', message);
  });

  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });

  return ffmpeg;
}

export async function splitAudioFile(file: File): Promise<File[]> {
  try {
    const fileSizeMB = file.size / (1024 * 1024);
    console.log(`[AudioSplitter] 파일 크기: ${fileSizeMB.toFixed(2)}MB`);

    if (fileSizeMB <= CHUNK_SIZE_MB) {
      console.log('[AudioSplitter] 파일이 작아 분할하지 않습니다.');
      return [file];
    }

    console.log('[AudioSplitter] FFmpeg 로드 중...');
    const ffmpeg = await loadFFmpeg();

    console.log('[AudioSplitter] 파일 쓰기 중...');
    await ffmpeg.writeFile('input', await fetchFile(file));

    console.log(`[AudioSplitter] 파일 분할 시작 (${CHUNK_DURATION_SECONDS}초 단위)...`);
    await ffmpeg.exec([
      '-i', 'input',
      '-f', 'segment',
      '-segment_time', CHUNK_DURATION_SECONDS.toString(),
      '-c', 'copy',
      '-reset_timestamps', '1',
      'output_%03d.mp3'
    ]);

    console.log('[AudioSplitter] 분할된 파일 목록 가져오기...');
    const files = await ffmpeg.listDir('/');
    const chunks: File[] = [];

    for (const fileInfo of files) {
      if (fileInfo.name.startsWith('output_') && fileInfo.name.endsWith('.mp3')) {
        const data = await ffmpeg.readFile(fileInfo.name);
        const blob = new Blob([data], { type: 'audio/mpeg' });
        const chunkFile = new File([blob], fileInfo.name, { type: 'audio/mpeg' });
        const chunkSizeMB = (chunkFile.size / (1024 * 1024)).toFixed(2);
        console.log(`[AudioSplitter] 청크 생성: ${fileInfo.name} (${chunkSizeMB}MB)`);
        chunks.push(chunkFile);

        await ffmpeg.deleteFile(fileInfo.name);
      }
    }

    await ffmpeg.deleteFile('input');

    const sortedChunks = chunks.sort((a, b) => a.name.localeCompare(b.name));
    console.log(`[AudioSplitter] 총 ${sortedChunks.length}개 청크 생성 완료`);
    return sortedChunks;
  } catch (error) {
    console.error('[AudioSplitter] 오류 발생:', error);
    throw new Error(`파일 분할 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
}
