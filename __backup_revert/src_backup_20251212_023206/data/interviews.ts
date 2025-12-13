import webvtt from 'node-webvtt';
import fs from 'node:fs/promises';
import path from 'node:path';

export type Interview = {
  id: string;
  name: string;
  subtitle: string;
  intro: string;
  video: {
    duration: number;
    thumbnail: string;
    sd: string;
    hd: string;
  };
  chapters: { start: number; title: string }[];
};

const interviews: Interview[] = [
  {
    id: 'erin-matthews',
    name: 'Erin Matthews',
    subtitle: 'Scaling platform teams at HyperCloud',
    intro:
      'Erin Matthews, Director of Platform Engineering at HyperCloud, shares how her team enables over 500 engineers with a self-service platform.',
    video: {
      duration: 1800,
      thumbnail: 'https://assets.tailwindcss.com/templates/compass/annie-king-video-thumbnail.png',
      sd: 'https://assets.tailwindcss.com/templates/compass/annie-king-720p.mp4',
      hd: 'https://assets.tailwindcss.com/templates/compass/annie-king-1080p.mp4',
    },
    chapters: [
      { start: 0, title: 'Intro – Meet Erin Matthews' },
      { start: 300, title: 'Structuring platform teams' },
      { start: 900, title: 'Measuring platform adoption' },
    ],
  },
  {
    id: 'luca-perez',
    name: 'Luca Perez',
    subtitle: 'Measuring developer experience at FinAPI',
    intro:
      'Luca Perez discusses pragmatic approaches to measuring developer experience in platform teams.',
    video: {
      duration: 2100,
      thumbnail:
        'https://assets.tailwindcss.com/templates/compass/nolan-grayson-video-thumbnail.png',
      sd: 'https://assets.tailwindcss.com/templates/compass/nolan-grayson-720p.mp4',
      hd: 'https://assets.tailwindcss.com/templates/compass/nolan-grayson-1080p.mp4',
    },
    chapters: [
      { start: 0, title: 'Intro – Meet Luca Perez' },
      { start: 420, title: 'Developer experience metrics' },
      { start: 1200, title: 'Turning insights into action' },
    ],
  },
];

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
    path.join(process.cwd(), 'src/data/interviews', `${slug}.vtt`),
    'utf-8',
  );

  return webvtt.parse(transcript).cues.map(({ text, start, end }) => {
    let speaker = text.match(/<v (.*?)>/)?.[1];
    let textWithoutSpeaker = text.replace(/<v (.*?)>/, '').split('\n');
    return {
      start,
      end,
      speaker,
      text: textWithoutSpeaker,
    };
  });
}
