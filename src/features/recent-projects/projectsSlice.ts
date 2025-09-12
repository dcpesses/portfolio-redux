import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';

import thumbChallah from '@/assets/projects/challah-creations.png';
import thumbCodeWhisperer from '@/assets/projects/code-whisperer.svg?url';
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
  about: string | undefined;
  description: string;
  screenshots: string[] | undefined;
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
      about: 'WBD Screeners allows authorized Warner Bros. Discovery Partners, Clients, and Employees the ability to preview and download or stream Warner Bros. Discovery TV and Film content. (Pre-authorization from a Warner Bros. Discovery Contact and login credentials are required to use the app.)',
      description: 'Developed and maintained video streaming B2B app for web, Chromecast, and desktop platforms, utilizing Widevine/Fairplay/PlayReady DRM, MFA login, offline playback, anti-piracy methods; built using ReactJS, Typescript/JavaScript, ES6, NodeJS, Babel, Webpack, JSON, Git, NPM, Yarn, and modern frameworks.',
      screenshots: ['wbd-screeners1.jpg', 'wbd-screeners2.jpg', 'wbd-screeners3.jpg'],
      demo: 'https://www.youtube.com/watch?v=Bhem5siuNZE'
    },
    {
      title: 'Code Whisperer',
      tags: ['React.js', 'Bootstrap', 'TypeScript', 'Web Design'],
      role: 'Full-Stack Developer',
      image: thumbCodeWhisperer,
      url: 'https://dcpesses.github.io/code-whisperer/',
      about: undefined,
      description: 'Single Page Application for Twitch streamers to send game invites to only approved chatters. Built using Vite, React 19, Redux, ReactRouter, TypeScript, Vitest, React Testing Library; deployed using GitHub Actions workflow.',
      screenshots: ['code-whisperer1.png', 'code-whisperer2.jpg'],
      demo: null,
    },
    {
      title: 'Challah Creations',
      tags: ['Wordpress', 'Web Design', 'JavaScript'],
      role: 'Full-Stack Developer',
      image: thumbChallah,
      url: 'https://www.challahcreations.com/',
      about: undefined,
      description: 'Built and deployed a responsive and easy to update WordPress site for my sister\'s challah baking business, optimized for mobile usability, SEO, and page speed performance.',
      screenshots: ['challah-creations1.jpg'],
      demo: null
    },
    {
      title: 'WBFYC',
      tags: ['Wordpress'],
      role: 'Frontend Developer',
      image: thumbWBFYC,
      url: 'https://www.wbfyc.com/',
      about: undefined,
      description: 'Developed a responsive and minimal WordPress site to promote the award screener apps for Warner Bros, utilizing a custom child theme on Highend for flexible content management, and implementing a modular component system using Advanced Custom Fields and Gutenberg blocks.',
      screenshots: ['wbfyc1.jpg'],
      demo: null
    },
    {
      title: 'WWTVM Halloween',
      tags: ['Wordpress'],
      role: 'Full-Stack Developer',
      image: thumbHalloween,
      url: 'https://wbtvmarketing.com/photos/',
      about: undefined,
      description: 'Developed, deployed, and maintained an internally hosted WordPress photo gallery for Worldwide TV Marketing\'s annual Halloween Party at Warner Bros, integrating Okta Single Sign-On for division-specific online voting and access without account creation.',
      screenshots: ['wwtvm-halloween1.jpg'],
      demo: null
    },
    {
      title: 'Show Us Your Funny',
      tags: ['JavaScript'],
      role: 'Frontend Developer',
      image: thumbFunny,
      url: 'https://sitcoms.wbtvd.com/',
      about: undefined,
      description: '',
      screenshots: ['show-us-your-funny1.jpg'],
      demo: null
    },
    {
      title: 'Game Request Wheel',
      tags: ['React.js', 'JavaScript'],
      role: 'Frontend Developer',
      image: thumbWheel,
      url: 'https://asukii314.github.io/twitch-request-wheel/',
      about: undefined,
      description: '',
      screenshots: ['game-request-wheel1.jpg', 'game-request-wheel2.jpg', 'game-request-wheel3.jpg'],
      demo: null
    },
  /*{
    title: 'Placeholder',
    tags: ['Wordpress'],
    role: 'Frontend Developer',
    image: thumbPlaceholder,
    url: 'https://www.challahcreations.com/',
    description: '',
    screenshots: undefined,
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
