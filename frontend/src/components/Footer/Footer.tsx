import facebook from '../../../public/facebook.png';
import Image from 'next/image';
import instagram from '../../../public/instagram.png'
import github from '../../../public/github.png';
import linkedin from '../../../public/linkedin.png';
import { FooterBox } from './FooterStyled';

const Footer = () => (
  <FooterBox>
    <span>Dev. Full Stack</span>
    <p>Dheniarley Cruz</p>
    <div>
      <a href="https://www.linkedin.com/in/dheniarley/" target="_blank">
        <Image src={ linkedin } alt="Likedin" width={ 35 } height={ 35 } />
      </a>
      <a href="https://github.com/dhenycruz" target="_blank">
        <Image src={ github } alt="Github" width={ 35 } height={ 35 } />
      </a>
      <a href="https://www.facebook.com/dheniarley.silva/" target="_blank">
        <Image src={ facebook } alt="Facebook" width={ 35 } height={ 35 } />
      </a>
      <a href="https://www.instagram.com/dheniarley/" target="_blank">
        <Image src={ instagram } alt="Instagram" width={ 35 } height={ 35 } />
      </a>
    </div>
  </FooterBox>
);

export default Footer;
