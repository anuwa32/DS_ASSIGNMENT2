import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './screens/Home'
import MovieView from './screens/MovieView'
import CartView from './screens/CartView'
import SignInView from './screens/SignInView'
import AddUserView from './screens/AddUserView'
import UserProfileView from './screens/userProfileView'
import theaterprocessView from './screens/theaterprocessView'
import paymentmethodView from './screens/paymentmethodView'
import ConfirmBooking from './screens/confirmBooking'
import BookingView from './screens/bookingView'
import userList from './screens/userList'
import MovielistView from './screens/movielistView'
import AddMovieView from './screens/AddMovieView'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-2'>
        <Container>
         

          <Route path='/movie/:id' component={MovieView} />
          <Route path='/cart/:id?' component={CartView} />
          <Route path='/account' component={UserProfileView} />
          <Route path='/login' component={SignInView} />
          <Route path='/movielist' component={MovielistView} />
          <Route path='/bookings/:id' component={BookingView} />
          <Route path='/paymentprocess' component={paymentmethodView} />
          <Route path='/userlist' component={userList} />
          <Route path='/confirmBooking' component={ConfirmBooking} />
          <Route path='/theaterprocess' component={theaterprocessView} />
          <Route path='/register' component={AddUserView} />
          <Route path='/movie/add' component={AddMovieView} />
           {/* Here we have used route to go to homepage if path is exactly / using exact keyword */}
           <Route path='/' component={Home} exact />


           

        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
