import { useCallback, useEffect, useReducer } from 'react';
import axios from 'axios';
import { getLatestNotification } from '../utils/utils.js';
import Notifications from '../Notifications/Notifications.jsx';
import Header from '../Header/Header.jsx';
import Login from '../Login/Login.jsx';
import Footer from '../Footer/Footer.jsx';
import CourseList from '../CourseList/CourseList.jsx';
import BodySectionWithMargin from '../BodySection/BodySectionWithMarginBottom.jsx';
import BodySection from '../BodySection/BodySection.jsx';
import WithLogging from '../HOC/WithLogging.jsx';
import { APP_ACTIONS, initialState, appReducer } from './appReducer.js';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const logIn = useCallback((email, password) => {
    dispatch({ type: APP_ACTIONS.LOGIN, payload: { email, password } });
  }, []);

  const logOut = useCallback(() => {
    dispatch({ type: APP_ACTIONS.LOGOUT });
  }, []);

  const handleDisplayDrawer = useCallback(() => {
    if (!state.displayDrawer) dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });
  }, [state.displayDrawer]);

  const handleHideDrawer = useCallback(() => {
    if (state.displayDrawer) dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER });
  }, [state.displayDrawer]);

  const markNotificationAsRead = useCallback((id) => {
    dispatch({ type: APP_ACTIONS.MARK_NOTIFICATION_READ, payload: id });
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5173/notifications.json',
        );
        const rawData = response.data.notifications || response.data;
        const data = rawData.map((notif) => {
          if (notif.type === 'urgent' && !notif.value && !notif.html) {
            return { ...notif, html: { __html: getLatestNotification() } };
          }
          if (notif.id === 3) {
            return { ...notif, html: { __html: getLatestNotification() } };
          }
          return notif;
        });
        dispatch({ type: APP_ACTIONS.SET_NOTIFICATIONS, payload: data });
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5173/courses.json');
        const coursesData = response.data.courses || response.data;
        dispatch({ type: APP_ACTIONS.SET_COURSES, payload: coursesData });
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, [state.user.isLoggedIn]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.ctrlKey && e.key === 'h') {
        e.preventDefault();
        alert('Logging you out');
        logOut();
      }
    },
    [logOut],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="flex flex-col min-h-screen relative p-3 tablet:p-0 overflow-x-hidden">
      <Notifications
        notifications={state.notifications}
        markAsRead={markNotificationAsRead}
        displayDrawer={state.displayDrawer}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
      />
      <Header user={state.user} logOut={logOut} />
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col">
          {state.user.isLoggedIn ? (
            <BodySectionWithMargin title="Course list">
              <CourseListWithLogging courses={state.courses} />
            </BodySectionWithMargin>
          ) : (
            <BodySectionWithMargin title="Log in to continue">
              <LoginWithLogging
                logIn={logIn}
                email={state.user.email}
                password={state.user.password}
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
      <Footer isIndex={false} user={state.user} />
    </div>
  );
}

export default App;
