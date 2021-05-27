import React, { useEffect } from 'react';
import { Emoji, Seo } from '../components';
import { Octokit, log } from '../utils';
import '../styles/main.css';

const octokit = Octokit();

export default function MainPage () {
  useEffect(() => {
    octokit.rest.users.getAuthenticated().then(i => log.info(`Authenticated User Is: ${i.data.login}`));
  }, [])
  return (
    <div id='main'>
      <Seo title='Home'/>
      <Emoji icon='+1'/>
      <footer>
        <span>This Website Is Made In: <a href='https://gatsbyjs.com/'>Gatsby.js</a>, And Is Open Source On: <a href='https://github.com/TheBotlyNoob/TheBotlyNoob.github.io/'>GitHub</a>!</span>
      </footer>
    </div>
  );
};
