export default function authHeader() {
    const jwttoken = JSON.parse(localStorage.getItem('jwttoken'));
    if(jwttoken){
        return {Authorization: 'Bearer ' + jwttoken}
    }else{
        return {};
    }
}