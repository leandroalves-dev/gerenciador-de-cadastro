import './Users.css'

import { IUserDados } from '../../../interfaces/IUser'

interface PropsUser{
  results: IUserDados[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onModal: (index: number) => void;
}

const Users = ({results, onEdit, onModal, onDelete}: PropsUser) => {
  return ( 
    <div className='listResults'>

      {results.length === 0 ? (
          <h2>No momento, não há registros de cadastros</h2>
        ) : (
          
            <>
                <div className='content-list'>
                    {results.map((item, index) => (
                        <div className='list' key={index}>
                            <p><img src={item.photo!} alt="" /></p> 
                            <div className="info">
                                <p>{item.name}</p>
                                <div className="icons">
                                  <i className='fa fa-edit'  onClick={() => onEdit(index)}></i>
                                  <i className='fa fa-eye' onClick={() => onModal(index)}></i>
                                  <i className='fa fa-close' onClick={() => onDelete(index)}></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )}
      
      
    </div>
  )
}

export default Users