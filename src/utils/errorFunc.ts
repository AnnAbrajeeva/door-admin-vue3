import {IErrors} from '../components/models'

const errors: Array<IErrors> = [
    {
        code: 401,
        value: 'Пожалуйста авторизуйтесь в системе',
    },
    {
        code: 400,
        value: 'Ошибка',
    }   
] 


export function errorFunc(code: number): string {
    let msg = ''
    errors.forEach(error => {
        
        if(error.code === code) {
            msg = error.value
        } else {
            msg = 'Ошибка'
        }    
    })
    
    return msg;
}