import { Box } from '@mui/material'
import Footer from '../../layout/Footer'
import Intro from '../../components/landing/Intro'
import OurTeam from '../../components/landing/OurTeam'
import Partners from '../../components/landing/Partners'
import CheckOut from '../../components/landing/CheckOut'
import LearnMore from '../../components/landing/LearnMore'
import Feedbacks from '../../components/landing/Feedbacks'
import Statistics from '../../components/landing/Statistics'
import UsefulVideos from '../../components/landing/UsefulVideos'
import LandingHeader from '../../layout/LandingHeader'
import UserExperience from '../../components/landing/UserExperience'

const Home = () => {
   return (
      <Box>
         <LandingHeader />
         <Intro />
         <Statistics />
         <UserExperience />
         <OurTeam />
         <CheckOut />
         <UsefulVideos />
         <LearnMore />
         <Feedbacks />
         <Partners />
         <Footer />
      </Box>
   )
}

export default Home
