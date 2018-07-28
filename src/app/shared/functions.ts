export const CheckEmpty = (obj) => {
	return obj.findIndex((el) => { return el.id === -1; });
}

export const GetTime =  time => (new Date(time)).getTime() / 1000;

export function Message (type: string, value: string, action = null, object = null) {
    return {
        type,
        value,
        action,
        object
    };
}

export const SplitDate = date => {
    let splitted = date.split('-');
    return {
        year: parseInt(splitted[0]),
        month: parseInt(splitted[1]),
        day: parseInt(splitted[2])
    };
}
