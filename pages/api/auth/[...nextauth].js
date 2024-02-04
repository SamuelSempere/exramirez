// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import fs from 'fs/promises'
import path from 'path'

export default NextAuth({
  pages: {
    signIn: '/signin',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const jsonPath = path.join(process.cwd(), 'credenciales.json');
          const jsonString = await fs.readFile(jsonPath, 'utf8');
          const jsonData = JSON.parse(jsonString);
      
          // Asegúrate de que esta parte coincida con la estructura de tu archivo JSON y con el formulario
          const user = jsonData.users.find(u => 
            u.email === credentials.email && 
            u.password === credentials.password
          );
      
          if (user) {
            // Deberías devolver los detalles del usuario encontrado, no siempre el primer usuario en el archivo.
            return { id: user.username, name: user.username, email: user.email };
          } else {
            // Si no se encuentra el usuario, retorna null para indicar un fallo en la autenticación
            return null;
          }
        }
        catch (error) {
          console.error("Error en la autorización:", error);
          return null;
        }
      }
    })
  ],
  // Agrega configuraciones adicionales según sea necesario
})

