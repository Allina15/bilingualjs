import FirstVideo from '../../assets/videos/first-video.mp4'
import SecondVideo from '../../assets/videos/second-video.mp4'
import ThirdVideo from '../../assets/videos/third-video.mp4'

import {
   FifthPersonImage,
   FirstPersonImage,
   FourthPersonImage,
   GlobusImage,
   SecondPersonImage,
   SevenPersonImage,
   SixthPersonImage,
   ThirdPersonImage,
   SeventhMemberImage,
   FourthMemberImage,
   FifthMemberImage,
   ThirdMemberImage,
   FirstMemberImage,
   SecondMemberImage,
   SixthMemberImage,
   FirstPosterVideoImage,
   SecondPosterVideoImage,
   ThirdPosterVideoImage,
   FirstPartnerImage,
   SecondPartnerImage,
   ThirdPartnerImage,
   FourthPartnerImage,
   FifthPartnerImage,
   SixthPartnerImage,
} from '../../assets/images/index'

const OUR_TEAM = [
   {
      id: 1,
      img: FirstMemberImage,
      name: 'Adeliia Jyldyzbekova',
      role: 'Backend developer - Leader',

      customStyle: {
         borderRadius: '2.5rem 0rem',
      },
   },
   {
      id: 2,
      img: SecondMemberImage,
      name: 'Alina Ahunova',
      role: 'Backend developer',

      customStyle: {
         borderRadius: '2.5rem 0rem 0rem 0rem',
      },
   },
   {
      id: 3,
      img: ThirdMemberImage,
      name: 'Elaman Janyshbekov',
      role: 'Frontend developer',

      customStyle: {
         borderRadius: '0rem 2.5rem 0rem 0rem',
      },
   },
   {
      id: 4,
      img: FourthMemberImage,
      name: 'Meerim Kerkibasheva',
      role: 'Frontend developer',

      customStyle: {
         borderRadius: '2.5rem 0rem',
      },
   },
   {
      id: 5,
      img: FifthMemberImage,
      name: 'Nurislam Isaev',
      role: 'Frontend developer',

      customStyle: {
         borderRadius: '0rem 0rem 2.5rem 0rem',
      },
   },
   {
      id: 6,
      img: SixthMemberImage,
      name: 'Nuriza Zununova',
      role: 'Backend developer',

      customStyle: {
         borderRadius: '2.5rem 0rem',
      },
   },
   {
      id: 7,
      img: SeventhMemberImage,
      name: 'Rabiya Aiylchieva',
      role: 'Frontend developer - Leader',
   },
]

const CHECK_OUT = [
   {
      id: 1,
      title: 'Confirm your English proficiency today!',
      text: 'For nearly 30 years, lea rners have turned to Rosetta Stone to build the fluency and confidence they need to speak new languages.',
      image: GlobusImage,
      titleColor: '#FE9102',
      background: '#212629',
   },
   {
      id: 2,
      title: 'Confirm your English proficiency today!',
      text: 'For nearly 30 years, lea rners have turned to Rosetta Stone    to build the fluency and confidence they need to speak new languages.',
      image: GlobusImage,
      titleColor: '#FFFFFF',
      background: '#FE9102',
   },
   {
      id: 3,
      title: 'Confirm your English proficiency today!',
      text: 'For nearly 30 years, lea rners have turned to Rosetta Stoneto build the fluency and confidence they need to speak new languages.',
      image: GlobusImage,
      titleColor: '#FE9102',
      background: '#212629',
   },
   {
      id: 4,
      title: 'Confirm your English proficiency today!',
      text: 'For nearly 30 years, lea rners have turned to Rosetta Stoneto build the fluency and confidence they need to speak new languages.',
      image: GlobusImage,
      titleColor: '#FFFFFF',
      background: '#FE9102',
   },
   {
      id: 5,
      title: 'Confirm your English proficiency today!',
      text: 'For nearly 30 years, lea rners have turned to Rosetta Stoneto build the fluency and confidence they need to speak new languages.',
      image: GlobusImage,
      titleColor: '#FE9102',
      background: '#212629',
   },
]

const VIDEOS = [
   {
      id: 1,
      poster: FirstPosterVideoImage,
      video: FirstVideo,
      name: 'The benefits of a bilingual brain',
      duration: 'Duration 5:03',
   },
   {
      id: 2,
      poster: SecondPosterVideoImage,
      video: SecondVideo,
      name: 'Test Walkthrough',
      duration: 'Duration 1:02',
   },
   {
      id: 3,
      poster: ThirdPosterVideoImage,
      video: ThirdVideo,
      name: 'Understanding Subscores',
      duration: 'Duration 3:35',
   },
]

const FEEDBACKS = [
   {
      id: 1,
      description:
         'Bilingual is a fantastic website for learning English. The interface is user-friendly and the content is engaging and interactive.',
      name: '- Aijan Nurmatova',
      rating: 5,
      avatar: FirstPersonImage,
   },
   {
      id: 2,
      description:
         'I have tried other language apps and found them boring but with Bilingual, it is easy and fun to practice every day.',
      name: '- Nursultan Kenzhebaev',
      rating: 5,
      avatar: SecondPersonImage,
   },
   {
      id: 3,
      description:
         'Great way to learn a language. Fun, interactive, and engaging. I am enjoying the course immensely.',
      name: '- Dinara Bakirova',
      rating: 5,
      avatar: ThirdPersonImage,
   },
   {
      id: 4,
      description:
         'I love the audio feature on Bilingual, which allows me to practice my listening skills. Its a great way to improve comprehension.',
      name: '- Aziat Abdimalikov',
      rating: 4,
      avatar: FourthPersonImage,
   },
   {
      id: 5,
      description:
         'Bilingual offers a personalized learning experience. I can set my own goals and study at my own pace, making it a flexible and effective platform for English learning.',
      name: '- Ulan Kubanychbekov ',
      rating: 5,
      avatar: FifthPersonImage,
   },
   {
      id: 6,
      description:
         'Bilingual provides excellent feedback on my exercises and assessments. It helps me identify areas where I need tracks my progress over time.',
      name: '- Elizar Aitbekov',
      rating: 5,
      avatar: SixthPersonImage,
   },

   {
      id: 7,
      description:
         'I highly recommend Bilingual for anyone looking to improve their English skills. The lessons are well-structured and cover a wide range of topics.',
      name: '- Alisher Jumanov',
      rating: 4,
      avatar: SevenPersonImage,
   },
]

const PARTNERS = [
   {
      id: 1,
      partner: FirstPartnerImage,
      name: 'Rodonit',
   },
   {
      id: 2,
      partner: SecondPartnerImage,
      name: 'BASF',
   },
   {
      id: 3,
      partner: ThirdPartnerImage,
      name: 'Lidea',
   },
   {
      id: 4,
      partner: FourthPartnerImage,
      name: 'Adama',
   },
   {
      id: 5,
      partner: FifthPartnerImage,
      name: 'Dekalb',
   },
   {
      id: 6,
      partner: SixthPartnerImage,
      name: 'LG',
   },
]

const QUESTIONS = [
   {
      question: 'What is Bilingual?',
      answer: 'Bilingual is a language testing service.',
   },
   {
      question: 'How can I show what I am typing during the test?',
      answer:
         'Please take the test in a separate, quiet room. Close all other windows and close all other programs before starting the test. An external USB keyboard or mouse can be used during the test. However, when answering test questions, you should only type on one keyboard and use one mouse. Dont switch between multiple keyboards or mice.',
   },
   {
      question: 'Why should I take the Bilingual English Test?',
      answer:
         'The Bilingual English Test is a reliable and accurate way to assess your English proficiency.',
   },
   {
      question: 'How can I make sure my microphone picks up my voice clearly?',
      answer: 'Speak clearly and directly into your microphone.',
   },
   {
      question: 'How can I allow a test to record my computers screen?',
      answer: 'You will be prompted during the test to allow screen recording.',
   },
]

const FAKE_DATA = [
   {
      id: 1,
      date: '11.01.2021',
      test: 'English advanced test',
      status: 'Not evaluated',
      score: 0,
   },
   {
      id: 2,
      date: '21.01.2021',
      test: 'English advanced test',
      status: 'Not evaluated',
      score: 0,
   },
   {
      id: 3,
      date: '21.01.2021',
      test: 'English advanced test',
      status: 'Evaluated',
      score: 7,
   },
   {
      id: 4,
      date: '21.01.2021',
      test: 'English advanced test',
      status: 'Evaluated',
      score: 7,
   },
]

const COLUMNS = [
   {
      Header: '#',
      accessor: 'id',
   },
   {
      Header: 'Date of Submition',
      accessor: 'date',
   },
   {
      Header: 'Test name',
      accessor: 'test',
   },
   {
      Header: 'Status',
      accessor: 'status',
   },
   {
      Header: 'Score',
      accessor: 'score',
   },
   {
      Header: '',
      accessor: 'action',
   },
]

const CHECKBOX_IMAGE =
   "\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\""

const BASE_URL = 'http://18.208.146.212'

const ROUTES = {
   SIGN_IN: '/signin',
   SIGN_UP: '/signup',
   ADMIN: {
      index: '/admin',
   },
   USER: {
      index: '/user',
   },
}

export {
   VIDEOS,
   CHECKBOX_IMAGE,
   CHECK_OUT,
   FEEDBACKS,
   OUR_TEAM,
   QUESTIONS,
   COLUMNS,
   FAKE_DATA,
   PARTNERS,
   BASE_URL,
   ROUTES,
}
