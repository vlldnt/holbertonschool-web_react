import React, { useState, useEffect, useCallback } from 'react';
import { getLatestNotification } from '../utils/utils.js';
import Notifications from '../Notifications/Notifications.jsx';
import Header from '../Header/Header.jsx';
import Login from '../Login/Login.jsx';
import Footer from '../Footer/Footer.jsx';
import CourseList from '../CourseList/CourseList.jsx';
import BodySectionWithMargin from '../BodySection/BodySectionWithMarginBottom.jsx';
import BodySection from '../BodySection/BodySection.jsx';
import WithLogging from '../HOC/WithLogging.jsx';
// eslint-disable-next-line no-unused-vars
import newContext from '../Context/context.js';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

const notificationsList = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: getLatestNotification() },
];

const courseList = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

function App() {
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState(defaultUser);
  const [notifications, setNotifications] = useState(notificationsList);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'h') {
        alert('Logging you out');
        setUser({
          email: '',
          password: '',
          isLoggedIn: false,
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const logIn = useCallback((email, password) => {
    setUser({
      email,
      password,
      isLoggedIn: true,
    });
  }, []);

  const logOut = useCallback(() => {
    setUser({
      email: '',
      password: '',
      isLoggedIn: false,
    });
  }, []);

  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notif) => notif.id !== id),
    );
  }, []);

  return (
    <newContext.Provider value={{ user, logOut }}>
      <div className="flex flex-col min-h-screen relative p-3 tablet:p-0 overflow-x-hidden">
        <Notifications
          notifications={notifications}
          markAsRead={markNotificationAsRead}
          displayDrawer={displayDrawer}
          handleDisplayDrawer={handleDisplayDrawer}
          handleHideDrawer={handleHideDrawer}
        />
        <Header />
        <main className="flex-1 flex flex-col">
          <div className="flex-1 flex flex-col">
            {user.isLoggedIn ? (
              <BodySectionWithMargin title="Course list">
                <CourseListWithLogging courses={courseList} />
              </BodySectionWithMargin>
            ) : (
              <BodySectionWithMargin title="Log in to continue">
                <LoginWithLogging
                  logIn={logIn}
                  email={user.email}
                  password={user.password}
                />
              </BodySectionWithMargin>
            )}
          </div>
          <BodySectionWithMargin>
            <BodySection title="News from the School">
              <p className="text-xs tablet:text-sm desktop:text-base">
                Holberton School News goes here
              </p>
            </BodySection>
          </BodySectionWithMargin>
        </main>
        <Footer isIndex={false} />
      </div>
    </newContext.Provider>
  );
}

export default React.memo(App);
