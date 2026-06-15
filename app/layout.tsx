import './globals.css';
import Navbar from '../components/Navbar'; // Pastikan path import sesuai

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-[#FDFBF7]">
        <Navbar /> {/* <--- Navbar harus dipanggil di sini */}
        <main>{children}</main>
      </body>
    </html>
  );
}