import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { isEmail } from 'validator';
import bcrypt from 'bcryptjs'; 

import './Forms.css';
 
import Users from '../Users/Users';
import { IUser, IUserDados } from '../../../interfaces/IUser';
import Modal from '../../Modal/Modal';

const Forms = () => {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<IUser>();
    const [ preview, setPreview ] = useState<string | null>(null);
    const [ results, setResults ] = useState<IUserDados[]>([]);
    const [ editingIndex, setEditingIndex ] = useState<number | null>(null);

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState<IUserDados | null>(null);

    useEffect( () => {

        const storageDados = localStorage.getItem('DadosUser');
        if(storageDados){
            setResults(JSON.parse(storageDados));
        }

    }, [])


    useEffect( () => {
       
        results.length > 0 ? localStorage.setItem('DadosUser', JSON.stringify(results)) : localStorage.removeItem('DadosUser');

    }, [results])

    const onSubmit = async (data: IUser) => {
        const file = data.photo[0];
        let imagePreview: string | null = null;


        const hashPassword = await bcrypt.hash(data.password, 10);
        
        if(file){
            const reader = new FileReader();

            reader.onloadend = () => {
                imagePreview = reader.result as string;
                setPreview(imagePreview);

                if (editingIndex !== null) {
                    // Atualiza o item existente
                    setResults(prevResult => prevResult.map((result, index) => index === editingIndex ? { ...result, name: data.name, email: data.email, password: hashPassword, gender: data.gender, birthDate: data.birthDate, area: data.area, admin: data.admin, photo: imagePreview } : result));
                    setEditingIndex(null);
                } else {
                    // Adiciona um novo item
                    setResults(prevResults => [...prevResults, {name: data.name, email: data.email, password: hashPassword, gender: data.gender, birthDate: data.birthDate, area: data.area, photo: imagePreview, admin: data.admin}]);
                }
                reset();
                setPreview(null);
            }
            reader.readAsDataURL(file)
        }else {
            if (editingIndex !== null) {
              // Atualiza o item existente sem a imagem
              setResults(prevSubmissions =>
                prevSubmissions.map((submission, index) => index === editingIndex ? { ...submission, name: data.name, email: data.email, password: hashPassword, gender: data.gender, birthDate: data.birthDate, area: data.area, admin: data.admin, photo: preview } : submission));
                setEditingIndex(null);
            } else {
              // Adiciona um novo item sem a imagem
              setResults(prevResults => [...prevResults, {name: data.name, email: data.email, password: hashPassword, gender: data.gender, birthDate: data.birthDate, area: data.area, photo: imagePreview, admin: data.admin}]);
            }
      
            reset();
            setPreview(null);
          }
    }

    const handleEdit = (index: number) => {
        const response = results[index];
        if (response) {
            setValue('name', response.name);
            setValue('email', response.email);
            setValue('password', response.password);
            setValue('gender', response.gender);
            setValue('birthDate', response.birthDate);
            setValue('area', response.area);
            setValue('admin', response.admin ? true : false);
            setPreview(response.photo);
            setEditingIndex(index);
        }
    };

    const handleDelete = (index: number) => {
        setResults(prevResults => prevResults.filter((_, i) => i !== index));
        reset();
        setPreview(null);
        setEditingIndex(null);
    } 

    const handleModalOpen = (index: number) => {
        const result = results[index];
        setModalData(result);
        setModalOpen(true);
    }
    
    const handleClose = () => {
        setModalOpen(false)
    }

    const countAdmin = results.filter(result => result.admin).length;
    const countUser = results.length - countAdmin;

    return (
        <>
            <div className="grid">
                <div className="content-form">
                    <div className="show-users">
                        <div className="new-user users">
                            <span className="qtda">{countUser}</span>
                            <span className="title">Novos Usuários</span>
                        </div>
                        <div className="new-admin users">
                            <span className="qtda">{countAdmin}</span>
                            <span className="title">Administradores</span>
                        </div>
                    </div>
                    <div className={editingIndex !== null ? 'container-register edit' : 'container-register'}>
                        <h2>{editingIndex !== null ? 'Editar Usuário' : 'Novo Usuário'}</h2>   
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-body">
                                <div className="form-group">
                                    <label>Nome</label>
                                    <input type="text"
                                        placeholder='Digite o nome de usuário'
                                        {...register('name', { required: true, minLength: 5 })}    
                                    />
                                    {errors.name?.type === 'required' && <p className="error-message">O nome é obrigatório.</p>}
                                    {errors.name?.type === 'minLength' && <p className="error-message">O nome precisa ter no minímo 5 caracteres.</p>}
                                </div>
                                <div className="form-group block">
                                    <label>Sexo</label>
                                    <div>
                                        <label>Masculino</label>
                                        <input type="radio" value="Masculino" {...register('gender')} checked />
                                    </div>
                                    <div>
                                        <label>Feminino</label>
                                        <input type="radio" value="Feminino" {...register('gender')}  />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Data de Nascimento</label>
                                    <input type="date" {...register('birthDate', { required: true })} />
                                    {errors.birthDate && <p className="error-message">A data de nascimento é obrigatório.</p>}
                                </div>
                                <div className="form-group">
                                    <label>Área de atuação</label>
                                    <select {...register('area', { required: true, validate: (value) => value !== '0' })} >
                                        <option value="0">Selecione uma área</option>
                                        <option value="desenvolvedor">Desenvolvedor</option>
                                        <option value="analista">Analista</option>
                                        <option value="projetos">Projetos</option>
                                        <option value="qa">QA</option>
                                    </select>
                                    {errors.area && <p className="error-message">A área é obrigatória.</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">E-mail</label>
                                    <input type="text"
                                        placeholder='Digite o email de usuário'
                                        {...register('email', {required: true, validate: (value) => isEmail(value)})} />
                                        {errors?.email?.type === "required" && <p className="error-message">O e-mail é obrigatório.</p>}
                                        {errors.email?.type === 'validate' ? <p className="error-message">Insira um e-mail válido.</p> : ''}
                                </div>
                                <div className="form-group">
                                    <label>Senha</label>
                                    <input type="password"
                                        placeholder='Crie uma senha'
                                        {...register("password", { required: true, minLength: 5 })} />
                                        {errors.password?.type === 'required' && <p className="error-message">A senha é obrigatória.</p>}
                                        {errors.password?.type === 'minLength' && <p className="error-message">A senha precisa ter no minímo 5 caracteres.</p>}
                                </div>
                                <div className="form-group">
                                    <label>Foto</label>
                                    <input type="file" {...register("photo") }  />
                                    {preview && (
                                        <div className='box-preview'>
                                            <div className='img-preview'>
                                                <img src={preview} alt="Preview da imagem" />
                                            </div>
                                            <p>Preview da imagem</p>
                                        </div>
                                    )}
                                </div>
                                <div className="form-group block">
                                    <div>
                                        <label>Administrador</label>
                                        <input type="checkbox"
                                            {...register('admin')}
                                        />
                                    </div>
                                </div>
                                <button className='btn-sucsess'>{editingIndex !== null ? 'Editar' : 'Enviar'}</button>
                            </div>
                        </form>
                    </div>
                </div>
                                   
                <Users results={results} onModal={handleModalOpen} onEdit={handleEdit} onDelete={handleDelete} />
                {modalOpen && modalData && (
                    <Modal data={modalData} onClose={handleClose} />
                )}
            </div> 
        </>
        
    )
}

export default Forms