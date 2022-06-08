import { useEffect } from 'react';
import Router from 'next/router'
import type { NextPage } from 'next';
import NavBar from '../components/Nav/Nav';
import TitleWelcome from '../components/Title/Title';

const Home: NextPage = () => {

  useEffect(() => {
    setTimeout(function(){
      Router.push('/dashboard')
    },5000);
  }, []);

  return (
    <>
      <main>
        <TitleWelcome />
      </main>
    </>
  )
}

export default Home;
