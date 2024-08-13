import './Modal.css';
import { IUserDados } from '../../interfaces/IUser'

interface PropsModal{
  data: IUserDados;
  onClose: () => void;
}

const Modal = ({ data, onClose}: PropsModal) => {
  return (
    <div className="modal" style={{ display: 'block' }}>
        <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Dados do Usuário</h2>
            <div className='content'>
                <div className="imgUsuario">
                  <img src={data.photo!} alt="" />
                </div>
                <div>
                  <ul>
                    <li><strong>Nome: </strong>{data.name}</li>
                    <li><strong>E-mail: </strong>{data.email}</li>
                    <li><strong>Sexo: </strong>{data.gender}</li>
                    <li><strong>Data de Nascimento: </strong>{new Date(data.birthDate).toLocaleDateString('pt-BR')}</li>
                    <li><strong>Área de Atualiação: </strong>{data.area}</li>
                  </ul>
                  <div className='msg'>
                    <span className='admin'>{data.admin === true ? `É administrador${data.gender === 'Feminino' ? 'a' : ''} da conta` : `Não é administrador${data.gender === 'Feminino' ? 'a' : ''} da conta`}</span>
                  </div>
                </div>
            </div>
            
        </div>
        
    </div>
  )
}

export default Modal