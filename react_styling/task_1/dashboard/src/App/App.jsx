import './App.css';
import React from 'react';
import { getLatestNotification } from '../utils/utils.js';
import Notifications from '../Notifications/Notifications.jsx';
import Header from '../Header/Header.jsx';
import Login from '../Login/Login.jsx';
import Footer from '../Footer/Footer.jsx';
import CourseList from '../CourseList/CourseList.jsx';
import BodySectionWithMargin from '../BodySection/BodySectionWithMarginBottom.jsx';
import BodySection from '../BodySection/BodySection.jsx';
import WithLogging from '../HOC/WithLogging.jsx';


const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

class App extends React.Component {
  static defaultProps = {
    logOut: () => {},
    isLoggedIn: true,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.logout();
    }
  };

  logout() {
    this.props.logOut();
  }

  render() {
    const notificationsList = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: getLatestNotification() },
    ];

    const coursesList = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];

    const emptyList = []

    return (
      <>
        <Notifications notifications={notificationsList} />
        <Header />
        {this.props.isLoggedIn ? (
          <BodySectionWithMargin title="Course list">
            <CourseListWithLogging courses={coursesList} />
          </BodySectionWithMargin>
        ) : (
          <BodySectionWithMargin title="Log in to continue">
            <LoginWithLogging />
          </BodySectionWithMargin>
        )}
        <Footer />
        <BodySectionWithMargin />
        <BodySection title="News from the School">
          <p>Holberton School News goes here</p>
        </BodySection>
      </>
    );
  }
}

export default App;
