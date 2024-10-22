import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-blue-500 p-4 w-full">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className="logo text-white text-2xl">LOGO</div>
                <div className="actions flex space-x-2">
                    <Link href="/anunciar" className="action-button text-white bg-blue-700 py-2 px-4 rounded hover:bg-blue-800 transition duration-200">
                        Anuncie
                    </Link>
                    <Link href="/login" className="action-button text-white bg-blue-700 py-2 px-4 rounded hover:bg-blue-800 transition duration-200">
                        Entrar
                    </Link>
                </div>
            </div>
        </nav>
    );
}
