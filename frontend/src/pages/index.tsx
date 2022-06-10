import { useEffect } from 'react';
import Router from 'next/router'
import type { NextPage } from 'next';
import TitleWelcome from '../components/Title/Title';
import Image from 'next/image';
import logo from '../../public/logo.png'

const Home: NextPage = () => {

  useEffect(() => {
    setTimeout(function(){
      Router.push('/dashboard')
    },5000);
  }, []);

  return (
    <>
      <main>
        <Image 
          src={ logo }
          alt="Logo da aplicação"
          width={ 100 }
          height={ 100 }
        />
        <TitleWelcome />
      </main>
    </>
  )
}

export default Home;
