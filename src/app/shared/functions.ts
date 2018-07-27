export const CheckEmpty = (obj) => {
	return obj.findIndex((el) => { return el.id === -1; });
}

export const GetTime =  time => (new Date(time)).getTime() / 1000;
