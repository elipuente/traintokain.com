import Head from 'next/head';

import LoadingSpinner from './LoadingSpinner';
import { TrainToKain } from '../icons';

const Loading = ({ text }) => (
  <div className='flex flex-col h-screen text-gray-900 items-center'>
    <Head>
      <title>Train to Kain Fitness Competition</title>
      <meta name='robots' content='follow, index' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta
        name='theme-color'
        media='(prefers-color-scheme: dark)'
        content='#000000'
      />
      <meta
        name='theme-color'
        media='(prefers-color-scheme: light)'
        content='#FFF'
      />
      <meta
        content='The Train to Kain Fitness Competition is a friendly fitness competition between guests of the Shadlow-Kain wedding.'
        name='description'
      />
      <link href='/favicons/favicon.ico' rel='shortcut icon' />
      <link href='/manifest.json' rel='manifest' />
      <link
        href='/favicons/apple-touch-icon.png'
        rel='apple-touch-icon'
        sizes='200x200'
      />
      <meta property='og:type' content='website' />
      <meta
        property='og:site_name'
        content='Train to Kain Fitness Competition'
      />
      <meta
        property='og:description'
        content='The Train to Kain Fitness Competition is a friendly fitness competition between guests of the Shadlow-Kain wedding.'
      />
      <meta property='og:title' content='Train to Kain Fitness Competition' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content='Train to Kain Fitness Competition' />
      <meta
        name='twitter:description'
        content='The Train to Kain Fitness Competition is a friendly fitness competition between guests of the Shadlow-Kain wedding.'
      />
    </Head>

    <main className='flex flex-col flex-grow justify-center px-5 sm:px-10 mb-auto w-10/12 md:w-2/3 max-w-lg'>
      <TrainToKain className='block' />
      <div className='flex justify-center items-center'>
        <LoadingSpinner /> &nbsp; {text ?? 'Loading...'}
      </div>
    </main>
  </div>
);

export default Loading;
