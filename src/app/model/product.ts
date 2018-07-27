export class Product {
	id: number;
	active: number;
	amount: number;
	category: any[];
	categoryCount: number;
	condition: string;
	deleteImages: boolean;
	description: string;
	descriptionShort: string;
	discount: {
		new: boolean,
		old: boolean,
	};
	empty: boolean;
	image: number;
	imageCount: number;
	images: any[];
	manufacturer: number;
	metaDescription: string;
	metaTitle: string;
	name: string;
	price: {
		new: number,
		old: number,
	};
	priceReal: {
		new: number,
		old: number,
	};
	productCategories: number[];
	productTags: any[];
	productUpdated: boolean;
	quantity: {
		new: number,
		old: number,
	};
	quantityBoth: number;
	success: boolean;
	tagString: string;
	url: string;
}

export class NameSearch {
	name: string;
	category: number;
	manufactorer: number
}
