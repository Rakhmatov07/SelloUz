export function cc_number(){
    let number = (Math.random() + '').substring(2,10)
    + (Math.random() + '').substring(2,10);

    if(number.startsWith('0')){
        return cc_number();
    }

    return number;
}
