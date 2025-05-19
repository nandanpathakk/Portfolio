import { Tangerine, Roboto } from 'next/font/google';

export const tangerine = Tangerine({
    subsets: ['latin'],
    weight: ['400', '700'],
    display: 'swap',
    variable: '--font-tangerine',
  });
  
  // Configure Roboto font
  export const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
    style: ['normal', 'italic'],
    display: 'swap',
    variable: '--font-roboto',
  });