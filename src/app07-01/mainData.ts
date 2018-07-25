export class MainData {
	url: string = 'http://modele-ad9bis.pl/cms_spa/web/';
	serverPath: string = 'http://modele-ad9bis.pl/';
	imageSuffix: string = 'img/p/';
	accountClosed: string = 'Ten rachunek został zamknięty - brak możliwości edycji!';
	accountState: any[] = [{ id: 1, name: 'Zamknięty'},{ id: 0, name: 'Otwarty'}];
	accountTitle: string[] = ['Dodaj nowy rachunek', 'Zmodyfikuj istniejący rachunek'];
	accountType: any[] = [{ id: 1, name: 'Przelew'},{ id: 2, name: 'Pobranie'}, { id: 3, name: 'Usł. inf.'}];
	active: any[] = [{ id: 0, name: 'Nieaktywny'},{ id: 1, name: 'Aktywny'}];
	choose: any = { id: -1, name: 'Wybierz'};
	chooseAction: string = "Wybierz akcję i wpisz numer ID.";
	condition: any[] = [ {id: 'new', name: 'Nowy'}, {id: 'used', name: 'Używany'}, {id: 'refurbished', name: 'Odnowiony'} ];
	emptyVoucher: string = 'Użytkownik nie posiada zamówień na min. 50zł.';
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
	waiting: string = 'Proszę czekać';
}