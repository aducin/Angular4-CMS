export class ProductShort {
	id: number;
	attribute: {
		new: number,
		old: number,
	};
	image: number;
	name: string;
	price: {
		new: number,
		old: number,
	};
	link_rewrite: string;
	quantity: {
		new: number,
		old: number,
	};
}