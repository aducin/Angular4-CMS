export class Config {
	url: string = 'http://modele-ad9bis.pl/cms_spa/web/';
	serverPath: string = 'http://modele-ad9bis.pl/';
	serverSuffix: string = 'cms_spa/';
	imageSuffix: string = 'img/p/';
	accountClosed: string = 'Ten rachunek został zamknięty - brak możliwości edycji!';
	accountList: string[] = ['amount', 'automatic', 'list', 'totals'];
	accountState: any[] = [{ id: 1, name: 'Zamknięty'},{ id: 0, name: 'Otwarty'}];
	accountTitle: string[] = ['Dodaj nowy rachunek', 'Zmodyfikuj istniejący rachunek'];
	accountType: any[] = [
		{ id: 1, name: 'Przelew'},
		{ id: 2, name: 'Pobranie'}, 
		{ id: 3, name: 'Usł. inf.'},
		{ id: 4, name: 'Sprzedaż bezp.'},
		{ id: 5, name: 'Zwrot'}
	];
	active: any[] = [{ id: 0, name: 'Nieaktywny'},{ id: 1, name: 'Aktywny'}];
	bookmarks: any[] = [
		{ id: 1, name: 'Produkty', link: "products" },
		{ id: 2, name: 'Zamówienia', link: "orders" },
		{ id: 3, name: 'Wysyłki', link: "postal" },
		{ id: 4, name: 'Rachunki', link: "accounts" },
		{ id: 5, name: 'Przyjęcia', link: "delivery" },
	];
	choose: any = { id: -1, name: 'Wybierz'};
	chooseAll: any = { id: -1, name: 'Wszystkie'};
	chooseAction: string = "Wybierz akcję i wpisz numer ID.";
	chooseCategory: any = { id: 0, metaTitle: 'Proszę wybrać'};
	chooseManufactorer: any = { id: 0, name: 'Proszę wybrać'};
	condition: any[] = [ {id: 'new', name: 'Nowy'}, {id: 'used', name: 'Używany'}, {id: 'refurbished', name: 'Odnowiony'} ];
	deliveryTitle: string[] = ['Dodaj nowe przyjęcie', 'Zmodyfikuj przyjęcie towaru'];
	deliveryStatus: any[] = [ {id: 1, name: 'Do wydruku'}, {id: 2, name: 'Wydrukowany'}, {id: 3, name: 'Zarchiwizowany'} ];
	deliveryTypes: any[] = [ {id: 1, name: 'Aukcja'}, {id: 2, name: 'Giełda'}];
	emptyVoucher: string = 'Użytkownik nie posiada zamówień na min. 50zł.';
	loading: 'Trwa wyszukiwanie - proszę czekać...';
	loggedOut: string = 'Zostałeś skutecznie wylogowany!';
	orderActions: any[] = [
		{ id: -1, name: 'Wybierz Akcję'}, 
		{ id: 0, name: 'Sprawdź kupon', value: 'voucher'},
		{ id: 1, name: 'Oblicz 15% rabat', value: 'discount'},
		{ id: 2, name: 'Wyślij ponowny mail NP', value: 'mailNew'},
		{ id: 3, name: 'Wyślij ponowny mail SP', value: 'mailOld'}
	];
	orders: any[] = [{ id: -1, name: 'Wybierz Panel'},{ id: 0, name: 'Nowy Panel', value: 'new'}, { id: 1, name: 'Stary Panel', value: 'old'}];
	notANumber: string = 'Podaj liczbę!';
	postalActions: string[] = ['Dodaj środki', 'Odejmij środki'];
	timer: 3000;
	waiting: string = 'Proszę czekać';
}