import { Link, useNavigate } from "react-router-dom"
import BotaoNavegacao from "../BotaoNavegacao"
import ModalCadastroUsuario from "../ModalCadastroUsuario"
import logo from './assets/logo.png'
import usuario from './assets/usuario.svg'
import './BarraNavegacao.css'
import { useState } from "react"
import ModalLoginUsuario from "../ModalLoginUsuario"

const BarraNavegacao = () => {
    const [modalCadastroAberta, setModalCadastroAberta] = useState(false)
    const [modalLoginAberta, setModalLoginAberta] = useState(false)

    let navigate = useNavigate();

    const token = sessionStorage.getItem("token");

    const [usuarioEstaLogado, setUsuarioEstaLogado] = useState<boolean>(token != null);

    const aoEfetuarLogin = () => {
        setUsuarioEstaLogado(true);
        setModalLoginAberta(true);
    }

    const efetuarLogout = () => {
        setUsuarioEstaLogado(false);
        sessionStorage.removeItem('token');
        navigate('/');
    }

    return (<nav className="ab-navbar">
        <h1 className="logo">
            <Link to="/">
                <img className="logo" src={logo} alt="Logo da AluraBooks" />
            </Link>
        </h1>
        <ul className="navegacao">
            <li>
                <a href="#!">Categorias</a>
                <ul className="submenu">
                    <li>
                        <Link to="/">
                            Frontend
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Programação
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Infraestrutura
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Business
                        </Link>
                    </li>
                    <li>
                        <Link to="/minha-conta/pedidos">
                            Minha conta
                        </Link>
                    </li>
                </ul>
            </li>
        </ul>
        <ul className="acoes">
            {!usuarioEstaLogado && (
                <>

                    <li>
                        <BotaoNavegacao
                            texto="Login"
                            textoAltSrc="Icone representando um usuário"
                            imagemSrc={usuario}
                            onClick={() => setModalLoginAberta(true)}
                        />
                        <ModalLoginUsuario
                            aberta={modalLoginAberta}
                            aoFechar={() => setModalLoginAberta(false)}
                            aoEfetuarLogin={aoEfetuarLogin}
                        />
                    </li>
                    <li>
                        <BotaoNavegacao
                            texto="Cadastrar-se"
                            textoAltSrc="Icone representando um usuário"
                            imagemSrc={usuario}
                            onClick={() => setModalCadastroAberta(true)}
                        />
                        <ModalCadastroUsuario
                            aberta={modalCadastroAberta}
                            aoFechar={() => setModalCadastroAberta(false)}
                        />
                    </li>
                </>
            )}

            {usuarioEstaLogado && (
                <>
                    <li>
                        <Link to="/minha-conta">
                            Minha Conta
                        </Link>
                    </li>
                    <li>
                        <BotaoNavegacao 
                            texto="Logout"
                            textoAltSrc="Icone representando um usuário"
                            imagemSrc={usuario}
                            onClick={efetuarLogout}
                        />
                    </li>
                </>
            )}
        </ul>
    </nav>)
}

export default BarraNavegacao