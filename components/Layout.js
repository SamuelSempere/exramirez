import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from 'antd';

export default function Layout({ children }) {
  const router = useRouter();
  const currentRoute = router.pathname;

  const menuItems = [
    { path: '/cliente-nuevo', label: 'Cliente Nuevo' },
    { path: '/solicitud-material', label: 'Solicitud de Material' },
    { path: '/condiciones-comerciales', label: 'Condiciones Comerciales', disabled: true }, // <- aquí añadimos `disabled: true`
  ];

  return (
    <div>
      <header style={{
        display: 'flex',
        gap: '0.8rem',
        padding: '1rem',
        backgroundColor: '#717171',
        borderBottom: '1px solid #e0e0e0',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {menuItems.map(item => (
          <Link href={item.path} key={item.path} passHref>
            <Button
              type={currentRoute === item.path ? 'primary' : 'default'}
              disabled={item.disabled} // <- aplicamos `disabled` si está en el item
              style={{
                minWidth: '200px',
                textAlign: 'center',
                fontWeight: '500',
                backgroundColor: '#333333'
              }}
            >
              {item.label}
            </Button>
          </Link>
        ))}
      </header>

      <main style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        {children}
      </main>
    </div>
  );
}
