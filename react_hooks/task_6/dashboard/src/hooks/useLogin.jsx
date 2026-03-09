import { useState, useMemo } from 'react';

function useLogin(onLogin) {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const enableSubmit = useMemo(() => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValid = formData.email.length > 0 && regex.test(formData.email);
    const passwordValid = formData.password.length >= 8;
    return emailValid && passwordValid;
  }, [formData]);

  function handleChangeEmail(e) {
    const newEmail = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      email: newEmail,
    }));
  }

  function handleChangePassword(e) {
    const newPassword = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      password: newPassword,
    }));
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    onLogin(formData.email, formData.password);
  }

  return {
    email: formData.email,
    password: formData.password,
    enableSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleLoginSubmit,
  };
}

export default useLogin;
