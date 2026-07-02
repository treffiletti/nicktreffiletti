import webvtt from "node-webvtt";
import fs from "node:fs/promises";
import path from "node:path";

export type Interview = {
  id: string;
  name: string;
  subtitle: string;
  video: {
    duration: number;
    thumbnail: string;
    sd: string;
    hd: string;
  };
  chapters: { start: number; title: string }[];
};

export function getInterviews(): Interview[] {
  return interviews;
}

export async function getInterview(slug: string) {
  let index = interviews.findIndex(({ id }) => id === slug);

  if (index === -1) {
    return null;
  }

  let interview = interviews[index];

  return {
    ...interview,
    next: index < interviews.length - 1 ? interviews[index + 1] : null,
  };
}

export async function getInterviewTranscript(slug: string) {
  let transcript = await fs.readFile(
    path.join(process.cwd(), "src/data/interviews", `${slug}.vtt`),
    "utf-8",
  );

  return webvtt.parse(transcript).cues.map(({ text, start, end }) => {
    let speaker = text.match(/<v (.*?)>/)?.[1];
    let textWithoutSpeaker = text.replace(/<v (.*?)>/, "").split("\n");
    return {
      start,
      end,
      speaker,
      text: textWithoutSpeaker,
    };
  });
}

const interviews: Interview[] = [];
