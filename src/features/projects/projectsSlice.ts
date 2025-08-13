import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

import thumbChallah from '@/assets/projects/challah-creations.png';
import thumbCodeWhisperer from '@/assets/projects/code-whisperer.svg?inline';
import thumbWheel from '@/assets/projects/game-request-wheel.png';
import thumbFunny from '@/assets/projects/show-us-your-funny.jpg';
import thumbWBD from '@/assets/projects/wbd-screeners.png';
import thumbWBFYC from '@/assets/projects/wbfyc.png';
import thumbHalloween from '@/assets/projects/wwtvm-halloween.jpg';

export interface ProjectsState {
  items: ProjectItem[];
  selected: number;
}

export interface ProjectItem {
  title: string;
  tags: string[];
  role: string;
  image: string | undefined;
  url: string;
  description: string;
  screenshot: string | undefined;
  demo: string | null;
}

const initialState: ProjectsState = {
  items: [
    {
      title: 'WBD Screeners',
      tags: ['React.js', 'Redux', 'Bootstrap', 'TypeScript'],
      role: 'Frontend Developer',
      image: thumbWBD,
      url: 'https://www.wbdscreeners.com/',
      description: 'Warner Bros. Discovery\'s most comprehensive streaming library of film and television content. Developed and maintained video streaming B2B app for web, Chromecast, and desktop platforms, utilizing Widevine/Fairplay/PlayReady DRM, MFA login, offline playback, anti-piracy methods; built using ReactJS, Typescript/JavaScript, ES6, NodeJS, Babel, Webpack, JSON, Git, NPM, Yarn, and modern frameworks.',
      screenshot: undefined,
      demo: 'https://www.youtube.com/watch?v=Bhem5siuNZE'
    },
    {
      title: 'Code Whisperer',
      tags: ['React.js', 'Bootstrap', 'TypeScript', 'Web Design'],
      role: 'Full-Stack Developer',
      image: thumbCodeWhisperer,
      url: 'https://dcpesses.github.io/code-whisperer/',
      description: 'Single Page Application for Twitch streamers to send game invites to only approved chatters. Built using Vite, React 19, Redux, ReactRouter, TypeScript, Vitest, React Testing Library; deployed using GitHub Actions workflow.',
      screenshot: undefined,
      demo: null,
    },
    {
      title: 'Challah Creations',
      tags: ['Wordpress', 'Web Design', 'JavaScript'],
      role: 'Full-Stack Developer',
      image: thumbChallah,
      url: 'https://www.challahcreations.com/',
      description: 'Built and deployed a responsive and easy to update WordPress site for my sister\'s challah baking business, optimized for mobile usability, SEO, and page speed performance.',
      screenshot: undefined,
      demo: null,
    },
    {
      title: 'WBFYC',
      tags: ['Wordpress'],
      role: 'Frontend Developer',
      image: thumbWBFYC,
      url: 'https://www.wbfyc.com/',
      description: 'Developed a responsive and minimal WordPress site to promote the award screener apps for Warner Bros, utilizing a custom child theme on Highend for flexible content management, and implementing a modular component system using Advanced Custom Fields and Gutenberg blocks.',
      screenshot: undefined,
      demo: null,
    },
    {
      title: 'WWTVM Halloween',
      tags: ['Wordpress'],
      role: 'Full-Stack Developer',
      image: thumbHalloween,
      url: 'https://wbtvmarketing.com/photos/',
      description: 'Developed, deployed, and maintained an internally hosted WordPress photo gallery for Worldwide TV Marketing\'s annual Halloween Party at Warner Bros, integrating Okta Single Sign-On for division-specific online voting and access without account creation.',
      screenshot: undefined,
      demo: null,
    },
    {
      title: 'Show Us Your Funny',
      tags: ['JavaScript'],
      role: 'Frontend Developer',
      image: thumbFunny,
      url: 'https://sitcoms.wbtvd.com/',
      description: '',
      screenshot: undefined,
      demo: null,
    },
    {
      title: 'Game Request Wheel',
      tags: ['React.js', 'JavaScript'],
      role: 'Frontend Developer',
      image: thumbWheel,
      url: 'https://asukii314.github.io/twitch-request-wheel/',
      description: '',
      screenshot: undefined,
      demo: null,
    },
  /*{
    title: 'Placeholder',
    tags: ['Wordpress'],
    role: 'Frontend Developer',
    image: thumbPlaceholder,
    url: 'https://www.challahcreations.com/',
    description: '',
    screenshot: undefined,
    demo: null,
  },*/
  ],
  selected: 0,
};


export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    increment: (state) => {
      if (state.selected + 1 <= state.items.length) {
        state.selected += 1;
      }
    },
    decrement: (state) => {
      if (state.selected - 1 >= 0) {
        state.selected -= 1;
      }
    },
    selectItem: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.items.length) {
        state.selected = action.payload;
      }
    },
  },
});

export const projectItemSelected = (state: RootState) => state.projects.items[state.projects.selected];
export const projectSelected = (state: RootState) => state.projects.selected;
export const projectItems = (state: RootState) => state.projects.items;

export const { increment, decrement, selectItem } = projectsSlice.actions;

export default projectsSlice.reducer;
