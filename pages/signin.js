// pages/signin.js
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

SignIn.hideLayout = true;
export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push('/');
    }
  }, [session, status, router]);
  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    // Aquí invocamos el inicio de sesión de next-auth
    const result = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });

    // Maneja aquí el resultado según sea necesario
    if (result.error) {
      // muestra un mensaje de error
    } else {
      // redirige al usuario o haz algo más
    }
  };

  return (
    <div className="container">
  <div className="left-column">
  </div>
  <div className="right-column">
    <div className="login-form-container">
      <h2>Hola, bienvenido!</h2>
      <p>Para acceder, introduce tu email y contraseña.</p>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <input type="email" id="email" name="email" placeholder="E-mail" required />
        </div>
        <div className="input-group">
          <input type="password" id="password" name="password" placeholder="Password" required />
        </div>
        <button type="submit">ENTRAR</button>
      </form>
    </div>
  </div>
</div>
  );
}

