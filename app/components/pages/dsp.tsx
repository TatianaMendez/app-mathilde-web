import React from 'react';

const LoginRedirect: React.FC<{ username: string; password: string }> = ({ username, password }) => {
  const handleLogin = () => {
    const loginWindow = window.open('https://dsp.mathilde-ads.com/login', '_blank');
    if (loginWindow) {
      loginWindow.onload = () => {
        const usernameInput = loginWindow.document.querySelector('input[name="username"]') as HTMLInputElement;
        const passwordInput = loginWindow.document.querySelector('input[name="password"]') as HTMLInputElement;
        if (usernameInput && passwordInput) {
          usernameInput.value = username;
          passwordInput.value = password;
        }

        const loginButton = loginWindow.document.querySelector('button[type="submit"]') as HTMLButtonElement;
        if (loginButton) {
          loginButton.click();
        }
      };
    }
  };

  return <button onClick={handleLogin}>Iniciar Sesión</button>;
};

export default LoginRedirect;
