import React from 'react';

const LoginRedirect: React.FC<{ email: string; password: string }> = ({ email, password }) => {
  const handleLogin = () => {
    const loginWindow = window.open('https://dsp.mathilde-ads.com/login', '_blank');

    if (loginWindow) {
        const script = `
  console.log('Este es un script inyectado');
  // Aquí puedes agregar más código
`;

window.eval(script);
        

      const intervalId = setInterval(() => {
        // Intentar acceder a los inputs
        const emailInput = loginWindow.document.querySelector('input[name="email"]') as HTMLInputElement;
        const passwordInput = loginWindow.document.querySelector('input[name="password"]') as HTMLInputElement;

        if (emailInput && passwordInput) {
          // Llenar los campos de email y contraseña
          emailInput.value = email;
          passwordInput.value = password;

          // Hacer clic en el botón de submit
          const loginForm = loginWindow.document.querySelector('form') as HTMLFormElement;
          if (loginForm) {
            loginForm.submit();
          }

          // Limpiar el intervalo
          clearInterval(intervalId);
        }
      }, 1000); // Intentar cada segundo
    }
  };

  return <button onClick={handleLogin}>Iniciar Sesión</button>;
};

export default LoginRedirect;
