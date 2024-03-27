import { Box } from '@mui/material'
import UserExperience from '../../components/landing/UserExperience'
import LandingHeader from '../../layout/LandingHeader'
import UsefulVideos from '../../components/landing/UsefulVideos'
import Statistics from '../../components/landing/Statistics'
import LearnMore from '../../components/landing/LearnMore'
import Feedbacks from '../../components/landing/Feedbacks'
import CheckOut from '../../components/landing/CheckOut'
import Partners from '../../components/landing/Partners'
import OurTeam from '../../components/landing/OurTeam'
import Footer from '../../layout/Footer'
import Intro from '../../components/landing/Intro'

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
