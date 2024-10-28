
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="navbar flex items-center justify-between p-4 bg-gray-800">
      <div className="flex items-center">
        <Image src="/logo.png" alt="Logo DescomplicAAgro" width={40} height={40} /> {/* Tamanho da logo */}
        <span className="text-lg font-bold ml-2 text-white">Descomplic AA gro</span> {/* Nome ao lado da logo */}
      </div>
      <div className="flex space-x-4">
        <button className="action-button px-4 py-2 rounded border border-transparent text-white hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors duration-300">
          Anunciar
        </button>
        <button className="action-button px-4 py-2 rounded border border-transparent text-white hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors duration-300">
          Entrar
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
