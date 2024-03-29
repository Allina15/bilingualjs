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
      title: 'Select the real english word',
      text: 'Will be given a few words that will be misspelled or in a different language. Your task is to choose the correct words.',
      image: GlobusImage,
      titleColor: '#FE9102',
      background: '#212629',
   },

   {
      id: 2,
      title: 'Listen and select word',
      text: 'Here you have to listen to all the sounds given to you and choose the correct pronunciations from them.',
      image: GlobusImage,
      titleColor: '#FFFFFF',
      background: '#FE9102',
   },

   {
      id: 3,
      title: 'Type what you hear',
      text: 'Here you must write what you hear, but there are limits to how many times you can listen.',
      image: GlobusImage,
      titleColor: '#FE9102',
      background: '#212629',
   },

   {
      id: 4,
      title: 'Descibe image',
      text: 'There will be a picture you have to describe. The clearer you describe the more likely you are to get a high score.',
      image: GlobusImage,
      titleColor: '#FFFFFF',
      background: '#FE9102',
   },

   {
      id: 5,
      title: 'Record saying statement',
      text: 'The screen will display text that you must read with correct pronunciation',
      image: GlobusImage,
      titleColor: '#FE9102',
      background: '#212629',
   },

   {
      id: 5,
      title: 'Respond in at least N words',
      text: 'Here you will be given any question and you must answer it in at least the given number of words.',
      image: GlobusImage,
      titleColor: '#FFFFFF',
      background: '#FE9102',
   },

   {
      id: 5,
      title: 'Highlights the answer',
      text: 'You will be given a small text to read. And there will be a question that you can only answer by highlighting words from the text.',
      image: GlobusImage,
      titleColor: '#FE9102',
      background: '#212629',
   },

   {
      id: 5,
      title: 'Select the main idea',
      text: 'Here too a small text and answer options will be given . Well and carefully read this text should choose the main idea of this text they will be in the options. You can choose only one option.',
      image: GlobusImage,
      titleColor: '#FFFFFF',
      background: '#FE9102',
   },

   {
      id: 5,
      title: 'Select the best title',
      text: 'There will also be a small text and answer choices. Read this text well and carefully, you will have to choose the name of this text in the options. You can only choose one option.',
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

const CHECKBOX_IMAGE =
   "\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\""

const SIGN_UP_INPUTS = [
   {
      name: 'firstName',
      label: 'First name',
      type: 'text',
   },
   {
      name: 'lastName',
      label: 'Last name',
      type: 'text',
   },
   {
      name: 'email',
      label: 'Email',
      type: 'email',
   },
   {
      name: 'password',
      label: 'Password',
      type: 'password',
   },
]

const OPTIONS = [
   {
      id: 1,
      title: 'Select the real english word',
   },
   {
      id: 2,
      title: 'Listen and select word',
   },
   {
      id: 3,
      title: 'Type what you hear',
   },
   {
      id: 4,
      title: 'Describe image',
   },
   {
      id: 5,
      title: 'Record saying statement',
   },
   {
      id: 6,
      title: 'Respond in at least N words',
   },
   {
      id: 7,
      title: 'Highlights the answer',
   },
   {
      id: 8,
      title: 'Select the main idea',
   },
   {
      id: 9,
      title: 'Select the best title',
   },
]

const QUESTION_TYPES = {
   RECORD_SAYING: 'Record saying statement',
   DESCRIBE_IMAGE: 'Describe image',
   SELECT_MAIN_IDEA: 'Select the main idea',
   TYPE_WHAT_YOU_HEAR: 'Type what you hear',
   HIGHLIGHTS_THE_ANSWER: 'Highlights the answer',
   SELECT_THE_BEST_TITLE: 'Select the best title',
   LISTEN_AND_SELECT_WORD: 'Listen and select word',
   SELECT_REAL_ENGLISH_WORD: 'Select the real english word',
   RESPOND_IN_AT_LEAST_N_WORDS: 'Respond in at least N words',
}

const QUESTION_TITLES = {
   RECORD_SAYING: 'RECORD_SAYING',
   DESCRIBE_IMAGE: 'DESCRIBE_IMAGE',
   SELECT_MAIN_IDEA: 'SELECT_MAIN_IDEA',
   TYPE_WHAT_YOU_HEAR: 'TYPE_WHAT_YOU_HEAR',
   SELECT_THE_BEST_TITLE: 'SELECT_THE_BEST_TITLE',
   HIGHLIGHTS_THE_ANSWER: 'HIGHLIGHTS_THE_ANSWER',
   LISTEN_AND_SELECT_WORD: 'LISTEN_AND_SELECT_WORD',
   SELECT_REAL_ENGLISH_WORD: 'SELECT_REAL_ENGLISH_WORD',
   RESPOND_IN_AT_LEAST_N_WORDS: 'RESPOND_IN_AT_LEAST_N_WORDS',
}

const OPTIONS_NAME = {
   listenAndSelectOptions: 'listenAndSelectOptions',
   selectTheMainIdeaOptions: 'selectTheMainIdeaOptions',
   selectTheBestTitleOptions: 'selectTheBestTitleOptions',
   selectRealEnglishWordsOptions: 'selectRealEnglishWordsOptions',
}

export {
   VIDEOS,
   OPTIONS,
   OUR_TEAM,
   PARTNERS,
   FEEDBACKS,
   CHECK_OUT,
   QUESTIONS,
   OPTIONS_NAME,
   CHECKBOX_IMAGE,
   SIGN_UP_INPUTS,
   QUESTION_TYPES,
   QUESTION_TITLES,
}
