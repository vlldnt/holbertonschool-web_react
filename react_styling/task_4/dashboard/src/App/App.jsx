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

  constructor(props) {
    super(props);
    this.state = {
      displayDrawer: false,
    };
  }

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

  handleDisplayDrawer = () => {
    this.setState({ displayDrawer: true });
  };

  handleHideDrawer = () => {
    this.setState({ displayDrawer: false });
  };

  render() {
    const notificationsList = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: getLatestNotification() },
    ];

    const emptyNotif = [];

    const coursesList = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];

    const emptyList = [];

    return (
      <div className="flex flex-col min-h-screen relative lg p-0 p-3">
        <Notifications
          notifications={emptyList}
          displayDrawer={this.state.displayDrawer}
          handleDisplayDrawer={this.handleDisplayDrawer}
          handleHideDrawer={this.handleHideDrawer}
        />
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
        <BodySectionWithMargin>
          <BodySection title="News from the School">
            <p className='text-xs tablet:text-base'>ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, asperiores architecto blanditiis fuga doloribus sit illum aliquid ea distinctio minus accusantium, impedit quo voluptatibus ut magni dicta. Recusandae, quia dicta?</p>
          </BodySection>
        </BodySectionWithMargin>
        <Footer isIndex={false}/>
      </div>
    );
  }
}

export default App;
